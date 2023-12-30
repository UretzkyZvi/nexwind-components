import { FC } from "react";
import ThemeToggle from "../toggles/ThemeToggle";
import { GlassesIcon, PanelLeftOpen, Search } from "lucide-react";
import clsx from "clsx";
import HeaderLogo from "./header-logo";

interface HeaderProps {
  setOpenSidebar(openSidebar: boolean): void;
}

const Header: FC<HeaderProps> = ({ setOpenSidebar }) => {
  return (
    <>
      <header className="shrink-0 border-b z-30 sticky top-0 bg-secondary/10   backdrop-blur-md ">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex-1 flex items-center gap-2">
            <HeaderLogo />
            <div className="hidden sm:flex flex-row sm:pl-10">
              <nav>
                <ul className="flex space-x-4   ">
                  <li>
                    <a
                      href="#"
                      className="font-medium text-primary hover:text-primary/70"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="showcase/movie-browse"
                      className="font-medium text-primary hover:text-primary/70"
                    >
                      Showcase
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="font-medium text-primary hover:text-primary/70"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <button
            type="button"
            className="-m-2.5 p-2.5 text-primary lg:hidden"
            onClick={() => setOpenSidebar(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <PanelLeftOpen className="h-6 w-6" />
          </button>
        </div>
      </header>
    </>
  );
};
export default Header;
