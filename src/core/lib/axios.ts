'use client'


import axios from "axios";
import AppConstants from "../constants/app_constants";
import { getAuthToken } from "./auth";

export const useAxios = (
  contentType?: "application/json" | "multipart/form-data"
) => {
  const token = getAuthToken()

  return axios.create({
    baseURL: AppConstants.api_url,
    headers: {
      "Content-Type": contentType as string,
      accept: "application/json",
      lang: "en",
      authorization: `Bearer ${token}`,
    },
  });
};
