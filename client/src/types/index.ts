// User types
export interface User {
    id: string;
    email: string;
    role: 'USER' | 'ADMIN';
    createdAt: string;
}

// Building types
export interface Building {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    neighbourhood: string;
    city: string;
    suspicious: boolean;
    score: number | null;
    utilityScores: {
        POWER: UtilityScore;
        WATER: UtilityScore;
        INTERNET: UtilityScore;
    };
    hasData: boolean;
    reportCount: number;
}

export interface UtilityScore {
    score: number | null;
    status: 'STABLE' | 'FLICKERING' | 'OUTAGE' | null;
    lastReport: string | null;
}

// Report types
export interface Report {
    id: string;
    utilityType: 'POWER' | 'WATER' | 'INTERNET';
    status: 'STABLE' | 'FLICKERING' | 'OUTAGE';
    createdAt: string;
    userEmail?: string;
}

// API response types
export interface AuthResponse {
    message: string;
    user: User;
    token?: string;
}

export interface BuildingsResponse {
    buildings: Building[];
}

export interface BuildingDetailResponse {
    building: Building & {
        reports: Report[];
    };
}

export interface SearchResponse {
    buildings: Building[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export interface ApiError {
    error: string;
    details?: Array<{
        field: string;
        message: string;
    }>;
}
