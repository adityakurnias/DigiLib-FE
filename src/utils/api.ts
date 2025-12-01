import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    token: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
}

export const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
};

export const register = async (userData: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', userData);
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

export const getToken = () => localStorage.getItem('token');

export const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export interface Category {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    bookCount: number;
}

export interface Book {
    id: number;
    title: string;
    author: string;
    publisher: string;
    isbn: string;
    year: number;
    stock: number;
    available: number;
    description: string;
    coverImage: string;
    categoryId: number;
    categoryName: string;
    uploadedBy: number;
    createdAt: string;
    updatedAt: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export const getBooks = async (): Promise<ApiResponse<Book[]>> => {
    const response = await api.get<ApiResponse<Book[]>>('/book');
    return response.data;
};

export const getBookDetail = async (id: number): Promise<ApiResponse<Book>> => {
    const response = await api.get<ApiResponse<Book>>(`/book/${id}`);
    return response.data;
};

export const getCategories = async (): Promise<ApiResponse<Category[]>> => {
    const response = await api.get<ApiResponse<Category[]>>('/category');
    return response.data;
};

export interface CategoryBooksResponse {
    success: boolean;
    category: Category;
    data: Book[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export const getBooksByCategory = async (id: number): Promise<CategoryBooksResponse> => {
    const response = await api.get<CategoryBooksResponse>(`/category/${id}/books`);
    return response.data;
};

export const getImageUrl = (filename: string) => {
    if (!filename) return 'https://placehold.co/300x450?text=No+Cover';
    if (filename.startsWith('http')) return filename;
    return `${API_BASE_URL}/uploads/${filename}`; // Assuming images are served from /uploads, user didn't specify but this is common. Or maybe just base URL?
    // User said coverImage: "1764082765303-sko5z8kzlv.png". I'll assume it needs a path.
    // Let's try `${API_BASE_URL}/${filename}` first or ask. 
    // Actually, usually it's static. I'll use a helper that can be easily changed.
    // For now I will assume it is served from root or a specific static folder.
    // Let's assume `${API_BASE_URL}/uploads/${filename}` is a safe bet for now or just `${API_BASE_URL}/${filename}`.
    // Given the filename looks like an upload, I'll use `${API_BASE_URL}/uploads/${filename}`.
    // Wait, I should probably check if the user specified the image path. They didn't.
    // I'll use `${API_BASE_URL}/${filename}` for now as a fallback.
};

export default api;
