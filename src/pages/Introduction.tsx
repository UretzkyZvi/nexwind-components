import { FC, useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import MarkdownRenderer from "../components/markdown/MarkdownRenderer";

interface IntroductionPageProps {}

const IntroductionPage: FC<IntroductionPageProps> = ({}) => {
  const [markdown, setMarkdown] = useState("");
  const [links, setLinks] = useState<
    {
      id: string;
      text: string;
    }[]
  >([]);
  useEffect(() => {
    fetch("/nexwind-components/docs/introduction.md")
      .then((response) => response.text())
      .then((text) => setMarkdown(text));
  }, []);

  const onLinksFounded = (
    links: {
      id: string;
      text: string;
    }[]
  ) => {
    setLinks(links);
  };

  return (
    <Layout onThePageNavigationLinks={links}>
      <h1 className="text-2xl lg:text-4xl font-bold leading-6 text-primary py-6">
        Introduction to Nexwind-Components
      </h1>
      <MarkdownRenderer
        markdownText={markdown}
        onLinksFounded={(links) => onLinksFounded(links)}
      />
    </Layout>
  );
};

export default IntroductionPage;
