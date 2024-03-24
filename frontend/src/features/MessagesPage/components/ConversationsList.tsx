import React, {FC} from 'react'
import {List, Space, theme, Typography} from "antd";
import {CreateConversationsResponse} from "../../../api/conversation/getMyConversations";
import {useUserInfo} from "../../../contexts/UserInfoContext";

type ConversationsListProps = {
  conversations: CreateConversationsResponse,
  selectedConversationId: number | null,
  onSelectConversation: (conversationId: number) => void,
}

export const ConversationsList: FC<ConversationsListProps> = ({ conversations, selectedConversationId, onSelectConversation }) => {
  const {token: themeToken} = theme.useToken();
  const { userInfo } = useUserInfo();
  const conversationItems = conversations.map((conversation) => {
    return (
      <List.Item key={conversation.id} style={{
        padding: '16px',
        cursor: 'pointer',
        backgroundColor: selectedConversationId === conversation.id ? themeToken.colorPrimary : themeToken.colorBgBase,
      }} onClick={() => onSelectConversation(conversation.id)}>
        <Space direction='vertical'>
          <Typography.Text strong style={{
            color: selectedConversationId === conversation.id ? themeToken.colorWhite : themeToken.colorText,
          }}>{conversation.participants.filter(p => p.id !== userInfo?.id)[0].email}</Typography.Text>
          { conversation.messages.length > 0 ? <Typography.Text type='secondary' style={{
            color: selectedConversationId === conversation.id ? themeToken.colorWhite : themeToken.colorText,
          }}>{conversation.messages[0].content}</Typography.Text> : null}
        </Space>
      </List.Item>
    )
  });

  return (
    <List style={{ borderRight: '1px solid #0000000', width: '25%',  maxHeight: '70vh', overflowY: 'scroll' }} >
      {conversationItems}
    </List>
  )
}