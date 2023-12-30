import { FC, useState } from "react";
import Header from "../headers/header";
import Navigation from "../headers/navigation";
import HeaderLogo from "../headers/header-logo";
import { PanelLeftOpen, PanelLeftClose } from "lucide-react";
import ThemeToggle from "../toggles/ThemeToggle";
import HiveInteractive from "../interactive/HiveInteractive";

interface LayoutProps {
  children: React.ReactNode;
  onThePageNavigationLinks?: {
    id: string;
    text: string;
  }[];
}

const Layout: FC<LayoutProps> = ({ children, onThePageNavigationLinks }) => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div
      className={`flex min-h-full flex-col bg-background dark:bg-dark-background`}
    >
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
                <div >
                  <Navigation />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Header setOpenSidebar={setOpenSidebar} />
      <div className="mx-auto w-full max-w-7xl grow lg:flex xl:px-2">
        <div className="flex-1  flex">
          <div className="hidden md:block border-r border-gray-200 px-4 py-6 sm:px-6  sm:w-80 xl:w-64 lg:pl-8 xl:shrink-0 xl:border-b-0 xl:pl-6">
            <Navigation />
          </div>
          <div className="px-4 sm:py-6 sm:px-6 md:pl-6 xl:flex-1 xl:pl-6">
            {children}
          </div>
        </div>
        {onThePageNavigationLinks && (
          <div className="hidden xl:block shrink-0 border-t border-gray-200 px-4 py-6 sm:px-6 lg:w-64 lg:border-l lg:border-t-0 lg:pr-8 xl:pr-6">
            <div className=" fixed   ">
              <div className="sticky top-16 pl-2">
                <div className="text-base font-bold border-separate">
                  On This Page
                </div>
                <nav className="flex flex-col space-y-2">
                  <ul className="text-sm space-y-2">
                    {onThePageNavigationLinks.length > 0 &&
                      onThePageNavigationLinks.map((header, index) => (
                        <li key={index} className="hover:text-gray-500 ">
                          <a className="" href={`#${header.id}`} key={index}>
                            {header.text}
                          </a>
                        </li>
                      ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
