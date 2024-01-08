export const listViewComponentSource = `
import React, { useState, useMemo } from "react";
import Button from "../Button";
import ReactDOM from 'react-dom/client';

interface SortOptionsProps<T> {
  property: keyof T;
  direction: "ascending" | "descending";
}

interface ListHeader<T> {
  key: keyof T;
  label: string;
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

  const sortedItems = useMemo(() => {
    if (!currentSort) return items;
    const { property, direction } = currentSort;
    return [...items].sort((a, b) => {
      if (a[property] < b[property]) return direction === "ascending" ? -1 : 1;
      if (a[property] > b[property]) return direction === "ascending" ? 1 : -1;
      return 0;
    });
  }, [items, currentSort]);

  const handleSortChange = (property: keyof TData) => {
    const newDirection = currentSort?.property === property &&
      currentSort.direction === "ascending" ? "descending" : "ascending";
    setCurrentSort({ property, direction: newDirection });
    onSortChange?.({ property, direction: newDirection });
  };

  const getColumnTemplate = () => {
    return headers
      ? headers.map(() => "1fr").join(" ") + " auto"
      : "1fr";
  };

  const gridTemplateColumns = getColumnTemplate();

  return (
    <>
      <div className="flex">
        {sortOptions && (
          <Button onClick={() => handleSortChange(sortOptions.property)}>
            Sort by {sortOptions.property.toString()}
          </Button>
        )}
      </div>
      <div className="flex flex-col w-full">
        {headers && (
          <div className="hidden md:grid" style={{ gridTemplateColumns }}>
            {headers.map((header) => (
              <span key={String(header.key)} className="uppercase font-medium text-gray-400 p-2">
                {header.label}
              </span>
            ))}
          </div>
        )}
        {sortedItems.map((item, index) => (
          <div key={index} className="border rounded-md my-1">
            <div className="hidden md:grid" style={{ gridTemplateColumns }}>
              {headers ? headers.map((header) => (
                <span key={String(header.key)} className="p-2">
                  {header.render(item[header.key], item)}
                </span>
              )) : Object.keys(item).map((key, idx, arr) => (
                <div key={key} className={\`p-2 \${idx === arr.length - 1 ? "text-right" : ""}\`}>
                  {item[key]}
                </div>
              ))}
            </div>
            <div className="md:hidden p-2">
              {headers ? headers.map((header) => (
                <div key={String(header.key)} className="flex flex-row justify-between">
                  <span className="uppercase font-medium text-gray-700">
                    {header.label}
                  </span>
                  <span>{header.render(item[header.key], item)}</span>
                </div>
              )) : Object.keys(item).map(key => (
                <div key={key} className="flex flex-row justify-between">
                  <span className="font-medium text-gray-700">{key}</span>
                  <span>{item[key]}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ListView;
`;
