import { useMutation } from "@tanstack/react-query";
import { userApi } from "../../api/user";
import { QUERY_KEYS } from "../../constants/query";

export function useSignupMutation() {
  return useMutation({
    mutationKey: [QUERY_KEYS.SIGNUP],
    mutationFn: async (data: { username: string; password: string }) => {
      return await userApi.signup(data);
    },
  });
}

export default {};
