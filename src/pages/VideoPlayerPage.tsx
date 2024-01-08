import React, { FC, useEffect, useState } from "react";
import MarkdownRenderer from "../components/markdown/MarkdownRenderer";
import Layout from "../components/layout/Layout";
import ListView from "../components/lists/ListView";
import { generateHouseData } from "../util/MockData";
import { listViewComponentSource } from "../components/lists/listViewComponentSource";
import Browser from "../components/browser/browser";
import CodePreview from "@uiw/react-code-preview";
import VideoPlayer from "../components/video-player/video-player";

interface ListViewPageProps {}

const VideoPlayerPage: FC<ListViewPageProps> = () => {
  const [markdown, setMarkdown] = useState("");
  const [links, setLinks] = useState<
    {
      id: string;
      text: string;
    }[]
  >([]);
  useEffect(() => {
    fetch("/nexwind-components/docs/ui/list-view.md")
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

  const MemorizeVideoPlayer = React.memo(() => (
    <VideoPlayer src="https://kan11w.media.kan.org.il/hls/live/2105694/2105694/master.m3u8"/>
    
  ));

  return (
    <Layout onThePageNavigationLinks={links}>
      <h1>Video Player Page</h1>
      <Browser componentSource={listViewComponentSource}>
        {/* <CodePreview
        theme="dark"
        className="w-2/4"
          code={`import ReactDOM from 'react-dom/client';
   ReactDOM.createRoot(_mount_).render(
 <MemorizeVideoPlayer />
   );`}
          dependencies={{ MemorizeVideoPlayer }}
        />
      </Browser> */}
        <VideoPlayer src="https://www.youtube.com/watch?v=Xii9_oWQ7HY"/>
        </Browser>
      <MarkdownRenderer
        markdownText={markdown}
        onLinksFounded={onLinksFounded}
      />
    </Layout>
  );
};
export default VideoPlayerPage;
