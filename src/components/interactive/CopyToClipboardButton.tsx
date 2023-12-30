import { ClipboardCheck, ClipboardList } from "lucide-react";

interface CopyToClipboardButtonProps {
  saved: boolean;
  copyToClipboard: () => void;
}

const CopyToClipboardButton: React.FC<CopyToClipboardButtonProps> = ({
  saved,
  copyToClipboard
}) => {
  return (
    <div>
      {saved ? (
        <button className="flex items-center justify-center w-6 h-6 rounded-full">
          <ClipboardCheck className="h-4 w-4 text-green-500" />
        </button>
      ) : (
        <button
          onClick={copyToClipboard}
          className="flex items-center justify-center w-6 hover:h-6 group hover:bg-gray-300 hover:rounded-full hover:cursor-pointer"
        >
          <ClipboardList className="h-4 w-4 text-white group-hover:text-gray-800" />
        </button>
      )}
    </div>
  );
};

export default CopyToClipboardButton;
