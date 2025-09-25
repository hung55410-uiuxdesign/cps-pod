// // API client utilities
// import { API_CONFIG } from '@/lib/constants';
//
// class ApiClient {
//   private baseUrl: string;
//   private timeout: number;
//
//   constructor() {
//     this.baseUrl = API_CONFIG.baseUrl;
//     this.timeout = API_CONFIG.timeout;
//   }
//
//   private async request<T>(
//     endpoint: string,
//     options: RequestInit = {}
//   ): Promise<T> {
//     const url = `${this.baseUrl}${endpoint}`;
//
//     const config: RequestInit = {
//       headers: {
//         'Content-Type': 'application/json',
//         ...options.headers,
//       },
//       ...options,
//     };
//
//     try {
//       const response = await fetch(url, config);
//
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//
//       return await response.json();
//     } catch (error) {
//       console.error('API request failed:', error);
//       throw error;
//     }
//   }
//
//   async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
//     return this.request<T>(endpoint, { ...options, method: 'GET' });
//   }
//
//   async post<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
//     return this.request<T>(endpoint, {
//       ...options,
//       method: 'POST',
//       body: data ? JSON.stringify(data) : undefined,
//     });
//   }
//
//   async put<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
//     return this.request<T>(endpoint, {
//       ...options,
//       method: 'PUT',
//       body: data ? JSON.stringify(data) : undefined,
//     });
//   }
//
//   async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
//     return this.request<T>(endpoint, { ...options, method: 'DELETE' });
//   }
// }
//
// export const apiClient = new ApiClient();