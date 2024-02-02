import React, { useState, useEffect } from "react";
import ReactMarkdown, { Components } from "react-markdown";
import gfm from "remark-gfm";
import "github-markdown-css";
import "../../styles/markdown.css";
import MarkdownPreview from "@uiw/react-markdown-preview";

interface MarkdownProps {
  markdownText: string;
  onLinksFounded?: (links: { id: string; text: string }[]) => void;
}

interface Header {
  level: number;
  text: string;
  id: string;
}

const MarkdownRenderer: React.FC<MarkdownProps> = ({
  markdownText,
  onLinksFounded,
}) => {
  const [headers, setHeaders] = useState<Header[]>([]);

  const generateId = (text: string) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  useEffect(() => {
    const extractHeaders = (text: string): Header[] => {
      const headerRegex = /^(#+)\s+(.*)/;
      let extractedHeaders: Header[] = [];

      text.split("\n").forEach((line) => {
        const match = line.match(headerRegex);
        if (match) {
          const level = match[1].length;
          const text = match[2];
          const id = generateId(text);
          extractedHeaders.push({ level, text, id });
        }
      });

      return extractedHeaders;
    };

    setHeaders(extractHeaders(markdownText));
  }, [markdownText]);

  useEffect(() => {
    if (onLinksFounded) {
      onLinksFounded(
        headers.map((header) => ({ id: header.id, text: header.text }))
      );
    }
  }, [headers]);

  const renderHeader = (level: number, props: React.PropsWithChildren<{}>) => {
    if (!props.children) {
      return null;
    }

    const text =
      typeof props.children === "string"
        ? props.children
        : Array.isArray(props.children)
        ? props.children.join("")
        : "";

    const id = generateId(text);
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;

    return (
      <Tag id={id} {...props}>
        {props.children}
      </Tag>
    );
  };

  const customComponents: Components = {
    h1: (props) => renderHeader(1, props),
    h2: (props) => renderHeader(2, props),
    h3: (props) => renderHeader(3, props),
    h4: (props) => renderHeader(4, props),
    h5: (props) => renderHeader(5, props),
    h6: (props) => renderHeader(6, props),
  };

  return (
    <div className=" ">
      <MarkdownPreview
        source={markdownText}
        components={customComponents}
        remarkPlugins={[gfm]}
        className="grid z-10 sm:px-6 lg:px-8"
       
      />
    </div>
  );
};

export default MarkdownRenderer;
