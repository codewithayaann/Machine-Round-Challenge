export const xorEncryptDecrypt = (input, secretKey) => {
    let output = '';
    for (let i = 0; i < input.length; i++) {
        const inputCode = input.charCodeAt(i);
        const secretCode = secretKey.charCodeAt(i % secretKey.length)
        const xor = inputCode ^ secretCode; // any number
        output += String.fromCharCode(xor); // &~
    }
    return output
}

export const encrypt = (data, secretKey) => {
    const stringifiedData = JSON.stringify(data);
    return xorEncryptDecrypt(stringifiedData, secretKey)
}


export const decrypt = (data, secretKey) => {
    try {
        const decryptedData = xorEncryptDecrypt(data, secretKey);
        return JSON.parse(decryptedData)
    } catch {
        return null
    }
}