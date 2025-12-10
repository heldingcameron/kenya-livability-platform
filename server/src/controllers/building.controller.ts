import { Request, Response } from 'express';
import prisma from '../lib/prisma.js';
import { calculateBuildingScore } from '../services/building.service.js';

// Get all buildings (for map)
export const getAllBuildings = async (req: Request, res: Response) => {
    try {
        const buildings = await prisma.building.findMany({
            include: {
                reports: {
                    where: {
                        deletedAt: null,
                        createdAt: {
                            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
                        },
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
            },
        });

        // Calculate scores for each building
        const buildingsWithScores = buildings.map((building) => {
            const score = calculateBuildingScore(building.reports);
            return {
                id: building.id,
                name: building.name,
                latitude: building.latitude,
                longitude: building.longitude,
                neighbourhood: building.neighbourhood,
                city: building.city,
                suspicious: building.suspicious,
                score: score.composite,
                utilityScores: score.utilities,
                hasData: score.hasData,
                reportCount: building.reports.length,
            };
        });

        res.json({ buildings: buildingsWithScores });
    } catch (error) {
        console.error('Get all buildings error:', error);
        res.status(500).json({ error: 'Failed to fetch buildings' });
    }
};

// Get building by ID
export const getBuildingById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const building = await prisma.building.findUnique({
            where: { id },
            include: {
                reports: {
                    where: {
                        deletedAt: null,
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                    take: 50, // Last 50 reports
                    include: {
                        user: {
                            select: {
                                email: true,
                            },
                        },
                    },
                },
            },
        });

        if (!building) {
            return res.status(404).json({ error: 'Building not found' });
        }

        // Calculate scores
        const recentReports = building.reports.filter(
            (report) =>
                new Date(report.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        );
        const score = calculateBuildingScore(recentReports);

        res.json({
            building: {
                id: building.id,
                name: building.name,
                latitude: building.latitude,
                longitude: building.longitude,
                neighbourhood: building.neighbourhood,
                city: building.city,
                suspicious: building.suspicious,
                score: score.composite,
                utilityScores: score.utilities,
                hasData: score.hasData,
                reports: building.reports.map((report) => ({
                    id: report.id,
                    utilityType: report.utilityType,
                    status: report.status,
                    createdAt: report.createdAt,
                    userEmail: report.user.email,
                })),
            },
        });
    } catch (error) {
        console.error('Get building by ID error:', error);
        res.status(500).json({ error: 'Failed to fetch building' });
    }
};

// Search buildings
export const searchBuildings = async (req: Request, res: Response) => {
    try {
        const { query, neighbourhood, page = '1', limit = '20' } = req.query;

        const pageNum = parseInt(page as string);
        const limitNum = parseInt(limit as string);
        const skip = (pageNum - 1) * limitNum;

        const where: any = {};

        if (query) {
            where.name = {
                contains: query as string,
                mode: 'insensitive',
            };
        }

        if (neighbourhood) {
            where.neighbourhood = neighbourhood as string;
        }

        const [buildings, total] = await Promise.all([
            prisma.building.findMany({
                where,
                skip,
                take: limitNum,
                include: {
                    reports: {
                        where: {
                            deletedAt: null,
                            createdAt: {
                                gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                            },
                        },
                    },
                },
            }),
            prisma.building.count({ where }),
        ]);

        const buildingsWithScores = buildings.map((building) => {
            const score = calculateBuildingScore(building.reports);
            return {
                id: building.id,
                name: building.name,
                neighbourhood: building.neighbourhood,
                city: building.city,
                score: score.composite,
                utilityScores: score.utilities,
                hasData: score.hasData,
                reportCount: building.reports.length,
            };
        });

        res.json({
            buildings: buildingsWithScores,
            pagination: {
                page: pageNum,
                limit: limitNum,
                total,
                totalPages: Math.ceil(total / limitNum),
            },
        });
    } catch (error) {
        console.error('Search buildings error:', error);
        res.status(500).json({ error: 'Failed to search buildings' });
    }
};
