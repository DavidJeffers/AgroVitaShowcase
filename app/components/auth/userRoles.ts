export enum UserRole {
  USER = 1 /* Basic user */,
  FARMER = 2 /* Verified farmer */,
  MODERATOR = 3 /* Content moderator */,
  ADMIN = 4 /* Admin with full access */,
  PENDING_FARMER = 5 /* Pending farmer */,
}

/* Type guard to check if a number is a valid UserRole */
export function isUserRole(role: number): role is UserRole {
  return Object.values(UserRole).includes(role);
}

/* Convert role number to role name */
export function getUserRoleName(role: UserRole): string {
  return UserRole[role];
}

/* Get all available roles */
export function getAllUserRoles(): UserRole[] {
  return Object.values(UserRole).filter(
    (value) => typeof value === "number"
  ) as UserRole[];
}
