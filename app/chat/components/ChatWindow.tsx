import type { Message } from "../page";
import { useRef, useEffect } from "react";

const ChatWindow = ({
  messages,
  isLoading,
}: {
  messages: Message[];
  isLoading: boolean;
}) => {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="p-4 space-y-6 max-w-2xl mx-auto">
      {messages.map((msg, index) => {
        if (msg.role === "system") {
          return (
            <div key={index} className="text-center text-sm text-gray-500 my-4">
              {msg.content}
            </div>
          );
        }

        const isUser = msg.role === "user";

        return (
          <div
            key={index}
            className={`flex ${isUser ? "justify-end" : "justify-start"}`}
          >
            <div className="relative px-2 py-2 w-[1%] bg-gray-200 ">
              <div className="absolute top-0 left-0 w-full h-full bg-gray-100 rounded-br-full"></div>
            </div>
            <div
              className={`max-w-[75%] px-4 py-2 rounded-lg whitespace-pre-wrap break-words ${
                isUser
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-800 rounded-bl-none"
              }`}
            >
              {msg.content}
            </div>
          </div>
        );
      })}

      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg rounded-bl-none shadow-md">
            Now Loading...
          </div>
        </div>
      )}

      <div ref={endRef} />
    </div>
  );
};

export default ChatWindow;
