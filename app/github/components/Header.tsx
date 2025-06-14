import Link from "next/link";

const GithubHeader = () => {
  return (
    <div className="w-full bg-gray-100">
      <div className="flex max-w-2xl justify-between mx-auto py-4 items-center">
        <h2 className="text-lg font-bold">
          <Link href={"/github"}>Learn The Github</Link>
        </h2>
        <nav>
          <ul className="flex gap-8 text-sm">
            <li className="text-blue-700 hover:text-blue-900">
              <Link href="/github/LearningHistory">学習履歴を確認する</Link>
            </li>
            <li className="text-blue-700 hover:text-blue-900">
              <Link href="/dashboard">ホームへ戻る</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default GithubHeader;
