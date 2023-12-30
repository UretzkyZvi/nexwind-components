import React, { useState, useMemo } from "react";
import Button from "../form/Button";

interface SortOptionsProps<T> {
  property: keyof T;
  direction: "ascending" | "descending";
}

interface ListHeader<T> {
  key: keyof T;
  label: string;
  show?: boolean;
  isImage?: boolean;
  render: (value: any, item: T) => React.ReactNode;
}

interface ListViewProps<T> {
  items: T[];
  headers?: ListHeader<T>[];
  sortOptions?: SortOptionsProps<T>;
  onSortChange?: (newSortOptions: SortOptionsProps<T>) => void;
}

const ListView = <TData extends Record<string, any>>({
  items,
  headers,
  sortOptions,
  onSortChange,
}: ListViewProps<TData>) => {
  const [currentSort, setCurrentSort] = useState<SortOptionsProps<TData>>(
    sortOptions || { property: "", direction: "ascending" }
  );
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredAndSortedItems = useMemo(() => {
    const filteredItems = items.filter((item) =>
      Object.values(item).some(
        (value) => value && value.toString().toLowerCase().includes(searchQuery)
      )
    );

    if (!currentSort) return filteredItems;

    const { property, direction } = currentSort;
    return filteredItems.sort((a, b) => {
      if (a[property] < b[property]) return direction === "ascending" ? -1 : 1;
      if (a[property] > b[property]) return direction === "ascending" ? 1 : -1;
      return 0;
    });
  }, [items, currentSort, searchQuery]);

  const handleSortChange = (property: keyof TData) => {
    const newDirection =
      currentSort?.property === property &&
      currentSort.direction === "ascending"
        ? "descending"
        : "ascending";
    setCurrentSort({ property, direction: newDirection });
    onSortChange?.({ property, direction: newDirection });
  };

  const getColumnTemplate = () => {
    return headers ? headers.map(() => "1fr").join(" ") + " auto" : "1fr";
  };

  const gridTemplateColumns = getColumnTemplate();

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between mb-4">
        {sortOptions && (
          <Button onClick={() => handleSortChange(sortOptions.property)}>
            Sort by {sortOptions.property.toString()}
          </Button>
        )}
        <input
          type="text"
          placeholder={`Filter items ...`}
          value={searchQuery}
          onChange={handleSearchChange}
          className="p-2 border rounded"
        />
      </div>
      <div className="flex flex-col w-full space-y-2 pt-6">
        {headers && (
          <div className="hidden md:grid" style={{ gridTemplateColumns }}>
            {headers.map((header) => (
              <span
                key={String(header.key)}
                className="uppercase font-medium text-gray-400 p-2"
              >
                {header.show !== false && header.label}
              </span>
            ))}
          </div>
        )}
        {filteredAndSortedItems.map((item, index) => (
          <div
            key={index}
            className="border rounded-md bg-accent px-2 py-6 sm:py-4"
          >
            <div className="hidden md:grid" style={{ gridTemplateColumns }}>
              {headers
                ? headers.map((header) => (
                    <>
                      {header.isImage ? (
                        <>
                          <div className="w-16 md:w-full">
                            {header.render(item[header.key], item)}
                          </div>
                        </>
                      ) : (
                        <>
                          <span
                            key={String(header.key)}
                            className="p-2 inline-flex self-center"
                          >
                            {header.render(item[header.key], item)}
                          </span>
                        </>
                      )}
                    </>
                  ))
                : Object.keys(item).map((key, idx, arr) => (
                    <div
                      key={key}
                      className={`p-2 ${
                        idx === arr.length - 1 ? "text-right" : ""
                      }`}
                    >
                      {item[key]}
                    </div>
                  ))}
            </div>

            <div className="md:hidden p-2">
              {headers
                ? headers.map((header) => (
                    <div
                      key={String(header.key)}
                      className="flex flex-row justify-between gap-2  "
                    >
                      <span className="uppercase font-medium text-gray-700">
                        {header.show !== false && header.label}
                      </span>
                      <p className="text-ellipsis overflow-hidden text-xs">
                        {header.render(item[header.key], item)}
                      </p>
                    </div>
                  ))
                : Object.keys(item).map((key) => (
                    <div key={key} className="flex flex-row justify-between">
                      <span className="font-medium text-gray-700">{key}</span>
                      <p className=" text-ellipsis overflow-hidden text-xs">
                        {item[key]}
                      </p>
                    </div>
                  ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListView;
