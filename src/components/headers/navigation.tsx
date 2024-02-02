import clsx from "clsx";
import { FC } from "react";

const basePath="/nexwind-components"
const navigationItems = [
  {
    name: "Introduction",
    href: `${basePath}/introduction`,
  },
  {
    name: "Contributing",
    href: `${basePath}/contribute`,
  },

 
];

const NavigationComponents = [
  {
    name: "Forms",
    href: `${basePath}/forms`,
  },
  {
    name: "Lists",
    href: `${basePath}/list-view`
  },
  {
    name: "Date Picker",
    href: `${basePath}/date-picker`,
  },
  {
    name: "Table",
    href: `${basePath}/table`,
  },
  {
    name: "File Uploader",
    href: `${basePath}/file-uploader`,
  },
  {
    name: "Cards",
    href: `${basePath}/cards`,
  },
  {
    name: "Video Player",
    href: `${basePath}/video-player`,
  },
  {
    name: "Image Annotation",
    href: `${basePath}/image-annotation`,
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
