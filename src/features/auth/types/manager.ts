export interface ManagerProfile {
  id: number;
  name: string;
  email: string;
}

export interface LoginResponse {
  token: string;
  manager: ManagerProfile;
}