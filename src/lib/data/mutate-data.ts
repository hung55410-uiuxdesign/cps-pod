'use server';

import { getAuthToken } from "../utils/get-token";

export async function mutateClientData(method: string, url: string, payload?: object) {
    const { authToken } = await getAuthToken();

    console.log('authToken ', authToken);

    const headers = new Headers();

    headers.append("Content-Type", "application/json");
    if(!authToken) {
        throw new Error("Authentication token is missing");
    }
    headers.append("Authorization", `Bearer ${authToken}`);

    try {
        const requestOptions: RequestInit = {
            method,
            headers,
        };

        if (method.toUpperCase() !== 'GET' && method.toUpperCase() !== 'HEAD' && payload) {
            requestOptions.body = payload instanceof FormData ? payload : JSON.stringify({ ...payload });
        }

        const response = await fetch(url, requestOptions);

        const data = await response?.json();

        if (!response.ok) {
            console.log('Error response:', response);
        }

        return data;
    } catch (error) {
        console.log("error", error);
        return null
    }
}