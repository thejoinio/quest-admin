// Add these interfaces at the bottom of definitions.ts
export interface CreateAccountPayload {
  email: string;
  username: string;
  country: string;
  password: string;
  confirmPassword: string; // confirm_password
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fingerprintData: any // fingerprint_data
}

export interface AuthResponse {
  status: boolean;
  message: string;
}

//Login
export interface LoginPayload {
  email: string;
  encryptedPassword: string;
  sessionId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fingerprintData?: any // fingerprint_data
}

export interface LoginResponse {
  status: boolean;
  message: string;
  data?: {
    username: string;
    token: string;
    role: string;
  };
}

// ✅ NEW: OTP types
export interface OtpRequestResponse {
  success: boolean;
  message: string;
  data: {
    email: string;
    expiresIn: string;
  };
}

export interface OtpVerifyResponse {
  success: boolean;
  message: string;
  data: {
    email: string;
  };
}
