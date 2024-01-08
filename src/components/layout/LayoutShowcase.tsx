import { FC, useState } from "react";
import Header from "../headers/header";
import Navigation from "../headers/navigation";
import HeaderLogo from "../headers/header-logo";
import { PanelLeftClose } from "lucide-react";

interface LayoutShowcaseProps {
  children: React.ReactNode;
}

const LayoutShowcase: FC<LayoutShowcaseProps> = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className={` flex flex-col mx-auto w-full h-full`}>
      {openSidebar && (
        <div
          className="relative z-50 lg:hidden transition-all duration-300 ease-in-out"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-900/80"></div>

          <div className="fixed inset-0 flex">
            <div className="relative mr-16 flex w-full max-w-xs flex-1">
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                <button
                  type="button"
                  className="-m-2.5 p-2.5"
                  onClick={() => setOpenSidebar(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <PanelLeftClose className="h-6 w-6 text-white" />
                </button>
              </div>

              <div className="flex grow flex-col gap-y-5  overflow-y-auto px-6 pb-4 bg-background">
                <HeaderLogo />
                <div>
                  <Navigation />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Header setOpenSidebar={setOpenSidebar} />
      <div className="flex-1 w-full  sm:px-6 lg:px-8 ">
        <main className="flex-1 max-w-7xl mx-auto px-2 sm:py-6 sm:px-6 md:pl-6 xl:pl-6  ">
          {children}
        </main>
      </div>
    </div>
  );
};

export default LayoutShowcase;
