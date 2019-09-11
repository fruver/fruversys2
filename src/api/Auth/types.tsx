export interface User {
  email: string|null;
  displayName: string|null;
  isActive: boolean|null;
  isAdmin: boolean|null;
  jwtAccess: string|null;
  jwtRefresh: string|null;
}