import axios from 'axios';
import type {
    User,
    AuthResponse,
    BuildingsResponse,
    BuildingDetailResponse,
    SearchResponse,
} from '../types';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    withCredentials: true, // Send cookies with requests
    headers: {
        'Content-Type': 'application/json',
    },
});

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Only redirect to login if not already on login or register pages
            const currentPath = window.location.pathname;
            if (currentPath !== '/login' && currentPath !== '/register') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

// Auth API
export const authApi = {
    register: async (email: string, password: string): Promise<AuthResponse> => {
        const { data } = await api.post<AuthResponse>('/api/auth/register', {
            email,
            password,
        });
        return data;
    },

    login: async (email: string, password: string): Promise<AuthResponse> => {
        const { data } = await api.post<AuthResponse>('/api/auth/login', {
            email,
            password,
        });
        return data;
    },

    logout: async (): Promise<void> => {
        await api.post('/api/auth/logout');
    },

    getCurrentUser: async (): Promise<{ user: User }> => {
        const { data } = await api.get<{ user: User }>('/api/auth/me');
        return data;
    },
};

// Building API
export const buildingApi = {
    getAll: async (): Promise<BuildingsResponse> => {
        const { data } = await api.get<BuildingsResponse>('/api/buildings');
        return data;
    },

    getById: async (id: string): Promise<BuildingDetailResponse> => {
        const { data } = await api.get<BuildingDetailResponse>(`/api/buildings/${id}`);
        return data;
    },

    search: async (params: {
        query?: string;
        neighbourhood?: string;
        page?: number;
        limit?: number;
    }): Promise<SearchResponse> => {
        const { data } = await api.get<SearchResponse>('/api/buildings/search', {
            params,
        });
        return data;
    },
};

export default api;
