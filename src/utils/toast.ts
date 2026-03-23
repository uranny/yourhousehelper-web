import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import type { ToastType } from "../types/util/toast.type";

export const showToast = (
  type: ToastType,
  message: unknown,
  fallbackMessage = "알 수 없는 오류가 발생했습니다.",
) => {
  if (typeof message === "string" && message.trim()) {
    toast[type](message);
    return;
  }

  if (isAxiosError(message)) {
    toast[type](
      message.response?.data?.message ?? fallbackMessage,
    );
    return;
  }

  if (message instanceof Error) {
    toast[type](message.message || fallbackMessage);
    return;
  }

  toast[type](fallbackMessage);
};
