import React, { Profiler, useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import Browser from "../components/browser/browser";
import {
  TravelDestination,
  createMockTravelDestinations,
} from "../util/MockData";
import Table, { TableColumn } from "../components/table/table";
import MarkdownRenderer from "../components/markdown/MarkdownRenderer";
import { tableComponentSource } from "../components/table/tableComponentSource";

const TablePage = () => {
  const [markdown, setMarkdown] = useState("");
  const [links, setLinks] = useState<
    {
      id: string;
      text: string;
    }[]
  >([]);
  useEffect(() => {
    fetch("/nexwind-components/docs/ui/table.md")
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

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const allSampleItems = createMockTravelDestinations(100);
  const [viewMode, setViewMode] = useState<"table" | "gallery">("table");
  useEffect(() => {
    setTotalPages(Math.ceil(allSampleItems.length / itemsPerPage));
  }, [allSampleItems, itemsPerPage]);

  const paginatedSampleItems = allSampleItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
    setTotalPages(Math.ceil(allSampleItems.length / newItemsPerPage));
  };

  const columns: TableColumn<TravelDestination>[] = [
    {
      key: "image",
      title: "Image",
      sortable: false,
      sourceKey: "image",
    },
    {
      key: "id",
      sourceKey: "id",
      title: "ID",
      hidden: true,

      render: (item) => <span>{item.id}</span>,
    },
    {
      key: "title",
      sourceKey: "title",
      title: "Title",
      sortable: true,
      filterable: true,
      render: (item) => (
        <div className="font-bold text-xl mb-2">{item.title}</div>
      ),
    },
    {
      key: "description",
      sourceKey: "description",
      title: "Description",
      filterable: true,
      render: (item) => (
        <p className="text-gray-700 text-base">{item.description}</p>
      ),
    },
  ];

  const MemoizedTable = React.memo(() => (
    <Table<TravelDestination>
      columns={columns}
      data={paginatedSampleItems}
      defaultViewMode={viewMode}
      onViewModeChange={(viewMode) => setViewMode(viewMode)}
      pagination={{
        currentPage: currentPage,
        totalPages: totalPages,
        onPageChange: handlePageChange,
        itemsPerPage: itemsPerPage,
        onItemsPerPageChange: handleItemsPerPageChange,
        itemsPerPageOptions: [10, 25, 50, 100],
      }}
    />
  ));

  return (
    <Layout onThePageNavigationLinks={links}>
      <h1 className="text-4xl font-bold leading-6 text-primary pt-2">Table</h1>
      <p className="pt-2 leading-6">
        The Table component is a highly customizable component that can be used
        to display tabular data. The Table component is designed to be used in
        conjunction with the ListView component to display data in a tabular
        format. The Table component is highly customizable and can be used to
        display data in a variety of formats.
      </p>
      <Browser componentSource={tableComponentSource}>
        <MemoizedTable />
      </Browser>
      <MarkdownRenderer
        markdownText={markdown}
        onLinksFounded={onLinksFounded}
      />
    </Layout>
  );
};
export default TablePage;
