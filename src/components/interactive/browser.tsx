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

const heights = {
  small: "h-auto",
  medium: "h-[40dvh]",
  big: "h-[66dvh]",
};

interface BrowserProps {
  children?: React.ReactNode;
  componentSource: string;
  height?: keyof typeof heights;
}

const Browser: FC<BrowserProps> = ({
  children,
  componentSource,
  height = "big",
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const handleResizeRef = useRef<HTMLDivElement>(null);
  const { width, setMobileSize, setTabletSize } = useResponsiveWidth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const setDesktopSize = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe && iframe.contentDocument) {
      const document = iframe.contentDocument;
      const body = document.body;
      body.innerHTML = "";

      // Fetch and inject Tailwind CSS into iframe
      fetch("/dist/output.css") // Update this path
        .then((response) => response.text())
        .then((css) => {
          const styleSheet = document.createElement("style");
          styleSheet.textContent = css;
          document.head.appendChild(styleSheet);
        });

      const container = document.createElement("div");
      const root = createRoot(container);
      root.render(<>{children}</>);
      body.appendChild(container);
    }
  }, [children, width, isModalOpen, tabIndex]);

  useEffect(() => {
    Prism.highlightAll();
  }, [tabIndex]);
  const { saved, copyToClipboard } = useClipboard();
  return (
    <div
      className={`relative  grow  rounded-lg border-2 border-black `}
      ref={handleResizeRef}
    >
      {/* Header with controls */}
      <BrowserHeader
        setMobileSize={setMobileSize}
        setTabletSize={setTabletSize}
        setDesktopSize={setDesktopSize}
        saved={saved}
        copyToClipboard={() => copyToClipboard(componentSource)}
      />

      {/* Main content area */}
      <div className={`${heights[height]} flex m-auto my-6 flex-1`}>
        <div className="flex m-4 flex-1">
          <Tabs titles={["Preview", "Code"]} onTabChange={setTabIndex}>
            {/* Preview Tab */}
            <div className={`${heights[height]} flex m-auto my-6 flex-1`}>
              <div className="flex m-4 flex-1 " style={{ width  }}>
                <iframe ref={iframeRef} className="w-full h-[calc(100%-50px)]" />
              </div>
            </div>

            {/* Code Tab */}
            <CodeTab componentSource={componentSource} width={width} />
          </Tabs>
        </div>
      </div>
      <ResponsiveModal isOpen={isModalOpen} onClose={closeModal}>
        <BrowserHeader
          setMobileSize={setMobileSize}
          setTabletSize={setTabletSize}
          setDesktopSize={setDesktopSize}
          saved={saved}
          copyToClipboard={() => copyToClipboard(componentSource)}
        />
        <div className={`h-[48dvh] flex  my-2 `}>
          <div className="flex m-4 w-full">
            <Tabs
              titles={["Preview", "Code"]}
              onTabChange={(i) => setTabIndex(i)}
            >
              {/* Preview Tab */}
              <div className="flex m-4 flex-1 h-full" style={{ width }}>
                <iframe ref={iframeRef} className="w-full h-full" />
              </div>
              {/* Code Tab */}
              <CodeTab componentSource={componentSource} width={width} />
            </Tabs>
          </div>
        </div>
      </ResponsiveModal>
    </div>
  );
};
export default Browser;
