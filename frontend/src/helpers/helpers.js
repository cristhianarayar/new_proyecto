import CryptoJs from 'crypto-js';


export const handleCrypt = (token) => {
    return CryptoJs.AES.encrypt(
        token,
        String('Micar12345')
    ).toString()
}



export const handleDecrypt = (tokenEncrypt) => {
    return CryptoJs.AES.decrypt(
        tokenEncrypt,
        String('Micar12345')
    ).toString(CryptoJs.enc.Utf8)
}


export const decodeToken = (token) => {
    const tokenPayload = token.split('.')[1];
    return JSON.parse(atob(tokenPayload));
}