import { useState } from "react";

/* export class ApiErrors {
  constructor(errors:unknown[]) {
    this.errors = errors;
  }

  get errorsPerField() {
    return this.errors.reduce((acc, error) => {
      return { ...acc, [error.field]: error.message };
    }, {});
  }
} */

export function useApiFetch<T>(endpoint: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<unknown>(null);

  const fetchApi = async (options: RequestInit) => {
    setIsLoading(true);

    options = {
      credentials: "include",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
      ...options,
    };
    if (
      options.body !== null &&
      typeof options.body === "object" &&
      !(options.body instanceof FormData)
    ) {
      options.body = JSON.stringify(options.body);
    }

    try {
      const response = await fetch(`http://127.0.0.1:3333${endpoint}`, options);

      if (response.status === 204) {
        setData(null);
      } else {
        const responseData = await response.json();
        setData(responseData);
      }
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, data, error, fetchApi };
}
