declare module 'paytmchecksum' {
  export function generateSignature(text: string, key: string): Promise<string>;
  export function verifySignature(text: string, key: string, checksum: string): Promise<boolean>;
} 