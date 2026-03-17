import { useMutation } from "@tanstack/react-query";
import { userApi } from "../../api/user";
import { QUERY_KEYS } from "../../constants/query";
import { SignupRequest } from "../../types/user/signup.type";

export function useSignupMutation() {
  return useMutation({
    mutationKey: [QUERY_KEYS.SIGNUP],
    mutationFn: async (data: SignupRequest) => {
      return await userApi.signup(data);
    },
  });
}

export default {};
