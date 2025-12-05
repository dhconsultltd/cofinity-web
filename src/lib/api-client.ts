// src/lib/api-client.ts
import  { type AxiosRequestConfig } from "axios";
import { toast } from "sonner";
import api from "./axios"; // ← use your configured axios instance

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
  errors?: string[];
  meta?: Record<string, any>;
}

class ApiClient {
  private pendingGets = new Map<string, Promise<any>>();

  private generateKey(method: string, url: string, config?: AxiosRequestConfig): string {
    const params = config?.params ? JSON.stringify(config.params) : "";
    const body = config?.data ? JSON.stringify(config.data) : "";
    return `${method.toUpperCase()}|${url}|${params}|${body}`;
  }

  private async ensureCsrf() {
    // Only call once per session
    if (!document.cookie.includes("XSRF-TOKEN")) {
      await api.get("/sanctum/csrf-cookie");
    }
  }

  private async request<T>(
    method: "get" | "post" | "put" | "patch" | "delete",
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const key = this.generateKey(method, url, config);
    const isGet = method === "get";

    // Deduplicate GET requests
    if (isGet && this.pendingGets.has(key)) {
      console.debug("[API] Deduplicated:", url);
      return this.pendingGets.get(key)!;
    }

    // Ensure CSRF token for stateful requests (POST, PUT, DELETE, PATCH)
    if (!isGet) {
      await this.ensureCsrf();
    }

    const promise = (async () => {
      try {
        let response;

        switch (method) {
          case "get":
            response = await api.get(url, config);
            break;
          case "post":
            response = await api.post(url, data, config);
            break;
          case "put":
            response = await api.put(url, data, config);
            break;
          case "patch":
            response = await api.patch(url, data, config);
            break;
          case "delete":
            response = await api.delete(url, config);
            break;
        }

        const raw = response.data;

        return {
          success: true,
          message: (raw?.message as string) || "Success",
          data: raw?.data ?? raw ?? null,
          meta: raw?.meta,
        } as ApiResponse<T>;
      } catch (error: any) {
        let message = "Something went wrong";
        let errors: string[] = [];

        if (error.response) {
          const res = error.response.data;
          message = res?.message || res?.error || error.message || message;
          if (res?.errors) {
            errors = Array.isArray(res.errors)
              ? res.errors
              : Object.values(res.errors).flat();
          }
        } else if (error.request) {
          message = "No response from server. Check your connection.";
        }

        // Don't toast on 401/419 — your axios interceptor already handles logout
        // if (![401, 419].includes(error.response?.status)) {
        //   toast.error(message);
        // }

        const apiError: ApiResponse<T> = {
          success: false,
          message,
          errors: errors.length ? errors : undefined,
          data: null as T,
        };

        throw apiError; // Important!
      }
    })();

    // Cache GET requests
    if (isGet) {
      this.pendingGets.set(key, promise);
      promise.finally(() => this.pendingGets.delete(key));
    }

    return promise;
  }

  get<T = any>(url: string, config?: AxiosRequestConfig) {
    return this.request<T>("get", url, undefined, config);
  }
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request<T>("post", url, data, config);
  }
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request<T>("put", url, data, config);
  }
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request<T>("patch", url, data, config);
  }
  delete<T = any>(url: string, config?: AxiosRequestConfig) {
    return this.request<T>("delete", url, undefined, config);
  }
}

export const apiClient = new ApiClient();
export default apiClient;