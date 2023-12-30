import { Smartphone, Tablet, Monitor } from "lucide-react";

interface DeviceSizeControlsProps {
  setMobileSize: () => void;
  setTabletSize: () => void;
  setDesktopSize: () => void;
}

const DeviceSizeControls: React.FC<DeviceSizeControlsProps> = ({
  setMobileSize,
  setTabletSize,
  setDesktopSize,
}) => {
  return (
    <div className="flex text-white">
      <button
        onClick={setMobileSize}
        className="flex items-center justify-center w-6 hover:h-6 group hover:bg-gray-300 hover:rounded-full"
      >
        <Smartphone className="w-4 h-4 group-hover:text-gray-800" />
      </button>
      <button
        onClick={setTabletSize}
        className="flex items-center justify-center w-6 hover:h-6 group hover:bg-gray-300 hover:rounded-full"
      >
        <Tablet className="w-4 h-4 group-hover:text-gray-800" />
      </button>
      <button
        onClick={setDesktopSize}
        className="flex items-center justify-center w-6 hover:h-6 group hover:bg-gray-300 hover:rounded-full"
      >
        <Monitor className="w-4 h-4 group-hover:text-gray-800" />
      </button>
    </div>
  );
};

export default DeviceSizeControls;
