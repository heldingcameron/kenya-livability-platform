import { Report, Status, UtilityType } from '@prisma/client';

interface UtilityScore {
    score: number | null;
    status: Status | null;
    lastReport: Date | null;
}

interface BuildingScore {
    composite: number | null;
    utilities: {
        POWER: UtilityScore;
        WATER: UtilityScore;
        INTERNET: UtilityScore;
    };
    hasData: boolean;
}

// Convert status to numeric score
const statusToScore = (status: Status): number => {
    switch (status) {
        case 'STABLE':
            return 100;
        case 'FLICKERING':
            return 50;
        case 'OUTAGE':
            return 0;
        default:
            return 0;
    }
};

// Calculate recency weight
const getRecencyWeight = (reportDate: Date): number => {
    const now = new Date();
    const daysDiff = Math.floor(
        (now.getTime() - reportDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysDiff <= 7) {
        return 1.0; // 100% weight for reports within 7 days
    } else if (daysDiff <= 30) {
        return 0.5; // 50% weight for reports 8-30 days old
    } else {
        return 0; // Exclude reports older than 30 days
    }
};

// Calculate score for a specific utility
const calculateUtilityScore = (
    reports: Report[],
    utilityType: UtilityType
): UtilityScore => {
    const utilityReports = reports.filter((r) => r.utilityType === utilityType);

    if (utilityReports.length === 0) {
        return { score: null, status: null, lastReport: null };
    }

    // Calculate weighted average
    let totalWeightedScore = 0;
    let totalWeight = 0;

    utilityReports.forEach((report) => {
        const weight = getRecencyWeight(report.createdAt);
        if (weight > 0) {
            totalWeightedScore += statusToScore(report.status) * weight;
            totalWeight += weight;
        }
    });

    const score = totalWeight > 0 ? Math.round(totalWeightedScore / totalWeight) : null;
    const latestReport = utilityReports[0]; // Reports are ordered by createdAt desc

    return {
        score,
        status: latestReport.status,
        lastReport: latestReport.createdAt,
    };
};

// Calculate composite building score
export const calculateBuildingScore = (reports: Report[]): BuildingScore => {
    // Calculate individual utility scores
    const powerScore = calculateUtilityScore(reports, 'POWER');
    const waterScore = calculateUtilityScore(reports, 'WATER');
    const internetScore = calculateUtilityScore(reports, 'INTERNET');

    // Collect valid scores
    const validScores = [powerScore.score, waterScore.score, internetScore.score].filter(
        (score): score is number => score !== null
    );

    // Calculate composite score (average of available utilities)
    const composite =
        validScores.length > 0
            ? Math.round(validScores.reduce((sum, score) => sum + score, 0) / validScores.length)
            : null;

    // Check if we have sufficient data (at least one utility with a score)
    const hasData = validScores.length > 0;

    return {
        composite,
        utilities: {
            POWER: powerScore,
            WATER: waterScore,
            INTERNET: internetScore,
        },
        hasData,
    };
};

// Get marker color based on score
export const getMarkerColor = (score: number | null): string => {
    if (score === null) {
        return '#9ca3af'; // Grey for no data
    }
    if (score >= 75) {
        return '#10b981'; // Green for good
    }
    if (score >= 40) {
        return '#f59e0b'; // Yellow for moderate
    }
    return '#ef4444'; // Red for poor
};
