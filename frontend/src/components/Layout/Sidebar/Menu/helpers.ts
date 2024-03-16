import {getMyPermissions} from "../../../../api/users/getMyPermissions";
import {validatePermissionsSync} from "../../../../utils/validatePermissions";
import {MenuItemWithPermissions} from "./constants";

export async function filterMenuItemsByPermissions(menuItems: MenuItemWithPermissions[]) {
  const userPermissions = await getMyPermissions();
  console.log('Users permissions:', userPermissions);

  return menuItems.filter(item => {
    if (!item.permissions) return true;

    const canViewThisPage = validatePermissionsSync(item.permissions, userPermissions)
    console.log(canViewThisPage)
    return canViewThisPage;
  })
}