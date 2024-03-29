import {FC} from "react";
import {User} from "../../../types";
import {Badge, Card, Divider, Flex, Select, Tag, Typography} from "antd";

export const UserElement: FC<{ user: User }> = ({user}) => {

  const flattenPermissions = user.permissionGroups?.reduce((acc, permissionGroup) => {
    return acc.concat(permissionGroup.permissions);
  }, [] as string[]);
  const permissionsNotInGroups = user.permissions?.filter((permission) => {
    return !flattenPermissions?.includes(permission);
  }) || [];
  const allPermissions = flattenPermissions?.concat(permissionsNotInGroups) || [];

  const typeString = user.type === 'PATIENT' ? 'Patient' : user.type === 'DOCTOR' ? 'Doctor' : 'Admin';
  return (
    <Card>
      <Flex gap={6}>
        <Typography.Paragraph style={{ margin: 0, fontSize: 16 }}>{typeString}</Typography.Paragraph>
        <Divider type='vertical'/>
        <Typography.Paragraph style={{ margin: 0, fontSize: 16 }}>{user.email}</Typography.Paragraph>
        <Divider type='vertical'/>
        <Typography.Paragraph style={{ margin: 0, fontSize: 16 }}>{user.name}</Typography.Paragraph>
      </Flex>
      <Divider style={{ margin: '12px 0'}}/>
      <Flex wrap='wrap'>
        Permissions:&nbsp;&nbsp;
        {
          allPermissions?.map((permission) => {
            return <Tag key={permission}>{permission}</Tag>
          })
        }
      </Flex>
      <Divider style={{ margin: '12px 0'}}/>

      <Flex wrap='wrap'>
        PermissionGroups:&nbsp;&nbsp;{
        user.permissionGroups?.map((permissionGroup) => {
          return <Tag key={permissionGroup.name}>{permissionGroup.name}</Tag>
        })
      }
      </Flex>
    </Card>
  )
}