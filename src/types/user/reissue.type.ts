interface ReissueRequest {
  refreshToken: string;
}

interface ReissueResponse {
  accessToken: string;
  refreshToken: string;
}

export type { ReissueRequest, ReissueResponse };
