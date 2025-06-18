"use client";
import { useState } from "react";
import ChatInput from "./components/ChatInput";
import ChatWindow from "./components/ChatWindow";
import { fetchAIResponse } from "@/lib/openai";

export type Message = {
  role: "user" | "system" | "assistant";
  content: string;
};

const AIChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "system", content: "こんにちは、AIチャットへようこそ" },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSend = (userMessage: string) => {
    setIsLoading(true);
    setMessages((prev) => [
      ...prev,
      { role: "user", content: userMessage },
    ]);

    try {
      setTimeout(async () => {
        const aiResponse = await fetchAIResponse(userMessage);
        setMessages((prev) => [...prev, { role: "assistant", content: aiResponse }])
        setIsLoading(false);
      }, 1000);
    } catch(e) {
      console.error("APIエラー", e);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 overflow-y-auto">
        <ChatWindow messages={messages} isLoading={isLoading} />
      </div>
      <ChatInput onSend={handleSend} isLoading={isLoading}/>
    </div>
  );
};

export default AIChatPage;
