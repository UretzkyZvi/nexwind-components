export const listViewComponentSource = `
import {
  ChevronDownIcon,
  ChevronLeftSquare,
  ChevronRightSquare,
  ChevronUpIcon,
  ChevronsUpDown,
  Search,
} from "lucide-react";
import React, { useState, useMemo } from "react";

interface SortOptionsProps<T> {
  property: keyof T;
  direction: "ascending" | "descending";
}

interface ListImage {
  src: string;
  alt: string;
}

interface ListHeader<T> {
  key: keyof T | keyof ListImage;
  label: string;
  sortable?: boolean;
  render: (value: any, item: T) => React.ReactNode;
}

interface ListViewProps<T> {
  items: T[];
  headers?: ListHeader<T>[];
  itemsPerPage?: number;
  sortOptions?: SortOptionsProps<T>;
  onSelected?: (item: T) => void;
}

const ListView = <TData extends Record<string, any>>({
  items,
  headers,
  itemsPerPage = 10,
  sortOptions,
  onSelected,
}: ListViewProps<TData>) => {
  const [currentSort, setCurrentSort] = useState<SortOptionsProps<TData>>(
    sortOptions ?? { property: "", direction: "ascending" },
  );
  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAndSortedItems = useMemo(() => {
    const filteredItems = items.filter((item) => {
      // Assuming you want to search in all string properties of the item
      return Object.values(item).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    });

    if (!currentSort) return filteredItems;
    const { property, direction } = currentSort;
    return filteredItems.sort((a, b) => {
      if (a[property] < b[property]) return direction === "ascending" ? -1 : 1;
      if (a[property] > b[property]) return direction === "ascending" ? 1 : -1;
      return 0;
    });
  }, [items, currentSort, searchQuery]);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = filteredAndSortedItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Function to get items for the current page
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedItems, currentPage, itemsPerPage]);

  // Pagination controls
  const goToNextPage = () =>
    setCurrentPage((current) => Math.min(current + 1, totalPages));
  const goToPrevPage = () =>
    setCurrentPage((current) => Math.max(current - 1, 1));
  const onPageChange = (page: number) => setCurrentPage(page);

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
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleSortChange = (property: keyof TData) => {
    const newDirection =
      currentSort?.property === property &&
      currentSort.direction === "ascending"
        ? "descending"
        : "ascending";
    setCurrentSort({ property, direction: newDirection });
  };

  const getColumnTemplate = () => {
    return headers ? headers.map(() => "1fr").join(" ") + " auto" : "1fr";
  };

  const gridTemplateColumns = getColumnTemplate();

  return (
    <>
      <div className="flex">
        <div className="relative rounded-lg border">
          <Search className="absolute inset-2 h-4 w-4 text-gray-600" />
          <input
            type="text"
            className="block flex-1 border-0 bg-transparent py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col">
        {headers && (
          <div className="hidden md:grid" style={{ gridTemplateColumns }}>
            {headers.map((header,index) => (
              <React.Fragment key={index}>
                {header.key !== "src" ? (
                  <span
                    key={String(header.key)}
                    className={\`p-2 font-medium uppercase text-gray-400 \${
                      header.sortable ? "cursor-pointer" : ""
                    }\`}
                    onClick={() =>
                      header.sortable && handleSortChange(header.key)
                    }
                  >
                    <div className="flex flex-row items-center">
                      {header.label}
                      {header.sortable &&
                        currentSort.property === header.key &&
                        (currentSort.direction === "ascending" ? (
                          <ChevronUpIcon className="h-4 w-4" />
                        ) : (
                          <ChevronDownIcon className="h-4 w-4" />
                        ))}
                      {header.sortable &&
                        currentSort.property !== header.key && (
                          <ChevronsUpDown className="h-4 w-4" />
                        )}
                    </div>
                  </span>
                ) : (
                  <span> </span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
        {paginatedItems.map((item, index) => (
          <div
            key={index}
            className="group relative my-1 rounded-md border bg-secondary/10 "
            onClick={() => onSelected?.(item)}
          >
            <div
              className="z-10 hidden group-hover:cursor-pointer group-hover:rounded-md group-hover:bg-secondary/20 group-hover:shadow-md md:grid"
              style={{ gridTemplateColumns }}
            >
              {headers
                ? headers.map((header) => (
                    <span
                      key={String(header.key)}
                      className="inline-flex items-center p-2"
                    >
                      {header.render(item[header.key], item)}
                    </span>
                  ))
                : Object.keys(item).map((key, idx, arr) => (
                    <div
                      key={key}
                      className={\`p-2 \${
                        idx === arr.length - 1 ? "text-right" : ""
                      }\`}
                    >
                      {item[key]}
                    </div>
                  ))}
            </div>
            {/*  tablet and desktop view */}
            <div className="p-2 md:hidden">
              {headers
                ? headers.map((header) => (
                    <>
                      {header.key === "src" ? (
                        header.render(item[header.key], item)
                      ) : (
                        <div
                          key={String(header.key)}
                          className="flex flex-row justify-between"
                        >
                          <span className="font-medium uppercase text-gray-700">
                            {header.label}
                          </span>
                          <span>{header.render(item[header.key], item)}</span>
                        </div>
                      )}
                    </>
                  ))
                : Object.keys(item).map((key) => (
                    <div key={key} className="flex flex-row justify-between">
                      <span className="font-medium text-gray-700">{key}</span>
                      <span>{item[key]}</span>
                    </div>
                  ))}
            </div>

            <div className="absolute inset-0  -z-50 h-full w-full">
              <div className="bg-black"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {paginatedItems && (
        <div className="flex w-full items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
         
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <nav
              className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              {getPaginationRange(currentPage, totalPages).map(
                (page, index) => {
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
                },
              )}
            </nav>
          </div>
          <div className="flex space-x-1">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="relative inline-flex items-center   bg-white  text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <ChevronLeftSquare className="w-6 h-6 hover:text-black/50 hover:cursor-pointer" strokeWidth={1.25} />
            </button>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="relative ml-3 inline-flex items-center  bg-white  text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <ChevronRightSquare className="w-6 h-6 hover:text-black/50 hover:cursor-pointer" strokeWidth={1.25} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ListView;


`;
