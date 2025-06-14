import { Metadata } from "next";
import { ReactNode } from "react";
import GithubHeader from "./components/Header";

export const metadata: Metadata = {
  title: "github learnページ",
  description: "github用の学習ページです。githubとは何か、githubでできること、細かい使い方までステップに分けて学習することができます。また、学習した履歴を残すことができどこまで習得したかを確認できるようになっています。"
}

const GithubLayoutPage = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <GithubHeader />
      { children }
    </div>
  );
};

export default GithubLayoutPage;