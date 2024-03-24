import {Flex, Modal, Select, Space} from "antd";
import {FC, useCallback, useEffect, useMemo, useState} from "react";
import {createConversation} from "../../../api/conversation/createConversation";
import { useNotifications } from "../../../contexts/NotificationsContext";
import {getUsers} from "../../../api/users/getUsers";
import {User} from "../../../types";

type CreateConversationModalProps = {
  open: boolean;
  onCancel: () => void;
};

export const CreateConversationModal: FC<CreateConversationModalProps> = ({ open, onCancel }) => {

  const [users, setUsers] = useState<User[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const { api } = useNotifications();

  useEffect(() => {
    getUsers().then((users) => {
      setUsers(users);
    });
  }, []);

  const handleCreateConversation = useCallback(async () => {
    if (!selectedDoctor) {
      return;
    }
    console.log(selectedDoctor);

    try {
      await createConversation({
        secondUserId: selectedDoctor
      });
      api?.success({
        message: "Conversation created"
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
      if (err instanceof Error) {
        api?.error({
          message: err.message ?? "Something went wrong"
        });
      }
    }

  }, [api, selectedDoctor]);

  const doctorSelectOptions = useMemo(() => {
    return users?.map(user => {
      return {
        label: user.email,
        value: user.id
      };
    });
  }, [users]);

  return (
    <Modal title={'Create new conversation'} open={open} onCancel={onCancel} onOk={handleCreateConversation} okButtonProps={{
      disabled: !selectedDoctor
    }}>
      <Space direction={'vertical'} style={{ width: '100%'}}>
        <Flex gap={8}>
          <Select
            style={{ flexGrow: 1 }}
            showSearch
            placeholder="Select a doctor"
            onChange={setSelectedDoctor}
            filterOption={(inputValue, option) => {
              return !!option?.label?.toString().toLowerCase().includes(inputValue.toLowerCase());
            }}
            options={doctorSelectOptions}
          />
        </Flex>
      </Space>
    </Modal>
  )
}