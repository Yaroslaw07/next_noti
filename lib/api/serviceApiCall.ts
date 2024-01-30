import { AxiosError } from "axios";
import { getAxiosErrorMessage } from "./getAxiosErrorMessage";

export const serviceApiCall = async (
  apiCall: () => Promise<any>,
  successMessage: string = "Operation successful",
  errorMessage: string = "Error during operation"
): Promise<ServiceOperationResult> => {
  try {
    const response = await apiCall();
    return {
      ok: true,
      message: successMessage,
      data: response.data ? response.data : null,
    };
  } catch (error) {
    const err = error as AxiosError;
    return {
      ok: false,
      message: getAxiosErrorMessage(err, errorMessage),
    };
  }
};
