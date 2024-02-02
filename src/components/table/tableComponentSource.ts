export const tableComponentSource = `
import {
    BookImage,
    ChevronDownIcon,
    ChevronUpIcon,
    ChevronsUpDown,
    ChevronLeftSquare, 
    ChevronRightSquare,
    Table as TableIcon,
    Shapes,
  } from "lucide-react";
  import React, { FC, useMemo, useState } from "react";
   
  const TableEmpty:FC = () => {
    return (
      <div className="flex flex-col items-center">
        <Shapes strokeWidth={0.75} className="h-32 w-32" />
        <span className="text-sm font-medium  ">No data found</span>
      </div>
    );
  };
  export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    itemsPerPage?: number;
    itemsPerPageOptions?: number[];
    onPageChange: (page: number) => void;
    onItemsPerPageChange?: (itemsPerPage: number) => void;
  }
  
  const TablePagination: FC<PaginationProps> = ({
    currentPage,
    totalPages,
    itemsPerPage,
    itemsPerPageOptions,
    onPageChange,
    onItemsPerPageChange,
  }) => {
    const getPaginationRange = (currentPage: number, totalPages: number) => {
      const delta = 2; // how many pages to show before and after the current page
      const range = [];
  
      for (
        let i = Math.max(2, currentPage - delta);
        i <= Math.min(totalPages - 1, currentPage + delta);
        i++
      ) {
        range.push(i);
      }
  
      if (currentPage - delta > 2) {
        range.unshift("...");
      }
      if (currentPage + delta < totalPages - 1) {
        range.push("...");
      }
  
      range.unshift(1);
      if (totalPages > 1) {
        range.push(totalPages);
      }
      return range;
    };
  
    return (
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            className="relative inline-flex items-center   bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <ChevronLeftSquare strokeWidth={1.25} />
          </button>
          <button
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            className="relative ml-3 inline-flex items-center  bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <ChevronRightSquare strokeWidth={1.25} />
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          {itemsPerPage && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">Show:</span>
              <select
                value={itemsPerPage}
                onChange={(e) =>
                  onItemsPerPageChange?.(parseInt(e.target.value, 10))
                }
                className="relative w-full cursor-pointer rounded-md border-none  bg-white py-1.5 pl-3 
                        pr-10 text-left text-gray-900  ring-1  ring-gray-200 focus:outline-none focus:ring-2
                         focus:ring-primary  sm:text-sm sm:leading-6"
              >
                {itemsPerPageOptions?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div>
            <nav
              className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              {getPaginationRange(currentPage, totalPages).map((page, index) => {
                if (page === "...") {
                  return (
                    <span
                      key={index}
                      className="border-gray-300 px-4 py-2 text-sm font-medium text-gray-500"
                    >
                      ...
                    </span>
                  );
                }
                return (
                  <button
                    key={index}
                    onClick={() => onPageChange(page as number)}
                    className={\`border-gray-300 px-4 py-2 text-sm font-medium \${
                      currentPage === page
                        ? "bg-primary text-white"
                        : "bg-white text-gray-500 hover:bg-gray-50"
                    }\`}
                  >
                    {page}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    );
  };
  
   
  
  // Define a generic interface for table columns
  export interface TableColumn<T> {
    sourceKey: keyof T;
    key: string;
    title: string;
    sortable?: boolean;
    filterable?: boolean;
    hidden?: boolean;
    render?: (item: T) => React.ReactNode; // Optional custom renderer
  }
  
  interface TableProps<T> {
    columns: TableColumn<T>[];
    data: T[];
    pagination?: PaginationProps;
    children?: React.ReactNode;
    defaultViewMode?: "table" | "gallery";
    onViewModeChange?: (viewMode: "table" | "gallery") => void;
  }
  
  const Table = <T extends {}>({
    columns,
    data,
    pagination,
    children,
    defaultViewMode = "table",
    onViewModeChange,
  }: TableProps<T>) => {
    const [sortConfig, setSortConfig] = useState<{
      key: keyof T | null;
      direction: "ascending" | "descending" | null;
    }>({ key: null, direction: null });
  
    const [filterConfig, setFilterConfig] = useState({
      key: null as keyof T | null,
      condition: "",
      value: "",
    });
    const [viewMode, setViewMode] = useState<"table" | "gallery">(
      defaultViewMode,
    );
  
    const toggleViewMode = () => {
      setViewMode(viewMode === "table" ? "gallery" : "table");
      onViewModeChange?.(viewMode === "table" ? "gallery" : "table");
    };
  
    const filterableColumns = columns.filter((column) => column.filterable);
  
    const sortedAndFilteredData = useMemo(() => {
      // First, apply filtering to the data
      let filteredItems = data;
      if (filterConfig.key !== null && filterConfig.value !== "") {
        filteredItems = data.filter((item) => {
          const itemValue = item[filterConfig.key as keyof T];
          switch (filterConfig.condition) {
            case "eq":
              return itemValue == filterConfig.value;
            case "lt":
              return itemValue < filterConfig.value;
            case "gt":
              return itemValue > filterConfig.value;
            case "lte":
              return itemValue <= filterConfig.value;
            case "gte":
              return itemValue >= filterConfig.value;
            case "ne":
              return itemValue != filterConfig.value;
            case "in":
              return (itemValue as string).includes(filterConfig.value);
            case "nin":
              return !(itemValue as string).includes(filterConfig.value);
            default:
              return true;
          }
        });
      }
  
      // Then, apply sorting to the filtered data
      if (sortConfig.key !== null) {
        filteredItems.sort((a, b) => {
          const aValue = a[sortConfig.key as keyof T];
          const bValue = b[sortConfig.key as keyof T];
          if (aValue < bValue) {
            return sortConfig.direction === "ascending" ? -1 : 1;
          }
          if (aValue > bValue) {
            return sortConfig.direction === "ascending" ? 1 : -1;
          }
          return 0;
        });
      }
  
      return filteredItems;
    }, [data, sortConfig, filterConfig]);
  
    const requestSort = (key: keyof T) => {
      const column = columns.find((column) => column.key === key);
      if (!column?.sortable) {
        return; // Do nothing if the column is not sortable
      }
  
      let direction: "ascending" | "descending" = "ascending";
      if (sortConfig.key === key && sortConfig.direction === "ascending") {
        direction = "descending";
      }
      setSortConfig({ key, direction });
    };
  
    function formatCell(cellValue: unknown, key: string): React.ReactNode {
      if (
        typeof cellValue === "string" ||
        typeof cellValue === "number" ||
        typeof cellValue === "boolean"
      ) {
        if (key === "image") {
          return (
            <img
              className="w-24 bg-gray-300 object-none object-center"
              src={cellValue as string}
              alt={\`Image \${key}\`}
            />
          );
        }
        return <div className="w-full">{cellValue.toString()}</div>;
      }
      return null;
    }
  
    return (
      <div className="flex flex-col">
        <div className="flex flex-col-reverse items-center justify-between gap-2 md:flex-row">
          <div className="mb-4 flex w-full  space-x-1 ">
            <select
              className="relative w-full cursor-pointer rounded-md  border-none bg-white py-1.5 
                pl-3 pr-10 text-left   text-gray-900 ring-1 ring-inset ring-gray-200 focus:outline-none focus:ring-2
                 focus:ring-primary  sm:text-sm sm:leading-6"
              value={filterConfig.key ? filterConfig.key.toString() : ""}
              onChange={(e) => {
                const key = e.target.value as keyof T;
                setFilterConfig({
                  ...filterConfig,
                  key: key === "" ? null : key, // Ensuring we set to null if empty string
                });
              }}
            >
              <option
                className="relative cursor-default select-none py-2 pl-3 pr-9"
                value=""
              >
                Select filter by
              </option>
              {filterableColumns.map((column) => (
                <option key={column.key as string} value={column.key.toString()}>
                  {column.title}
                </option>
              ))}
            </select>
            <select
              className="relative w-full cursor-pointer rounded-md border-none  bg-white py-1.5 pl-3 
                pr-10 text-left text-gray-900  ring-1  ring-gray-200 focus:outline-none focus:ring-2
                 focus:ring-primary  sm:text-sm sm:leading-6"
              value={filterConfig.condition}
              onChange={(e) =>
                setFilterConfig({ ...filterConfig, condition: e.target.value })
              }
            >
              <option value="">Select condition</option>
              <option value="eq">Equal</option>
              <option value="lt">Less Than</option>
              <option value="gt">Greater Than</option>
              <option value="lte">Less Than or Equal</option>
              <option value="gte">Greater Than or Equal</option>
              <option value="ne">Not Equal</option>
              <option value="in">Contains</option>
              <option value="nin">Does Not Contain</option>
            </select>
  
            <input
              type="text"
              className="relative w-full cursor-text rounded-md border-none bg-white py-1.5 
                pl-3 pr-10 text-left   text-gray-900 ring-1 ring-gray-200  focus:outline-none focus:ring-2
                 focus:ring-primary  sm:text-sm sm:leading-6"
              value={filterConfig.value}
              onChange={(e) =>
                setFilterConfig({ ...filterConfig, value: e.target.value })
              }
              placeholder="Enter filter value..."
            />
          </div>
          <div className="inline-flex w-full justify-end">
            <div className="flex flex-row">
              <button onClick={toggleViewMode} className="p-2 text-sm">
                <span className="sr-only">Toggle view mode</span>
                <span className="flex items-center gap-2 ">
                  Switch to
                  {viewMode === "table" ? (
                    <BookImage className="h-4 w-4 text-gray-300" />
                  ) : (
                    <TableIcon className="h-4 w-4 text-gray-300" />
                  )}
                </span>
              </button>
              <> {children}</>
            </div>
          </div>
        </div>
        <div className="max-h-[76dvh] overflow-auto ">
          {viewMode === "table" ? (
            <table className="min-w-full divide-y  divide-gray-200">
              <thead className="sticky top-0 z-10 bg-gray-50 ">
                <tr>
                  {columns.map((column) =>
                    column.hidden ? null : (
                      <th
                        key={column.key as string}
                        onClick={() =>
                          column.sortable && requestSort(column.sourceKey)
                        }
                        className={\` px-2 py-1 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-6 sm:py-3 \${
                          column.sortable ? "cursor-pointer" : ""
                        }\`}
                      >
                        <div className="flex flex-row">
                          {column.title}
                          {column.sortable &&
                            sortConfig.key === column.key &&
                            (sortConfig.direction === "ascending" ? (
                              <ChevronUpIcon className="h-4 w-4" />
                            ) : (
                              <ChevronDownIcon className="h-4 w-4" />
                            ))}
                          {column.sortable && sortConfig.key !== column.key && (
                            <ChevronsUpDown className="h-4 w-4" />
                          )}
                        </div>
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 overflow-y-auto  bg-white">
                {sortedAndFilteredData.length > 0 ? (
                  sortedAndFilteredData.map((item, rowIndex) => (
                    <tr key={"tr" + rowIndex}>
                      {columns.map(({ sourceKey, key, render, hidden }) =>
                        hidden ? null : (
                          <td
                            key={\`\${key as string}-\${rowIndex}\`}
                            className="text-wrap px-2 text-center text-xs sm:px-4 sm:py-2 "
                          >
                            {render
                              ? render(item)
                              : formatCell(item[sourceKey], key as string)}
                          </td>
                        ),
                      )}
                    </tr>
                  ))
                ) : (
                  <tr key={"empty_tr"}>
                    <td
                      key={"empty_td"}
                      colSpan={columns.length}
                      className="text-center text-gray-500  md:h-[70dvh]"
                    >
                      <TableEmpty key={"empty_table"} />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {sortedAndFilteredData.map((item, index) => (
                  <div
                    key={index}
                    className="max-w-sm overflow-hidden rounded bg-white shadow-lg"
                  >
                    {columns.map(({ sourceKey, key, render, hidden, title }) =>
                      key === "image" ? (
                        <div key={key} className="flex justify-center">
                          {render ? (
                            render(item)
                          ) : (
                            <img
                              className="h-48 w-full object-fill transition-all duration-300 ease-in-out hover:scale-105"
                              src={item[sourceKey] as string}
                              alt={\`\${key as string} \${index}\`}
                            />
                          )}
                        </div>
                      ) : hidden ? null : (
                        <div
                          key={key as string}
                          className=" text-wrap px-2 py-1 text-xs sm:px-6 sm:py-2"
                        >
                          <div className="flex flex-col space-y-2">
                            <div className="text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                              {title}
                            </div>
                            <div className="text-black font-bold">
                              {render
                                ? render(item)
                                : formatCell(item[sourceKey], key as string)}
                            </div>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div>
          {pagination && (
            <TablePagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              itemsPerPage={pagination.itemsPerPage}
              itemsPerPageOptions={pagination.itemsPerPageOptions}
              onPageChange={pagination.onPageChange}
              onItemsPerPageChange={pagination.onItemsPerPageChange}
            />
          )}
        </div>
      </div>
    );
  };
  
  export default Table;
  `;  