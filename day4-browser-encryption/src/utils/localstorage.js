import { decrypt, encrypt } from "./encryption"

const SECRET_CODE = 'code123'


export const setData = (key, data) => {
    const encrypted = encrypt(data, SECRET_CODE)
    localStorage.setItem(key, encrypted)
}

export const getData = (key) => {
    const data = localStorage.getItem(key);
    if (!data) return null;
    return decrypt(data, SECRET_CODE)
}