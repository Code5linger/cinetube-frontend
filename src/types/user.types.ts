import type { AccountStatus, Role } from "./domain.types";

export interface SessionUser {
  id: string;
  name: string | null;
  email: string;
  role: Role;
  emailVerified: boolean;
  image: string | null;
  avatarUrl: string | null;
  accountStatus?: AccountStatus;
  createdAt: string;
  updatedAt: string;
}
