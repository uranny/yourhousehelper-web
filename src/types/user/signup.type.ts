interface SignupRequest {
  username: string;
  password: string;
  reason: string;
  finalMoney: number;
}

interface SignupResponse {}

export type { SignupResponse, SignupRequest };
