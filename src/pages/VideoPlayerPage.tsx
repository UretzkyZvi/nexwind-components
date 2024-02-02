import React, { FC, useEffect, useState } from "react";
import MarkdownRenderer from "../components/markdown/MarkdownRenderer";
import Layout from "../components/layout/Layout";
import ListView from "../components/lists/ListView";
import { generateHouseData } from "../util/MockData";
import { listViewComponentSource } from "../components/lists/listViewComponentSource";
import Browser from "../components/browser/browser";
import CodePreview from "@uiw/react-code-preview";
import VideoPlayer from "../components/video-player/video-player";
import { videoPlayerComponentSource } from "../components/video-player/videoPlayerComponentSource";

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
    fetch("/nexwind-components/docs/ui/videoplayer.md")
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
    <VideoPlayer
      src="https://cnn-cnninternational-1-eu.rakuten.wurl.tv/playlist.m3u8"
      title="CNN"
      subtitle="CNN International Europe"
    />
  ));

  return (
    <Layout onThePageNavigationLinks={links}>
      <div className=" flex flex-col gap-6">
        <h1 className="text-4xl font-bold leading-6">Video Player</h1>
        <p className="mt-2 text-lg text-gray-500">
          The Video Player component is used to play videos.
        </p>

        <Browser componentSource={videoPlayerComponentSource}>
          <VideoPlayer src="https://www.youtube.com/watch?v=Xii9_oWQ7HY" />
        </Browser>

        <Browser componentSource={videoPlayerComponentSource}>
          <MemorizeVideoPlayer />
        </Browser>
        <MarkdownRenderer
          markdownText={markdown}
          onLinksFounded={onLinksFounded}
        />
      </div>
    </Layout>
  );
};
export default VideoPlayerPage;
