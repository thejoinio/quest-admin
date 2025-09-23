import axios, { AxiosError, AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import mitt from "mitt";

export const globalEmitter = mitt();

interface ErrorResponseData {
  error: string;
  success: boolean;
}

export const frontendBaseUrl = () => {
  const appEnv = process.env.APP_ENV;
  if (appEnv == "prod") {
    return "https://joindaquest.io"
    // return "https://quest.thejoin.io"
  } else if (appEnv == "staging") {
    return "https://preview.joindaquest.io"
  } else if (appEnv == "dev") {
    return "http://localhost:3000"
  } else {
    return "https://preview.joindaquest.io"
  }
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// track retries per request to avoid infinite loops
type ExtReq = AxiosRequestConfig & { _retry?: boolean; _retryCount?: number };

// helper: decide when to treat 401 as final
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isFinal401 = (responseData?: ErrorResponseData | any) => {
  // If backend explicitly says "token expired" treat as final. Otherwise allow one automatic retry.
  if (!responseData) return false;
  const err = (responseData.error || "").toLowerCase();
  return err.includes("token expired") || err.includes("expired") || err.includes("invalid refresh");
};

api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = (error.config as ExtReq) || ({} as ExtReq);
    const responseData = error?.response?.data as ErrorResponseData | undefined;

    // If not a 401 just reject
    if (!error.response || error.response.status !== 401) {
      return Promise.reject(error);
    }

    // If no token exists at all, emit unauthorized and reject
    const token = Cookies.get("token");
    if (!token) {
      Cookies.remove("token");
      globalEmitter.emit("unauthorized");
      return Promise.reject(error);
    }

    // If backend explicitly says token expired, treat as final and log out
    if (isFinal401(responseData)) {
      Cookies.remove("token");
      globalEmitter.emit("unauthorized");
      return Promise.reject(new Error("Session expired. Please login again."));
    }

    // Allow one automatic retry for transient 401s (race conditions / timing)
    originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;
    if (originalRequest._retryCount <= 1 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // retry the same request once with existing token
        return api(originalRequest);
      } catch (retryError) {
        // fall through to remove token below
        console.log('retryError', retryError)
      }
    }

    // if we get here, retry didn't resolve the issue -> remove token and emit unauthorized
    Cookies.remove("token");
    globalEmitter.emit("unauthorized");
    return Promise.reject(new Error("Unauthorized. Redirecting to login."));
  }
);

export default api;