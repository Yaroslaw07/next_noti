import { AxiosError } from "axios";

export const getAxiosErrorMessage = (
  error: AxiosError,
  defaultValue: string
) => {
  const err = error as AxiosError;
  return (err.response?.data as { message: string })?.message || defaultValue;
};
