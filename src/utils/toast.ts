import { toast } from "react-toastify";
import type { ToastType } from "../types/util/toast.type";

export const showToast = (type : ToastType, message : Error | string) => {
    if(typeof message === 'string'){
        toast[type](message);
        return
    }
    toast[type](message.message)
}