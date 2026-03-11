// src/storage/secureStore.ts
import * as SecureStore from 'expo-secure-store';

const SESSION_KEY = 'session_key';
const KEYCHAIN = 'myAppKeychain';

export async function saveSessionToken(token: string) {
    await SecureStore.setItemAsync(SESSION_KEY, token, {
        keychainService: KEYCHAIN,
    });
}

export async function getSessionToken() {
    return await SecureStore.getItemAsync(SESSION_KEY, {
        keychainService: KEYCHAIN,
    });
}

export async function clearSessionToken() {
    await SecureStore.deleteItemAsync(SESSION_KEY, {
        keychainService: KEYCHAIN,
    });
}