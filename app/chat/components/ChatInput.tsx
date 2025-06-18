"use client";
import { useState } from "react";

type Props = {
  onSend: (userMessage: string) => void;
  isLoading: boolean,
};

const ChatInput = ({ onSend, isLoading }: Props) => {
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 p-4 border-t w-[90%] mx-auto"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="メッセージを入力"
        className="flex-grow px-4 py-2 border rounded-full"
        disabled={isLoading}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-full disabled:opacity-50"
        disabled={isLoading}
      >
        送信
      </button>
    </form>
  );
};

export default ChatInput;
