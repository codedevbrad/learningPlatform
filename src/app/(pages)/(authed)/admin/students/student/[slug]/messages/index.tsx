'use client';
import { useState, useEffect } from 'react';
import useSWR, { mutate } from 'swr';
import { TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { action__getMessages, action__postMessage } from './actions';
import { formatDistance, parseISO } from 'date-fns';

export default function MessagesTabContent({ studentId }) {
  const [newMessage, setNewMessage] = useState('');

  const fetcher = async () => {
    try {
      console.log(`Fetching messages for studentId: ${studentId}`);
      const data = await action__getMessages({ studentId });
      console.log('Fetched data:', data);
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      return [];
    }
  };

  const { data: messages = [], error, isLoading, isValidating } = useSWR(`fetchMessages-${studentId}`, fetcher, {
    onSuccess: (data) => {
      console.log('Data fetched successfully:', data);
    },
    onError: (error) => {
      console.log('Error fetching data:', error);
    },
  });

  useEffect(() => {
    if (isLoading) {
      console.log('Loading messages...');
    }
    console.log('Messages from cache:', !isValidating);
  }, [isValidating, isLoading]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      
      const messageData = {
        sender: 'TEACHER',
        text: newMessage,
        studentId,
        createdAt: new Date().toISOString(),
      };

      console.log('Sending message:', messageData);

      try {
        await action__postMessage({ messageData });
        mutate(`fetchMessages-${studentId}`);
      } 
      catch (error) {
        console.error('Failed to send message:', error);
      }
      setNewMessage('');
    }
  };

  return (
    <TabsContent value="messages" className="flex-1 flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        { error ? (
          <div>Failed to load messages</div>
        ) : (
          <>
            {messages.length === 0 && !isLoading ? (
              <div> No messages yet. Start the conversation! </div>
            ) : ( 
              messages.map((message) => {
                  // Check and log the createdAt field for debugging
                  const createdAt = message.timestamp;
                  console.log('Message createdAt:', createdAt);

                  // Ensure createdAt is a valid Date object
                  let displayTime = 'Unknown time';
                  if (createdAt) {
                    try {
                      // Check if createdAt is already a Date object
                      const date = createdAt instanceof Date ? createdAt : new Date(createdAt);
                      displayTime = formatDistance(date, new Date(), { addSuffix: true });
                    } catch (error) {
                      console.error('Error handling date:', error);
                    }
                  }

                  return (
                    <div key={message.id} className={`flex flex-col space-y-2 ${message.sender === 'TEACHER' ? 'items-end' : 'items-start'}`}>
                      <Card className={`text-md max-w-xs p-3 rounded-lg ${message.sender === 'TEACHER' ? 'bg-black text-white' : 'bg-gray-200 text-black'}`}>
                        <p>{message.text}</p>
                      
                      </Card>  
                      <small className="text-gray-500">{displayTime}</small>
                    </div>
                  );
                })
            )}
          </>
        )}
      </div>
      <div className="pt-4 border-t border-gray-300 flex items-end flex-col space-y-4">
        <Textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-lg resize-none text-sm"
          placeholder="Type your message..."
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          rows={3}
        />
        <Button onClick={handleSendMessage} className="ml-4">
          Send Message
        </Button>
      </div>
    </TabsContent>
  );
}
