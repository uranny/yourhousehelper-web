import { toast } from "react-toastify";

type ToastType = "info" | "success" | "warning" | "error"

export const showToast = (type : ToastType, message : string) => toast[type](message) 