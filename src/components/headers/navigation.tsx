import clsx from "clsx";
import { FC } from "react";

const navigationItems = [
  {
    name: "Introduction",
    href: "/introduction",
  },
  {
    name: "Contributing",
    href: "/contribute",
  },

  {
    name: "Resources",
    href: "#",
  },
  {
    name: "Support",
    href: "#",
  },
];

const NavigationComponents = [
  {
    name: "Forms",
    href: "/forms",
  },
  {
    name: "Lists",
    href: "/list-view",
  },
  {
    name: "Date Picker",
    href: "/date-picker",
  },
  {
    name: "Table",
    href: "/table",
  },
  {
    name: "File Uploader",
    href: "/file-uploader",
  },
];

const Navigation: FC = () => {
  return (
    <nav className="fixed flex flex-1 flex-col">
      <ul role="list" className="flex flex-1 flex-col gap-y-7">
        <li>
          <div className="text-lg font-bold leading-6 text-black dark:text-white">
            Get started
          </div>
          <ul role="list" className="-mx-2 mt-2 space-y-1">
            {navigationItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={clsx(
                    "group flex pl-4  rounded-md py-1 text-sm leading-6 font-medium text-gray-500",
                    "text-black   hover:underline",
                    " dark:text-dark-text hover:dark:bg-background hover:dark:text-text"
                  )}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </li>
        <li>
          <div className="text-lg font-bold leading-6 text-black dark:text-white">
            Components
          </div>
          <ul role="list" className="-mx-2 mt-2 space-y-1">
            {NavigationComponents.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className={clsx(
                    "group flex pl-4 rounded-md py-1 text-sm leading-6 font-medium text-gray-500",
                    "hover:text-black hover:underline",
                    " dark:text-dark-text hover:dark:bg-background hover:dark:text-text"
                  )}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
