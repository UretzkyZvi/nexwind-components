import { FC, useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import Browser from "../components/interactive/browser";
import DatePicker from "../components/datepicker/DatePicker";
import { datePickerComponentSource } from "../components/datepicker/DatePickerComponentSource";
import MarkdownRenderer from "../components/markdown/MarkdownRenderer";

const ContributePage: FC = () => {
  const [markdown, setMarkdown] = useState("");
  const [links, setLinks] = useState<
    {
      id: string;
      text: string;
    }[]
  >([]);
  useEffect(() => {
    fetch("/docs/contribute.md")
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
      <h1 className="text-4xl font-bold leading-6 text-primary pt-2">
        Contributing to Nexwind-Components
      </h1>
   
   
        <MarkdownRenderer
          markdownText={markdown}
          onLinksFounded={(links) => onLinksFounded(links)}
        /> 
   
    </Layout>
  );
};

export default ContributePage;
