import DeleteButton from "../DeleteButton";
import { getPost } from "../getPost";
import Link from "next/link";

type PostProps = {
  params: Promise<{ id: string }>;
};

const PostPage = async (props: PostProps) => {
  const params = await props.params;
  const { id } = params;

  const post = await getPost(id);

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl text-gray-700 text-center mt-20">
        {post?.title}
      </h2>

      <table className="table-auto w-full border-collapse border mt-4 text-gray-700">
        <tbody>
          <tr>
            <td className="p-2 border border-gray-400 w-[20%]">投稿者</td>
            <td className="p-2 border border-gray-400 ">
              {post?.user.username}
            </td>
          </tr>
          <tr>
            <td className="p-2 border border-gray-400 w-[20%]">日付</td>
            <td className="p-2 border border-gray-400 ">
              {post?.createdAt
                ? new Date(post.createdAt).toLocaleString()
                : "不明"}
            </td>
          </tr>
          <tr>
            <td className="p-2 border border-gray-400 w-[20%]">内容</td>
            <td className="p-2 border border-gray-400 ">{post?.content}</td>
          </tr>
        </tbody>
      </table>

      <div className="w-full flex justify-center gap-8 mt-8">
        <div>
          <Link href={`/posts/${post?.id}/edit`} className="text-blue-700 text-xl">
            修正
          </Link>
        </div>
        <DeleteButton postId={post!.id} />
      </div>
    </div>
  );
};

export default PostPage;
