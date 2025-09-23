import crypto from "crypto-js";

const ENCRYPTION_SECRET_KEY = "quest-frontend-secret";

export const encryptEmail = (email: string) => {
  return crypto.AES.encrypt(email, ENCRYPTION_SECRET_KEY).toString();
};

export const decryptEmail = (encryptedText: string) => {
  const decryptedBytes = crypto.AES.decrypt(encryptedText, ENCRYPTION_SECRET_KEY);
  const decrypted = decryptedBytes.toString(crypto.enc.Utf8);
  return decrypted;
};
