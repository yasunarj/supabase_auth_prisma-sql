"use server";

import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getPosts } from "./getPosts";
import LogoutButton from "./logout";

const DashboardPage = async () => {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    return (
      <div className="text-4xl text-red-700 text-center mt-20">
        ログインしていません
      </div>
    );
  }

  const posts = await getPosts();

  return (
    <div>
      <h2 className="text-center text-4xl mt-20">Dashboard</h2>
      <table className="w-[90%] mx-auto table-auto border-collapse border border-gray-600 text-gray-700 my-8">
        <thead>
          <tr className="w-full">
            <th className="py-2 border border-gray-300 text-gray-600 w-[20%]">
              投稿者
            </th>
            <th className="py-2 border border-gray-300 text-gray-600 w-[30%]">
              タイトル
            </th>
            <th className="py-2 border border-gray-300 text-gray-600 w-[30%]">
              日付
            </th>
            <th className="py-2 border border-gray-300 text-gray-600 w-[20%]">
              詳細
            </th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => {
            return (
              <tr key={post.id} className="w-full">
                <td className="py-2 border border-gray-300 text-gray-600 w-[20%] text-center">
                  {post.user.username}
                </td>
                <td className="py-2 border border-gray-300 text-gray-600 w-[30%] text-center">
                  {post.title}
                </td>
                <td className="py-2 border border-gray-300 text-gray-600 w-[30%] text-center">
                  {new Date(post.createdAt).toLocaleDateString()}
                </td>
                <td className="py-2 border border-gray-300 text-blue-600 w-[20%] text-center">
                  <Link href={`/posts/${post.id}`}>詳細</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex flex-col gap-4 justify-center items-center">
        <Link href="/new" className="text-blue-700 text-xl hover:text-blue-900">
          投稿する
        </Link>
        <Link href="/sql" className="text-green-700 text-xl hover:text-green-900">
          SQL確認ページ
        </Link>
        <Link href="/github" className="text-purple-700 text-xl hover:text-purple-900">
          GitHub確認ページ
        </Link>
        <Link href="/chat" className="text-yellow-700 text-xl hover:text-yellow-900">
          AIに相談してみよう
        </Link>
      </div>
      <div>
        <LogoutButton />
      </div>
    </div>
  );
};

export default DashboardPage;
