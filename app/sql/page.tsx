"use client";

import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";

interface GetData {
  id: string;
  title: string;
  content: string;
}

type UpdateData = [
  {
    id: string;
    title: string;
    content: string;
  } 
];

type DeleteData = [
  {
    id: string;
    title: string;
    content: string;
  }
]

const RpcClientPage = () => {
  const [rpcGetAllData, setRpcGetAllData] = useState([]);
  const [rpcGetData, setRpcGetData] = useState([]);
  const [rpcUpdateData, setRpcUpdateData] = useState<UpdateData | null>(null);
  const [rpcDeleteData, setRpcDeleteData] = useState<DeleteData | null>(null);

  useEffect(() => {
    const fetchAllPost = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.rpc("get_all_posts");
      if (error) {
        console.log(error);
        return;
      }
      setRpcGetAllData(data);
    };
    fetchAllPost();
  }, []);

  useEffect(() => {
    const supabase = createClient();
    const fetchPost = async () => {
      const { data, error } = await supabase.rpc("get_posts_by_user_id", {
        user_id: "8084a634-2732-490f-b9c3-94f70c3c0195",
      });
      if (error) {
        console.log("エラー", error.message);
        return;
      }
      setRpcGetData(data);
    };
    fetchPost();
  }, []);

  useEffect(() => {
    const supabase = createClient();
    const deletePost = async () => {
      const { data, error } = await supabase.rpc("delete_post_by_id", {
        post_id: "554dabdd-85d5-40dd-bdb7-ec261806d01e"
      });
      if(error) {
        console.log("エラー", error.message);
        return;
      }
      setRpcDeleteData(data);
    }
    deletePost();
  }, []);

  useEffect(() => {
    const supabase = createClient();
    const updatePost = async () => {
      const { data, error } = await supabase.rpc("update_post_by_id_returning", {
        post_id: "554dabdd-85d5-40dd-bdb7-ec261806d01e",
        new_title: "sqlを使用してupdateされたタイトル",
        new_content: "sql用のコンテント",
      });
      if (error) {
        console.log("エラー", error.message);
        return;
      }
      setRpcUpdateData(data);
    };
    updatePost();
  }, []);

  return (
    <div>
      <h1 className="text-2xl text-center mt-12">Rpc関数の確認ページです</h1>
      <div className="border max-w-xl mx-auto mt-12">
        <h2 className="text-xl text-center text-blue-700">全ての投稿を取得</h2>
        <div className="flex flex-col justify-center items-center mt-6">
          {rpcGetAllData.map((data: GetData) => {
            return (
              <div key={data.id} className="flex gap-8">
                <div>タイトル {data.title}</div>
                <div>内容 {data.content}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="border max-w-xl mx-auto mt-12">
        <h2 className="text-xl text-center text-blue-700">
          特定のUserの投稿を取得
        </h2>
        <div className="flex flex-col mt-6 justify-center items-center">
          {rpcGetData.map((data: GetData) => {
            return (
              <div key={data.id} className="flex gap-8">
                <div>タイトル {data.title}</div>
                <div>内容 {data.content}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="border max-w-xl mx-auto mt-12">
        <h2 className="text-xl text-center text-blue-700 mb-6">更新された投稿</h2>
        <div className="flex gap-8">
          <div>タイトル {rpcUpdateData ? rpcUpdateData[0].title : ""}</div>
          <div>内容 {rpcUpdateData ? rpcUpdateData[0].content : ""}</div>
        </div>
      </div>
      <div className="border max-w-xl mx-auto mt-12">
        <h2 className="text-xl text-center text-blue-700 mb-6">削除された投稿</h2>
        <div className="flex gap-8">
          <div>タイトル {rpcDeleteData ? rpcDeleteData[0].title : ""}</div>
          <div>内容 {rpcDeleteData ? rpcDeleteData[0].content : ""}</div>
        </div>
      </div>
    </div>
  );
};

export default RpcClientPage;
