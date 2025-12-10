import { Request, Response } from 'express';
import prisma from '../lib/prisma.js';

export const getUserReports = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;

        const reports = await prisma.report.findMany({
            where: { userId },
            include: {
                building: {
                    select: {
                        id: true,
                        name: true,
                        neighbourhood: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });

        res.json({ reports });
    } catch (error) {
        console.error('Error fetching user reports:', error);
        res.status(500).json({ error: 'Failed to fetch reports' });
    }
};
