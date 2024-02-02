import { FC, useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import Browser from "../components/browser/browser";
import { listViewComponentSource } from "../components/lists/listViewComponentSource";
import ImageAnnotationComponent from "../components/image-annotation/ImageAnnotationComponent";
import { faker } from "@faker-js/faker";
import { imageAnnotationComponentSource } from "../components/image-annotation/imageAnnotationComponentSource";
import MarkdownRenderer from "../components/markdown/MarkdownRenderer";
const ImageAnnotationPage: FC = () => {
  const [markdown, setMarkdown] = useState("");
  const [links, setLinks] = useState<
    {
      id: string;
      text: string;
    }[]
  >([]);
  useEffect(() => {
    fetch("/nexwind-components/docs/ui/image-annotation.md")
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
      <div className="flex flex-col gap-6">
        <h1 className="text-4xl font-bold   text-primary pt-2">
          Image Annotation (Classification and Segmentation) v.0.0.1
        </h1>
        <p className="pt-2">
          Image Annotation is the process of manually defining regions in an
          image and creating a textual description of those regions. It is a
          crucial task in computer vision and machine learning.
        </p>
        <Browser componentSource={imageAnnotationComponentSource}>
          <ImageAnnotationComponent
            key={"ImageAnnotationComponent"}
            imageUrls={[
              {
                url: faker.image.urlPicsumPhotos({ height: 480, width: 480 }),
                id: "1",
              },
              {
                url: faker.image.urlPicsumPhotos({ height: 480, width: 480 }),
                id: "2",
              },
              {
                url: faker.image.urlPicsumPhotos({ height: 480, width: 480 }),
                id: "3",
              },
            ]}
            mode="classification"
          />
        </Browser>
        <Browser componentSource={listViewComponentSource}>
          <ImageAnnotationComponent
            key={"ImageAnnotationComponent"}
            imageUrls={[
              {
                url: faker.image.urlPicsumPhotos({ height: 128, width: 128 }),
                id: "1",
              },
              {
                url: faker.image.urlPicsumPhotos({ height: 128, width: 128 }),
                id: "2",
              },
              {
                url: faker.image.urlPicsumPhotos({ height: 128, width: 128 }),
                id: "3",
              },
            ]}
            mode="segmentation"
          />
        </Browser>
        <MarkdownRenderer
          markdownText={markdown}
          onLinksFounded={onLinksFounded}
        />
      </div>
    </Layout>
  );
};

export default ImageAnnotationPage;
