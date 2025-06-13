const GitHubPage = () => {
  return (
    <div>
      <h1 className="text-center text-3xl mt-20">GitHub学習ページ</h1>
      <ul className="max-w-xl mx-auto mt-12">
        <li>
          <h3 className="text-xl">ステップ１</h3>
          <p>featureブランチを作成</p>
        </li>
        <li className="mt-6">
          <h3 className="text-xl">ステップ２</h3>
          <p>Pull Requestを作成してmergeを実行する</p>
        </li>
      </ul>
    </div>
  );
};

export default GitHubPage;