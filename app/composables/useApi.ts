import { useAuthStore } from '~/stores/auth'

interface ApiOptions extends RequestInit {
  skipInterceptor?: boolean
}

export const useApi = () => {
  const config = useRuntimeConfig()
  const authStore = useAuthStore()
  const route = useRoute()
  const { user } = authStore;

  const apiBase = config.public.apiBase || "http://localhost:3001/api/v1";

  let isRefreshing = false
  let failedQueue: any[] = []

  const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error)
      } else {
        prom.resolve(token)
      }
    })
    failedQueue = []
  }

  const apiCall = async <T>(
    endpoint: string,
    options: ApiOptions = {}
  ): Promise<T> => {
    const { skipInterceptor, ...fetchOptions } = options
    const url = endpoint.startsWith("http")
      ? endpoint
      : `${apiBase}${endpoint}`;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "user-id": user?.userName || "anonymous",
      ...((options.headers as Record<string, string>) || {}),
    };

    if (authStore.accessToken) {
      headers['Authorization'] = `Bearer ${authStore.accessToken}`
    }

    const defaultOptions: RequestInit = {
      credentials: 'include',
      ...fetchOptions,
      headers
    }

    try {
      const response = await fetch(url, defaultOptions)

      const isLoginPage = route.path === '/login'

      if (
        response.status === 401 &&
        !endpoint.includes("/users/refresh") &&
        !skipInterceptor &&
        !isLoginPage
      ) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              headers["Authorization"] = `Bearer ${token}`;
              return fetch(url, { ...defaultOptions, headers }).then((res) =>
                res.json(),
              );
            })
            .catch((err) => {
              throw err;
            });
        }

        isRefreshing = true;

        try {
          // Attempt to refresh
          const refreshResponse = await fetch(`${apiBase}/users/refresh`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          });

          if (!refreshResponse.ok) {
            throw new Error("Session expired");
          }

          const { user } = await refreshResponse.json();
          authStore.setAccessToken(user.token);
          authStore.setUser(user);

          processQueue(null, user.token);
          isRefreshing = false;

          // Retry original request
          headers["Authorization"] = `Bearer ${user.token}`;
          const retriedResponse = await fetch(url, {
            ...defaultOptions,
            headers,
          });
          return await retriedResponse.json();
        } catch (refreshError) {
          processQueue(refreshError, null);
          isRefreshing = false;
          authStore.logout();
          throw refreshError;
        }
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`,
        );
      }

      return await response.json()
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }

  return {
    get: <T>(endpoint: string, options?: ApiOptions) =>
      apiCall<T>(endpoint, { ...options, method: "GET" }),
    post: <T>(endpoint: string, data?: any, options?: ApiOptions) =>
      apiCall<T>(endpoint, {
        ...options,
        method: "POST",
        body: JSON.stringify(data),
      }),
    put: <T>(endpoint: string, data?: any, options?: ApiOptions) =>
      apiCall<T>(endpoint, {
        ...options,
        method: "PUT",
        body: JSON.stringify(data),
      }),
    delete: <T>(endpoint: string, options?: ApiOptions) =>
      apiCall<T>(endpoint, { ...options, method: "DELETE" }),
  };
}
