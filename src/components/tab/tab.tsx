import React, { useState } from "react";

interface TabProps {
  titles: string[];
  children: React.ReactNode[];
  onTabChange?: (index: number) => void;
}

const Tabs: React.FC<TabProps> = ({ titles, children, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    if (onTabChange) {
      onTabChange(index);
    }
  };
  return (
    <div>
      <div className="flex flex-1 border-b">
        {titles.map((title, index) => (
          <button
            key={index}
            className={`py-2 px-4 text-sm font-medium text-center border-b-2 
                                    ${
                                      activeTab === index
                                        ? "border-primary/80 text-primary"
                                        : "border-transparent"
                                    }`}
            onClick={() => handleTabChange(index)}
          >
            {title}
          </button>
        ))}
      </div>
      <div className="flex-1 h-full">{children[activeTab]}</div>
    </div>
  );
};

export default Tabs;
