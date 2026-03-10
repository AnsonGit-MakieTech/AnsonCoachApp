// src/storage/secureStore.ts
import * as SecureStore from 'expo-secure-store';

export async function saveToken(token: string) {
    await SecureStore.setItemAsync('session_key', token, {
        keychainService: 'myAppKeychain',
    });
}

export async function getToken() {
  return await SecureStore.getItemAsync('authToken');
}

export async function deleteToken() {
  await SecureStore.deleteItemAsync('authToken');
}