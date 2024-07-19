import crypto from 'crypto';

export const encrypt = (text: string, key: string): string => {
  const iv = crypto.randomBytes(16); // AES block size in bytes
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};