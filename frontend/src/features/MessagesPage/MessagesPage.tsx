import React, {useEffect, useState} from 'react'
import {socket} from "../../socket";
import {Button, Card, Divider, Flex, Modal, Space} from "antd";
import {
    CreateConversationModal
} from "./components/CreateConversationModal";
import {ConversationsList} from "./components/ConversationsList";
import {getMyConversations} from "../../api/conversation/getMyConversations";
import {MessagesList} from "./components/MessagesList";
import {useLocation} from "react-router-dom";

export const MessagesPage = () => {

    const { search } = useLocation();
    const query = new URLSearchParams(search);

    const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
    const [messages, setMessages] = useState<any>([]);
    const [createConversationModal, setCreateConversationModal] = useState(false);
    const [conversations, setConversations] = useState<any[]>([]);
    const [selectedConversationId, setSelectedConversationId] = useState<number | null>(parseInt(query.get('conversation') ?? ''));

    const onSelectConversation = (conversationId: number) => {
        setSelectedConversationId(conversationId);
        window.history.pushState({}, '', `?conversation=${conversationId}`);
    };

    useEffect(() => {
        console.log(messages)
    }, [messages]);

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onNewMessage(value: any) {
            setMessages((previous: any) => [...previous, value]);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('serverMessage', onNewMessage);

        async function fetchConversations() {
            try {
                const conversations = await getMyConversations();
                console.log('conversations: ', conversations);
                setConversations(conversations);
            } catch (err) {
                console.error(err);
            }
        };
        fetchConversations();

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('serverMessage', onNewMessage);
        };
    }, []);

    return (
        <Space size={24} direction='vertical' style={{width: "100%", }}>
            <CreateConversationModal open={createConversationModal} onCancel={() => setCreateConversationModal(false)} />
            <Button onClick={() => setCreateConversationModal(true)}>Create conversation</Button>
            <Card style={{overflow: 'hidden'}} bodyStyle={{ padding: 0, maxHeight: '70vh' }} title={'My conversations'}>
                <Flex style={{ height: '100%'}}>
                    <ConversationsList conversations={conversations} selectedConversationId={selectedConversationId} onSelectConversation={onSelectConversation} />
                    <Divider type='vertical' style={{ height: 'auto', margin: 0 }}/>
                    <MessagesList selectedConversationId={selectedConversationId} eventMessages={messages} />
                </Flex>
            </Card>
        </Space>
    )
}