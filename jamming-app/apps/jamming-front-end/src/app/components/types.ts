export interface SearchFormValues {
  search: string;
}

export interface axiosOptions {
  method: "GET" | "PUT" | "DELETE" | "POST";
  url: string;
  headers: {
    "Content-Type": string;
  };
  data?: any;
}

export interface ApiResponse<T> {
  data: T[];
  status: number;
}

export interface ApiError {
  message: string;
  status: number;
}
