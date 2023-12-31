import React, { FC, useEffect, useState } from "react";
import MarkdownRenderer from "../components/markdown/MarkdownRenderer";
import Layout from "../components/layout/Layout";
import ListView from "../components/lists/ListView";
import { generateHouseData } from "../util/MockData";
import { listViewComponentSource } from "../components/lists/listViewComponentSource";
import Browser from "../components/browser/browser";
import CodePreview from "@uiw/react-code-preview";

interface ListViewPageProps {}

const ListViewPage: FC<ListViewPageProps> = () => {
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

  const MemorizeListView = React.memo(() => (
    <ListView
      items={generateHouseData(10)}
      headers={[
        {
          key: "image",
          show: false,
          label: "Image",
          isImage: true,
          render: (value) => <img src={value} />,
        },
        {
          key: "rooms",
          label: "Rooms",
          render: (value) => <span className="font-bold">{value}</span>,
        },
        {
          key: "description",
          label: "description",

          render: (value) => <span>{value}</span>,
        },
      ]}
      onSortChange={(sort) => console.log(sort)}
      sortOptions={{
        direction: "ascending",
        property: "rooms",
      }}
    />
  ));

  return (
    <Layout onThePageNavigationLinks={links}>
      <h1>ListViewPage</h1>
      <Browser componentSource={listViewComponentSource}>
        <CodePreview
        theme="dark"
        className="w-2/4"
          code={`import ReactDOM from 'react-dom/client';
   ReactDOM.createRoot(_mount_).render(
 <MemorizeListView />
   );`}
          dependencies={{ MemorizeListView }}
        />
      </Browser>
      <MarkdownRenderer
        markdownText={markdown}
        onLinksFounded={onLinksFounded}
      />
    </Layout>
  );
};
export default ListViewPage;
