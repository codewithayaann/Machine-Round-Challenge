YT Video : https://youtu.be/-P_uKkxYe4Q?si=TZr5lDDBzTLbHBAo



# Encryption of Storage Data

This project demonstrates how to securely store and retrieve data in the browser's `localStorage` using simple XOR encryption. The implementation includes functions for encryption, decryption, and integration with `localStorage`.


## Overview

The provided code encrypts data before storing it in `localStorage` and decrypts it when retrieving it. This adds a layer of security by ensuring that sensitive information is not stored in plaintext. XOR encryption is a basic encryption method, where each character of the input is XORed with a character from a secret key.

## Installation

To use this code in your project, simply copy the `encryption.js` and `localstorage.js` files into your project directory.

Ensure your project is set up to handle ES6 modules, as the code uses the `import` and `export` syntax.

## Usage

### 1. Encryption and Decryption

The core of this implementation is the XOR-based encryption and decryption functions:

```javascript
export const xorEncryptDecrypt = (input, secretKey) => {
    let output = '';
    for (let i = 0; i < input.length; i++) {
        const inputCode = input.charCodeAt(i);
        const secretCode = secretKey.charCodeAt(i % secretKey.length);
        const xor = inputCode ^ secretCode;
        output += String.fromCharCode(xor);
    }
    return output;
}

export const encrypt = (data, secretKey) => {
    const stringifiedData = JSON.stringify(data);
    return xorEncryptDecrypt(stringifiedData, secretKey);
}

export const decrypt = (data, secretKey) => {
    try {
        const decryptedData = xorEncryptDecrypt(data, secretKey);
        return JSON.parse(decryptedData);
    } catch {
        return null;
    }
}
```

### 2. LocalStorage Integration

The functions to set and get encrypted data from `localStorage` are as follows:

```javascript
import { decrypt, encrypt } from "./encryption"

const SECRET_CODE = 'code123';

export const setData = (key, data) => {
    const encrypted = encrypt(data, SECRET_CODE);
    localStorage.setItem(key, encrypted);
}

export const getData = (key) => {
    const data = localStorage.getItem(key);
    if (!data) return null;
    return decrypt(data, SECRET_CODE);
}
```

### 3. Application Integration

In your React application, you can use the encryption and decryption methods within your components as shown:

```javascript
const handleChange = (e) => {
    const { id, value } = e.target;
    setData(id, value);
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
};

useEffect(() => {
    const username = getData('username');
    const email = getData('email');
    const phone = getData('phone');
    setFormData({
      username,
      email,
      phone,
    });
}, []);
```

## Example

When a user inputs data in a form, it is encrypted using the `SECRET_CODE` and stored in `localStorage`. Upon reloading the page, the data is retrieved, decrypted, and used to populate the form fields.

```javascript
setData('username', 'JohnDoe');
const username = getData('username');
console.log(username); // Outputs 'JohnDoe'
```

This ensures that sensitive information like usernames, emails, and phone numbers are not stored in plain text in the browser's `localStorage`.
