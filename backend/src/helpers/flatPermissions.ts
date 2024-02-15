type PermissionGroupWithPermissions = {
  name: string,
  permissions: string[]
}

export function flatPermissions(permissionGroups: PermissionGroupWithPermissions[] = [], permissions: string[] = []) {
  const permissionNamesFromGroups = permissionGroups.map(g => g.permissions).flat();
  return [...new Set([...permissionNamesFromGroups, ...permissions])];
}