import {
  ClipboardCheck,
  ClipboardList,
  Monitor,
  Smartphone,
  Tablet,
} from "lucide-react";
import { FC, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import Modal from "../modals/modal";
import Tabs from "../tab/tab";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import BrowserHeader from "./BrowserHeader";
import CodeTab from "./CodeTab";
import ResponsiveModal from "./ResponsiveModal";
import useClipboard from "../../hooks/useClipboard";
import useResponsiveWidth from "../../hooks/useResponsiveWidth";

interface BrowserProps {
  children?: React.ReactNode;
  componentSource: string;
}

const Browser: FC<BrowserProps> = ({ children, componentSource }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const { saved, copyToClipboard } = useClipboard();

  useEffect(() => {
    Prism.highlightAll();
  }, [tabIndex]);

  return (
    <div className={`relative grow rounded-lg border-2 border-black`}>
      <BrowserHeader
        saved={saved}
        copyToClipboard={() => copyToClipboard(componentSource)}
      />

      <div className="flex flex-col m-auto my-6 flex-grow">
        <Tabs titles={["Preview", "Code"]} onTabChange={setTabIndex}>
          {/* Preview Tab */}

          <div className="mx-auto max-w-7xl p-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">{children}</div>
          </div>

          {/* Code Tab */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
    
              <CodeTab componentSource={componentSource} />
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};
export default Browser;
