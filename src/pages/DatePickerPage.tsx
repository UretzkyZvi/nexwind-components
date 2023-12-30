import { FC, useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import Browser from "../components/interactive/browser";
import DatePicker from "../components/datepicker/DatePicker";
import { datePickerComponentSource } from "../components/datepicker/DatePickerComponentSource";
import MarkdownRenderer from "../components/markdown/MarkdownRenderer";

interface DatePickerPageProps {}

const DatePickerPage: FC<DatePickerPageProps> = ({}) => {
  const [markdown, setMarkdown] = useState("");
  const [links, setLinks] = useState<
    {
      id: string;
      text: string;
    }[]
  >([]);
  useEffect(() => {
    fetch("/docs/ui/datepicker.md")
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
    
        <h1 className="text-4xl font-bold leading-6 text-primary pt-6">
          DatePicker Component Usage Guide
        </h1>
        <p className="scroll-m-20 mt-2 text-lg text-gray-500">
          Date pickers let users select a date or range of dates. They're ideal
          for selecting a date of birth, entering a date for a calendar
          appointment, or picking the arrival date for a hotel booking.
        </p>
      

      <Browser componentSource={datePickerComponentSource}>
        <div>
          <DatePicker onChange={console.log} />
        </div>
      </Browser>
      <MarkdownRenderer
        markdownText={markdown}
        onLinksFounded={(links) => onLinksFounded(links)}
      />
    </Layout>
  );
};

export default DatePickerPage;
