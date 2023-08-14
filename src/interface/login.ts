export type LoginType = "google";

export interface LoginRequest {
  login_type: LoginType;
  token: string;
}

export interface LoginResponse {
  accessToken: string;
}
