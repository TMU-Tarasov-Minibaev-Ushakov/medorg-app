import {Space, Typography} from "antd";
import {User} from "../../types";
import {useEffect, useState} from "react";
import {getUsers} from "../../api/users/getUsers";
import {UserElement} from "./components/User";

export const UsersPage = () => {

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers().then((users) => setUsers(users));
  }, []);

    return <Space direction='vertical' style={{ width: '100%' }}>
      <Typography.Title level={2}>Users list</Typography.Title>
      {
        users.map((user) => {
          return <UserElement user={user} />
        })
      }
    </Space>
}