interface SignupRequest {
  username: string;
  password: string;
  reason: string;
  finalMoney: number;
}

interface SignupResponse {}

export { SignupResponse, SignupRequest };
