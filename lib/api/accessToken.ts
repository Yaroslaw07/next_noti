import { AxiosError } from "axios";
import { parseCookies } from "nookies";

export const getAccessToken = async () => {
  const accessToken = parseCookies().accessToken;

  if (accessToken) {
    return accessToken;
  }

  const response = await fetch("/api/auth/refresh", {
    method: "POST",
  });
  const data = await response.json();

  if (!response.ok) {
    throw new AxiosError(data.message, response.status.toString());
  }

  return data.accessToken;
};
