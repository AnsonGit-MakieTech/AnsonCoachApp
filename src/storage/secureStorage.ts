// src/storage/secureStore.ts
import * as SecureStore from 'expo-secure-store';

export async function saveSessionToken(token: string) {
    await SecureStore.setItemAsync('session_key', token, {
        keychainService: 'myAppKeychain',
    });
}

export async function getSessionToken() {
    return await SecureStore.getItemAsync('session_key');
}

export async function clearSessionToken() {
    await SecureStore.deleteItemAsync('session_key');
}