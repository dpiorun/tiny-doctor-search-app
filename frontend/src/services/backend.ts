import axios, { AxiosInstance } from "axios";
import { Doctor, Paginated } from "../backendTypes";

class Backend {
  private readonly http: AxiosInstance;

  constructor(baseURL: string) {
    this.http = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async getDoctors(params?: URLSearchParams): Promise<Paginated<Doctor>> {
    const { data } = await this.http("/doctors/", {
      params,
    });
    return data;
  }
}

const apiUrl = () => {
  if (process.env.NODE_ENV === "test") return "";
  else if (process.env.REACT_APP_BACKEND_URL)
    return process.env.REACT_APP_BACKEND_URL;
  return "http://localhost:8000";
};

export const backend = new Backend(apiUrl());
