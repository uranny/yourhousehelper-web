import { useMutation } from "@tanstack/react-query";
import { userApi } from "../../api/user";
import { QUERY_KEYS } from "../../constants/query";

export function useSigninMutation() {
  return useMutation({
    mutationKey: [QUERY_KEYS.SIGNIN],
    mutationFn: async ({ username, password }: { username: string; password: string }) => {
      return await userApi.signin({ username, password });
    },
  });
}

export default {};
