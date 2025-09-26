import { useState, useCallback } from "react";
import { get } from "@/services/axios";
// import { useQuery } from "@tanstack/react-query";

// Helper: convert PEM string to ArrayBuffer
async function importRsaPublicKey(pem: string): Promise<CryptoKey> {
  // remove the "BEGIN/END" wrapper and line breaks
  const b64 = pem
    .replace(/-----BEGIN PUBLIC KEY-----/, "")
    .replace(/-----END PUBLIC KEY-----/, "")
    .replace(/\s+/g, "");
  const der = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
  return crypto.subtle.importKey(
    "spki",
    der.buffer,
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    false,
    ["encrypt"]
  );
}

// Helper: ArrayBuffer → Base64
function bufToBase64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

/**
 * Hook to encrypt password with a given RSA public key.
 * Usage:
 * const { encryptPassword, loading, error } = usePasswordEncryptor();
 * const cipher = await encryptPassword(password, publicKey);
 */
export function usePasswordEncryptor() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const encryptPassword = useCallback(async (plain: string, publicKeyPem: string) => {
    try {
      setLoading(true);
      setError(null);
      const key = await importRsaPublicKey(publicKeyPem);
      const encrypted = await crypto.subtle.encrypt(
        { name: "RSA-OAEP" },
        key,
        new TextEncoder().encode(plain)
      );
      console.log(encrypted);

      return bufToBase64(encrypted); // send this to backend
    } catch (e) {
      setError(e as Error);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  return { encryptPassword, loading, error };
}


interface IEncryptionKeyResponse {
  success: boolean,
  data: {
    sessionId: string,
    publicKey: string,
  }
}

export const fetchEncryptionKey = async (): Promise<IEncryptionKeyResponse> => {
  const response = await get<IEncryptionKeyResponse>("/auth/encryption-key");
  return response;
};

// export const useFetchEncryptionKey = () => {
//   return useQuery<IEncryptionKeyResponse, Error>({
//     queryKey: ['auth', 'encryption-key'],
//     queryFn: fetchEncryptionKey,
//   });
// };