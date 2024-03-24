import {Avatar, Flex, Space} from "antd";
import {FC} from "react";

type Message = {
  id: number,
  content: string,
  createdAt: string,
  senderId: number
};

export const Message: FC<{message: Message, isOuterMessage: boolean}> = ({ message, isOuterMessage }) => {
  return (
    <div style={{display: 'flex', flexDirection: isOuterMessage ? 'row' : 'row-reverse', alignItems: 'center'}}>
      <Flex gap={8} align={'center'} style={{
        flexDirection: isOuterMessage ? 'row' : 'row-reverse',
      }}>
        <Avatar>{message.senderId}</Avatar>
        <div style={{padding: 8, backgroundColor: isOuterMessage ? '#f0f0f0' : '#e6f7ff', borderRadius: 8}}>
          <div>{message.content}</div>
          <div style={{fontSize: 10, color: 'gray'}}>{
            new Date(message.createdAt).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric'
            })
          }</div>
        </div>
      </Flex>
    </div>
  );
}