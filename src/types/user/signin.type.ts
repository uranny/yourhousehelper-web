interface SigninRequest {
  username: string;
  password: string;
}

interface SigninResponse {
  accessToken: string;
  refreshToken: string;
}

export { SigninRequest, SigninResponse };
