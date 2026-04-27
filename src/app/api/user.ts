import CustomAxios from "../lib/CustomAxios";
import { ReissueRequest, ReissueResponse } from "../types/user/reissue.type";
import { SigninRequest, SigninResponse } from "../types/user/signin.type";
import { SignupResponse, SignupRequest } from "../types/user/signup.type";
import { BaseResponse } from "../types/util/response.type";

export const userApi = {
  signup: async (
    data: SignupRequest,
  ): Promise<BaseResponse<SignupResponse>> => {
    return (await CustomAxios.post("/user/signup", data)).data;
  },
  signin: async (
    data: SigninRequest,
  ): Promise<BaseResponse<SigninResponse>> => {
    return (await CustomAxios.post("/user/signin", data)).data;
  },
  reissue: async (
    data: ReissueRequest,
  ): Promise<BaseResponse<ReissueResponse>> => {
    return (await CustomAxios.post("/user/reissue", data)).data;
  },
};
