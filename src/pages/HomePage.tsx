import { FC, useState } from "react";
import ListView from "../components/lists/ListView";
import Layout from "../components/layout/Layout";
import Browser from "../components/browser/browser";
import { listViewComponentSource } from "../components/lists/listViewComponentSource";
import { generateHouseData } from "../util/MockData";
import FileUploadManager, { FileWithStatus } from "../components/file-upload/FileUploadManager";
import Button from "../components/form/Button";

interface HomePageProps {}
interface Item {
  id: number;
  name: string;
}
const HomePage: FC<HomePageProps> = ({}) => {
  const [isUpload, setIsUploadOpen] = useState(false);
  return (
    <Layout>
      <Browser componentSource={listViewComponentSource}>
        < >
        <Button onClick={() => setIsUploadOpen(true)}>Upload </Button>
        <FileUploadManager   
         onComplete={(data) => {
            console.log("onComplete", data);
          }}
          onUpdate={(data) => {
            console.log("onUpdate", data);
          }}
          uploadEndpoint={`/api/upload`}
          uploadOptions={{
            mimeTypes: ["text/csv"],
            maxSize: 1024 * 1024 * 3, // 3 MB
            maxFiles: 2,
          }}
          openFileSelector={isUpload}
          onCloseManually={() => setIsUploadOpen(false)}     />

          <ListView
            items={generateHouseData(100)}
            headers={[
              {
                key: "image",
                
                label: "Image",
                render: (value) => <img className="w-28 h-20" src={value} />,
              },
              {
                key: "rooms",
                label: "Rooms",
                render: (value) => <span className="font-bold">{value}</span>,
              },
              {
                key: "description",
                label: "description",

                render: (value) => (
                  <p className=" text-pretty truncate  w-56">{value}</p>
                ),
              },
            ]}
          />
        </>
      </Browser>
    </Layout>
  );
};

export default HomePage;
