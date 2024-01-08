import React, { Profiler, useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import Browser from "../components/browser/browser";
import {
  TravelDestination,
  createMockTravelDestinations,
} from "../util/MockData";
import Table, { TableColumn } from "../components/table/table";
import CodePreview from "@uiw/react-code-preview";

import { listViewComponentSource } from "../components/lists/listViewComponentSource";

const TablePage = () => {
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
    },
    {
      key: "id",
      title: "ID",
      hidden: true,
      render: (item) => <span>{item.id}</span>,
    },
    {
      key: "title",
      title: "Title",
      sortable: true,
      filterable: true,
      render: (item) => (
        <div className="font-bold text-xl mb-2">{item.title}</div>
      ),
    },
    {
      key: "description",
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
    <Layout>
      <h1>Table Page</h1>

      <Browser componentSource="">
        <CodePreview
          code={`import Button from "../components/form/Button"
   import ReactDOM from 'react-dom/client';
   ReactDOM.createRoot(_mount_).render(
    <MemoizedTable />
   );`}
          dependencies={{ MemoizedTable }}
        />
      </Browser>
    </Layout>
  );
};
export default TablePage;
