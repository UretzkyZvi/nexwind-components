import { FC, useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import Browser from "../components/browser/browser";
import FileUploadManager from "../components/file-upload/FileUploadManager";
import Button from "../components/form/Button";
import { FileUploadManagerComponentSource } from "../components/file-upload/FileUploadManagerComponentSource";
import MarkdownRenderer from "../components/markdown/MarkdownRenderer";

interface FileUploadPageProps {}

const FileUploadPage: FC<FileUploadPageProps> = ({}) => {
  const [isUpload, setIsUploadOpen] = useState(false);
  const [markdown, setMarkdown] = useState("");
  const [links, setLinks] = useState<
    {
      id: string;
      text: string;
    }[]
  >([]);
  useEffect(() => {
    fetch("/nexwind-components/docs/ui/file-upload-manager.md")
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
      <Browser componentSource={FileUploadManagerComponentSource} height="big">
        <>
          <Button onClick={() => setIsUploadOpen(true)}>Upload</Button>
          <FileUploadManager
            onComplete={(data) => {
              console.log("onComplete", data);
            }}
            onUpdate={(data) => {
              console.log("onUpdate", data);
            }}
            uploadEndpoint={`/api/upload`}
            uploadOptions={{
              mimeTypes: ["text/csv", "image/png", "image/jpeg"],
              maxSize: 1024 * 1024 * 3, // 3 MB
              maxFiles: 2,
            }}
            openFileSelector={isUpload}
            onCloseManually={() => setIsUploadOpen(false)}
          />
        </>
      </Browser>
      <MarkdownRenderer
        markdownText={markdown}
        onLinksFounded={(links) => onLinksFounded(links)}
      />
    </Layout>
  );
};

export default FileUploadPage;
