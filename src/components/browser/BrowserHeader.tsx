import useClipboard from "../../hooks/useClipboard";
import CopyToClipboardButton from "./CopyToClipboardButton";
import DeviceSizeControls from "./DeviceSizeControls";


interface BrowserHeaderProps {
  setMobileSize: () => void;
  setTabletSize: () => void;
  setDesktopSize: () => void;
  saved: boolean;
  copyToClipboard: () => void;
}

const BrowserHeader: React.FC<BrowserHeaderProps> = ({
  setMobileSize,
  setTabletSize,
  setDesktopSize,
  saved,
  copyToClipboard,
}) => {

  return (
    <div className="relative top-0 w-full h-10 bg-black rounded-t-md border border-black">
      <div className="flex flex-grow items-center h-full pl-2 pr-2 justify-between ">
        <div className="flex space-x-2">
          <div className="flex items-center justify-center w-4 h-4 bg-red-500 rounded-full"></div>
          <div className="flex items-center justify-center w-4 h-4 bg-yellow-500 rounded-full"></div>
          <div className="flex items-center justify-center w-4 h-4 bg-green-500 rounded-full"></div>
        </div>
        <div className="flex flex-row items-center space-x-2">
          <DeviceSizeControls
            setMobileSize={setMobileSize}
            setTabletSize={setTabletSize}
            setDesktopSize={setDesktopSize}
          />
          <CopyToClipboardButton
            saved={saved}
            copyToClipboard={copyToClipboard}
          />
        </div>
      </div>
    </div>
  );
};

export default BrowserHeader;