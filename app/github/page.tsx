import { githubLearnSteps } from "./lib/steps";

const GitHubPage = () => {
  return (
    <div>
      <h1 className="text-center text-3xl mt-12">GitHub学習ページ</h1>
      <ul className="max-w-xl mx-auto mt-12">
        {githubLearnSteps.map((index) => {
          return (
            <li key={index.title} className="mb-6">
              <h3 className="text-xl">{index.title}</h3>
              <p>{index.content}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GitHubPage;
