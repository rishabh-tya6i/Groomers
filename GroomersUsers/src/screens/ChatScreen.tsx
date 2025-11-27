import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { colors } from '../theme';

const ChatScreen = () => {
  const [messages, setMessages] = useState<any[]>([]);

  React.useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello! How can I help you today?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Support',
          avatar: 'https://via.placeholder.com/150',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((newMessages: any[] = []) => {
    setMessages((previousMessages: any[]) => GiftedChat.append(previousMessages, newMessages));
  }, []);

  const renderBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: colors.primary,
          },
          left: {
            backgroundColor: colors.white,
          },
        }}
        textStyle={{
          right: {
            color: colors.white,
          },
          left: {
            color: colors.text,
          },
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={newMessages => onSend(newMessages)}
        user={{
          _id: 1,
        }}
        renderBubble={renderBubble}
        alwaysShowSend
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default ChatScreen;
