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
          sortable: false,
          label: "Image",
          render: (value) => <img src={value} />,
        },
        {
          key: "rooms",
          label: "Rooms",
          sortable: true,
          render: (value) => <span className="font-bold">{value}</span>,
        },
        {
          key: "description",
          label: "description",

          render: (value) => <span>{value}</span>,
        },
      ]}
      sortOptions={{
        direction: "ascending",
        property: "rooms",
      }}
    />
  ));

  return (
    <Layout onThePageNavigationLinks={links}>
      <div className="flex flex-col gap-6">
      <h1 className="text-4xl font-bold leading-6 text-primary pt-2">
          List View
        </h1>
        <p className="pt-2">
          The ListView component is a generic component that can be used to
          display a list of items. It is a highly customizable component that
          can be used to display any type of data. The ListView component is
          designed to be used in conjunction with the Table component to display
          data in a tabular format. The ListView component is highly
          customizable and can be used to display data in a variety of formats.
        </p>
        
        <Browser componentSource={listViewComponentSource}>
        <MemorizeListView />
      </Browser>
      <MarkdownRenderer
        markdownText={markdown}
        onLinksFounded={onLinksFounded}
      />
      </div>
     
    </Layout>
  );
};
export default ListViewPage;
