export const fetchAIResponse = async (userMessage: string): Promise<string> => {
  console.log("(モック) OpenAI API呼び出し:", userMessage);

  if(userMessage.includes("こんにちは")) {
    return "こんにちは 今日はどうされましたか？"
  }

  return "申し訳ありません。現在AIは利用できませんが、これはサンプルの返答です";
  // const response = await fetch("https://api.openai.com/v1/chat/completions", {
  //   method: "POST",
  //   headers: {
  //     "Content-type": "application/json",
  //     Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
  //   },
  //   body: JSON.stringify({
  //     model: "gpt-3.5-turbo",
  //     messages: [
  //       { role: "system", content: "あなたは優しいAIアシスタントです。" },
  //       { role: "user", content: userMessage },
  //     ],
  //   }),
  // });

  // if(!response.ok) {
  //   throw new Error("OpenAI APIの呼び出しに失敗しました");
  // }

  // const data = await response.json();
  // return data.choices[0].message.content.trim();
};
