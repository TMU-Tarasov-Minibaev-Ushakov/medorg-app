import {FC, useEffect, useRef, useState} from "react";
import {getConversationsById, GetConversationsByIdResponse} from "../../../api/conversation/getConversationsById";
import {useUserInfo} from "../../../contexts/UserInfoContext";
import {Message} from "./Message";
import {Button, Empty, Flex, Input, Space} from "antd";
import {sendMessage} from "../../../api/conversation/sendMessage";
import {socket} from "../../../socket";

type MessagesListProps = {
  selectedConversationId: number | null,
  eventMessages: { senderId: number, conversationId: number, content: string, senderEmail: string, createdAt: string, id: number}[]
}

export const MessagesList: FC<MessagesListProps> = ({selectedConversationId, eventMessages}) => {

  const { userInfo } = useUserInfo();
  const [conversation, setConversation] = useState<GetConversationsByIdResponse | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selectedConversationId) {
      return;
    }
    getConversationsById(selectedConversationId)
      .then((conversation) => {
      setConversation(conversation);
    }).catch((e) => {
      console.error(e);
    });
  }, [selectedConversationId]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [conversation]);

  const allMessages = [...conversation?.messages ?? [], ...eventMessages.filter(m => m.conversationId === selectedConversationId)]
  const messages = allMessages?.map((message, i) => {
    return (
      <Message key={i} message={message} isOuterMessage={message.senderId !== userInfo?.id} />
    );
  });

  const handleSendMessage = async () => {
    if (!selectedConversationId || !inputValue || !userInfo) {
      return;
    }
    try {
      console.log({
        conversationId: selectedConversationId,
        message: inputValue

      })
      await sendMessage({
        conversationId: selectedConversationId,
        message: inputValue
      });
      setInputValue('');
      socket.emit('clientMessage', {
        senderId: userInfo.id,
        conversationId: selectedConversationId,
        content: inputValue,
        senderEmail: userInfo.email,
        createdAt: new Date()
      })
      // window.location.reload();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Flex gap={12} vertical style={{width: '100%', padding: '12px', maxHeight: '70vh', overflowY: 'scroll'}}>
      <Space ref={containerRef} direction={'vertical'} style={{
        flexGrow: 1,
        overflowY: 'scroll',
        padding: 12
      }}>
        {messages?.length ? messages : <Empty style={{marginTop: 50}}/>}
      </Space>
      <Flex gap={8}>
        <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} style={{width: '100%', padding: '8px'}} />
        <Button style={{ height: '100%'}} onClick={handleSendMessage}>Send</Button>
      </Flex>
    </Flex>
  );
};