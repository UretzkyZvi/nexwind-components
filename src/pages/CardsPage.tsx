import { FC, useState } from "react";
import Layout from "../components/layout/Layout";
import Browser from "../components/browser/browser";
import { listViewComponentSource } from "../components/lists/listViewComponentSource";
import { CardWithImageBody, CardWithImageHeader, DefaultCard } from "../components/card/cards";
import CodePreview from "@uiw/react-code-preview";

interface HomePageProps {}

const CardsPage: FC<HomePageProps> = ({}) => {
  return (
    <Layout>
      <Browser componentSource={listViewComponentSource}>
        <CodePreview
          noCode={true}
          noScroll={true}
          code={` 
   import ReactDOM from 'react-dom/client';
  
   ReactDOM.createRoot(_mount_).render(
    <DefaultCard />
   );`}
          dependencies={{ DefaultCard }}
        />
      </Browser>
      <Browser componentSource={listViewComponentSource}>
        <CodePreview
          noCode={true}
          noScroll={true}
          code={` 
   import ReactDOM from 'react-dom/client';
  
   ReactDOM.createRoot(_mount_).render(
    <CardWithImageHeader />
   );`}
          dependencies={{ CardWithImageHeader }}
        />
      </Browser>
      <Browser componentSource={listViewComponentSource}>
        <CodePreview
          noCode={true}
          noScroll={true}
          code={`
    import ReactDOM from 'react-dom/client';
 
    ReactDOM.createRoot(_mount_).render(
      <CardWithImageBody />
    );`}
          dependencies={{ CardWithImageBody }}
        />
      </Browser>
    </Layout>
  );
};

export default CardsPage;
