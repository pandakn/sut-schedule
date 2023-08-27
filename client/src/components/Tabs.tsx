import { useState } from "react";

type TabsProps = {
  components: React.ReactNode[];
};

const Tabs = ({ components }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber: number) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="container p-5 mx-auto my-5">
      <div className="flex items-center gap-1 mb-4">
        <button
          className={`${
            activeTab === 1
              ? "bg-gray-900 text-white"
              : "text-gray-900 hover:bg-gray-100"
          } px-4 py-2 rounded-lg`}
          onClick={() => handleTabClick(1)}
        >
          Table
        </button>
        <button
          className={`${
            activeTab === 2
              ? "bg-gray-900 text-white"
              : "text-gray-900 hover:bg-gray-100"
          } px-4 py-2 rounded-lg `}
          onClick={() => handleTabClick(2)}
        >
          Card
        </button>
      </div>
      {components.map((component, idx) => {
        return (
          <div key={idx} className="rounded-lg">
            {activeTab === idx + 1 && <>{component}</>}
          </div>
        );
      })}
    </div>
  );
};

export default Tabs;
