import { FC } from "react";
import ThemeToggle from "../toggles/ThemeToggle";
import {
  Github,
  GlassesIcon,
  LucideGithub,
  PanelLeftOpen,
  Search,
} from "lucide-react";
import clsx from "clsx";
import HeaderLogo from "./header-logo";

interface HeaderProps {
  setOpenSidebar(openSidebar: boolean): void;
}

const Header: FC<HeaderProps> = ({ setOpenSidebar }) => {
  return (
    <div>
      <header className=" shrink-0 border-b z-30 sticky top-0 bg-secondary/10 backdrop-blur-md ">
        <div className="mx-auto max-w-7xl flex h-16  items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex-1 flex items-center gap-2">
            <HeaderLogo />
            <div className="hidden sm:flex flex-row sm:pl-10">
              <nav>
                <ul className="flex space-x-4 text-sm">
                  <li>
                    <a
                      href="/nexwind-components/introduction"
                      className="font-medium text-primary hover:text-primary/70"
                    >
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a
                      href="/nexwind-components/showcase"
                      className="font-medium text-primary hover:text-primary/70"
                    >
                      Showcases
                    </a>
                  </li>
                  <li>
                    <a
                      href="/nexwind-components/contact"
                      className="font-medium text-primary hover:text-primary/70"
                    >
                      About Me
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <nav className="hidden sm:flex space-x-4">
            <a
              href="https://github.com/UretzkyZvi/nexwind-components"
              target="_blank"
              className="rounded-full w-6 h-6 bg-primary/70 group  hover:bg-primary/30 items-center flex"
            >
              <LucideGithub className="w-4 h-4 text-white mx-auto group-hover:text-black" />
            </a>
          </nav>
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
    </div>
  );
};
export default Header;
