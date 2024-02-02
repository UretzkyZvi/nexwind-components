import { FC, useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import Browser from "../components/browser/browser";
import { listViewComponentSource } from "../components/lists/listViewComponentSource";
import {
  CardWithImageBody,
  CardWithImageHeader,
  DefaultCard,
} from "../components/card/cards";
import CodePreview from "@uiw/react-code-preview";
import { cardsComponentSource } from "../components/card/cardsComponentSource";
import MarkdownRenderer from "../components/markdown/MarkdownRenderer";

interface HomePageProps {}

const CardsPage: FC<HomePageProps> = ({}) => {
  const [markdown, setMarkdown] = useState("");
  const [links, setLinks] = useState<
    {
      id: string;
      text: string;
    }[]
  >([]);
  useEffect(() => {
    fetch("/nexwind-components/docs/ui/list-view.md")
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
      <div className="flex flex-col gap-6">
        <h1 className="text-4xl font-bold leading-6 text-primary pt-2">
          Cards
        </h1>
        <p className="pt-2">
          Cards are a flexible and extensible content container. It includes
          options for headers and footers, a wide variety of content, contextual
          background colors, and powerful display options.
        </p>
        <Browser componentSource={cardsComponentSource}>
          <DefaultCard
            buttonText="Next"
            onClick={() => alert("Clicked")}
            text="Default body"
            title="Default card"
          />
        </Browser>
        <Browser componentSource={cardsComponentSource}>
          <CardWithImageHeader />
        </Browser>
        <Browser componentSource={cardsComponentSource}>
          <CardWithImageBody />
        </Browser>
        <MarkdownRenderer
          markdownText={markdown}
          onLinksFounded={onLinksFounded}
        />
      </div>
    </Layout>
  );
};

export default CardsPage;
