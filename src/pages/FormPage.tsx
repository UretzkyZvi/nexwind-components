import { FC, useEffect, useState } from "react";
import ListView from "../components/lists/ListView";
import Layout from "../components/layout/Layout";
import Browser from "../components/browser/browser";
import { listViewComponentSource } from "../components/lists/listViewComponentSource";
import { generateHouseData } from "../util/MockData";
import Button from "../components/form/Button";
import ContextTooltip from "../components/tooltip/ContextTooltip";
import CodePreview from "@uiw/react-code-preview";
import MarkdownRenderer from "../components/markdown/MarkdownRenderer";
import { BugIcon } from "lucide-react";
import { contextTooltipComponentSource } from "../components/tooltip/contextTooltipComponentSource";
import { buttonComponentSource } from "../components/form/buttonComponentSource";

interface HomePageProps {}
interface Item {
  id: number;
  name: string;
}
const FormPage: FC<HomePageProps> = ({}) => {
  const [markdown, setMarkdown] = useState("");
  const [links, setLinks] = useState<
    {
      id: string;
      text: string;
    }[]
  >([]);
  useEffect(() => {
    fetch("/nexwind-components/docs/ui/form-items.md")
      .then((response) => response.text())
      .then((text) => setMarkdown(text));
  }, []);

  const onLinksFounded = (
    links: {
      id: string;
      text: string;
    }[]
  ) => {
    setLinks(links);
  };
  return (
    <Layout onThePageNavigationLinks={links}>
      <div className="flex flex-col">
        <div>
          <h1 className="text-4xl font-bold leading-6  ">Forms</h1>
          <p className="mt-2 text-lg text-gray-500">
            Forms are used to collect user input. They usually consist of input
            fields, checkboxes, radio buttons, dropdowns, etc.
          </p>
        </div>
        <div className="mt-2">
          <h3 className="font-bold">Simple Button</h3>
          <p className=" text-gray-500 ">
            Buttons are used to trigger an action or event, such as submitting a
            form, opening a dialog, canceling an action, or performing a delete
            operation.
          </p>

          <div className="flex pt-4 w-full">
            <Browser componentSource={buttonComponentSource}>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-4">
                  <Button size="xs">
                    <span>Submit</span>
                  </Button>
                </div>
                <div className="col-span-12 md:col-span-4">
                  <Button size="md">
                    <span>Submit</span>
                  </Button>
                </div>
                <div className="col-span-12 md:col-span-4">
                  <Button size="lg">
                    <span>Submit</span>
                  </Button>
                </div>
                <div className="col-span-12 md:col-span-4">
                  <Button size="xl">
                    <span>Submit</span>
                  </Button>
                </div>
                <div className="col-span-12 md:col-span-4">
                  <Button size="2xl">
                    <span>Submit</span>
                  </Button>
                </div>
                <div className="col-span-12 md:col-span-4">
                  <Button size="3xl">
                    <span>Submit</span>
                  </Button>
                </div>
              </div>
            </Browser>
          </div>
        </div>

        <div className="mt-2">
          <h3 className="font-bold">Button Variants</h3>
          <p className=" text-gray-500 ">
            Buttons are used to trigger an action or event, such as submitting a
            form, opening a dialog, canceling an action, or performing a delete
            operation.
          </p>
          <div className="flex pt-4 w-full ">
            <Browser componentSource={buttonComponentSource}>
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-4">
                  <Button variant="primary">
                    <span>Submit</span>
                  </Button>
                </div>
                <div className="col-span-12 md:col-span-4">
                  <Button variant="primaryDark">
                    <span>Submit</span>
                  </Button>
                </div>

                <div className="col-span-12 md:col-span-4">
                  <Button variant="soft">
                    <span>Submit</span>
                  </Button>
                </div>
                <div className="col-span-12 md:col-span-4">
                  <Button variant="leadingIcon">
                    <span>Submit</span>
                  </Button>
                </div>
                <div className="col-span-12 md:col-span-4">
                  <Button variant="trailingIcon">
                    <span>Submit</span>
                  </Button>
                </div>
                <div className="col-span-12 md:col-span-4">
                  <Button variant="roundedPrimary">
                    <span>Submit</span>
                  </Button>
                </div>
                <div className="col-span-12 md:col-span-4">
                  <Button variant="secondaryRounded">
                    <span>Submit</span>
                  </Button>
                </div>
                <div className="col-span-12 md:col-span-4">
                  <Button variant="circle">
                    <span>Submit</span>
                  </Button>
                </div>
              </div>
            </Browser>
          </div>
        </div>

        <div className="mt-2">
          <h3 className="font-bold">Context tooltip</h3>
          <p className=" text-gray-500 ">
            Context tooltips are used to provide additional information about a
            field or action.
          </p>
          <div className="flex flex-col  gap-4 w-fit ">
            <Browser componentSource={contextTooltipComponentSource}>
              <div className="flex flex-col justify-around md:flex-row items-center md:justify-between gap-4">
                <div className="m-6">
                  <ContextTooltip
                    message="Simple tooltip"
                    expandedContent={<p>More details here...</p>}
                    preferredDirection="bottom"
                  >
                    <button className="p-2 bg-primary text-white rounded">
                      Hover over me bottom tooltip
                    </button>
                  </ContextTooltip>
                </div>
                <div className="m-6">
                  <ContextTooltip
                    message="Simple tooltip"
                    expandedContent={<p>More details here...</p>}
                    preferredDirection="top"
                  >
                    <button className="p-2 bg-primary text-white rounded">
                      Hover over me top tooltip
                    </button>
                  </ContextTooltip>
                </div>

                <ContextTooltip
                  message="Simple tooltip"
                  expandedContent={<p>More details here...</p>}
                  preferredDirection="right"
                >
                  <button className="p-2 bg-primary text-white rounded">
                    Hover over me right tooltip
                  </button>
                </ContextTooltip>
                <ContextTooltip
                  message="Simple tooltip"
                  expandedContent={<p>More details here...</p>}
                  preferredDirection="left"
                >
                  <button className="p-2 bg-primary text-white rounded">
                    Hover over me left tooltip
                  </button>
                </ContextTooltip>
              </div>
            </Browser>
            <div className="pt-2">
              <Browser componentSource={contextTooltipComponentSource}>
                <ContextTooltip
                  message="Click for action"
                  expandedContent={<p>More detailed information here.</p>}
                  preferredDirection="right"
                >
                  <Button
                    variant="primary"
                    size="md"
                    icon={<BugIcon />}
                    onClick={() => console.log("Action performed")}
                  >
                    Hover & Click
                  </Button>
                </ContextTooltip>
              </Browser>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full">
        <MarkdownRenderer
          markdownText={markdown}
          onLinksFounded={onLinksFounded}
        />
      </div>
    </Layout>
  );
};

export default FormPage;
