import clsx from "clsx";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import {
  FC,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import Modal from "../modals/modal";

export interface FileWithStatus {
  file: File;
  status: string;
}
export interface FileUploaderRef {
  uploadFiles: (files: FileWithStatus[]) => Promise<void>;
}

interface UploadOptionsProps {
  maxFiles?: number;
  maxSize?: number;
  mimeTypes?: string[];
  multiUpload?: boolean;
  immediateUpload?: boolean;
  uploadInChunks?: boolean;
  additionalParams?: Record<string, any>;
}

interface FileUploaderProps {
  onComplete: (files: FileWithStatus[]) => void;
  onUpdate: (status: string, progress: number) => void;
  uploadEndpoint: string;
  uploadOptions?: UploadOptionsProps;
}

const CHUNK_SIZE = 1024 * 1024;

interface FileUploadManagerProps {
  onComplete: (files: FileWithStatus[]) => void;
  onUpdate: (status: string, progress: number) => void;
  onCloseManually: () => void;
  uploadEndpoint: string;
  uploadOptions?: UploadOptionsProps;
  openFileSelector: boolean;
}

const FileUploadManager: FC<FileUploadManagerProps> = ({
  onComplete,
  onUpdate,
  onCloseManually,
  uploadEndpoint,
  uploadOptions,
  openFileSelector,
}) => {
  const fileUploaderRef = useRef<FileUploaderRef>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFileUploader, setShowFileUploader] = useState(false);
  const [updateStatus, setUpdateStatus] = useState("");
  const [minimized, setMinimized] = useState(false);
  useEffect(() => {
    setIsModalOpen(openFileSelector);
  }, [openFileSelector]);

  const [options, setOptions] = useState<UploadOptionsProps>({
    maxFiles:
      uploadOptions && uploadOptions.maxFiles ? uploadOptions.maxFiles : 10,
    maxSize:
      uploadOptions && uploadOptions.maxSize
        ? uploadOptions.maxSize
        : 1024 * 1024 * 3, // 3 MB
    mimeTypes:
      uploadOptions && uploadOptions.mimeTypes
        ? uploadOptions.mimeTypes
        : [
            "image/jpeg",
            "image/png",
            "text/csv",
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          ],
    multiUpload:
      uploadOptions && uploadOptions.multiUpload
        ? uploadOptions.multiUpload
        : true,
    immediateUpload:
      uploadOptions && uploadOptions.immediateUpload
        ? uploadOptions.immediateUpload
        : true,
    additionalParams: uploadOptions && uploadOptions.additionalParams,
    uploadInChunks:
      uploadOptions && uploadOptions.uploadInChunks ? true : false,
  });
  const handleFilesSelected = (FilesWithStatus: FileWithStatus[]) => {
    setIsModalOpen(false);
    setShowFileUploader(true);
    fileUploaderRef.current?.uploadFiles(FilesWithStatus);
  };

  const handleUpdate = (status: string, progress: number) => {
    setUpdateStatus(status);
    onUpdate(status, progress);
  };

  return (
    <div>
      {isModalOpen && (
        <Modal
          onClose={() => {
            setIsModalOpen(false);
            onCloseManually();
          }}
          isOpen={isModalOpen}
          title="Upload"
          description={`Max file size ${
            (options.maxSize ?? 0) / 1024 / 1024
          } MB, max files ${options.maxFiles}.  
            Accepted file types: ${options.mimeTypes?.join(", ")}
          `}
        >
          <FileSelection
            onFilesSelected={handleFilesSelected}
            options={{
              maxFiles: options.maxFiles,
              maxSize: options.maxSize,
              mimeTypes: options.mimeTypes,
            }}
          />
        </Modal>
      )}
      <div
        className={clsx(
          "min-h-10 w-60  sm:min-w-72 absolute bottom-0 right-0 sm:right-24 rounded-t-lg border bg-white shadow-md",
          {
            " hidden": !showFileUploader,
          },
          { "": showFileUploader }
        )}
      >
        <div className="flex flex-row items-center justify-between  border-b border-gray-300 bg-gray-100 p-2">
          <span className="text-sm text-gray-600">{updateStatus}</span>
          <div className="flex flex-row gap-2">
            <button
              className={clsx(
                " text-sm text-gray-600",
                "hover:cursor-pointer  hover:bg-primary/60 hover:text-white hover:rounded-full hover:shadow-md",
                "focus:outline-none focus:ring-2 focus:ring-primary/80 focus:ring-offset-2  focus:rounded-full  focus:ring-offset-white"
              )}
              onClick={() => {
                setMinimized(!minimized);
              }}
            >
              {!minimized ? <ChevronDown /> : <ChevronUp />}
            </button>
            <button
              className={clsx(
                " text-sm text-gray-600",
                "hover:cursor-pointer hover:bg-primary/60 hover:text-white hover:rounded-full hover:shadow-md",
                "focus:outline-none focus:ring-2 focus:ring-primary/80 focus:ring-offset-2 focus:rounded-full focus:ring-offset-white"
              )}
              onClick={() => {
                setShowFileUploader(false);
                setIsModalOpen(false);
                onCloseManually();
              }}
            >
              <X />
            </button>
          </div>
        </div>
        <div className={clsx({ " hidden": minimized }, { "": !minimized })}>
          <FileUploader
            ref={fileUploaderRef}
            onComplete={onComplete}
            onUpdate={handleUpdate}
            uploadEndpoint={uploadEndpoint}
            uploadOptions={uploadOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default FileUploadManager;

interface FileSelectionOptions {
  maxFiles?: number;
  maxSize?: number;
  mimeTypes?: string[];
}

interface FileSelectionProps {
  onFilesSelected: (files: FileWithStatus[]) => void;
  options?: FileSelectionOptions;
}

const FileSelection: React.FC<FileSelectionProps> = ({
  onFilesSelected,
  options,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<FileWithStatus[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      processFiles(event.target.files);
    }
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
    if (event.dataTransfer.files) {
      processFiles(event.dataTransfer.files);
    }
  };

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const processFiles = (files: FileList) => {
    const validFiles = Array.from(files).filter(validateFile);
    setSelectedFiles([
      ...selectedFiles,
      ...validFiles.map((file) => ({ file, status: "ready" })),
    ]);

    resetFileInput();
  };

  const validateFile = (file: File): boolean => {
    if (options && options.maxSize && file.size > options.maxSize) {
      alert("File size exceeds the limit");
      return false;
    }
    if (
      options &&
      options.mimeTypes &&
      !options.mimeTypes.includes(file.type)
    ) {
      alert("Invalid file type");
      return false;
    }
    return true;
  };

  const removeSelectedFile = (file: FileWithStatus) => {
    setSelectedFiles((currentFiles) =>
      currentFiles.filter((fileInfo) => fileInfo.file.name !== file.file.name)
    );
  };

  return (
    <div className="flex flex-col">
      <div
        className={clsx(
          `flex  h-48 w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed p-6`,
          { "border-blue-300 bg-blue-100": dragOver },
          { "border-gray-300 bg-gray-100": !dragOver }
        )}
        onClick={handleFileClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="text-center">
          <span>Drag and drop files here or click to select</span>
        </div>
      </div>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        hidden
        ref={fileInputRef}
      />
      {selectedFiles.length > 0 && (
        <div className=" mt-4">
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className=" mb-2 flex items-center justify-between rounded-md border border-gray-300 bg-gray-100 p-2"
            >
              <span className="max-w-xs truncate">{file.file.name}</span>
              <span className=" text-sm text-gray-600">{file.status}</span>
              <span className=" text-sm text-gray-600">
                {(file.file.size / 1024).toFixed(2)} KB
              </span>
              <button
                className=" text-sm text-gray-600"
                onClick={() => removeSelectedFile(file)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
      {selectedFiles.length > 0 && (
        <div className="mt-4 flex flex-row items-center justify-end space-x-2 ">
          <button
            className={clsx(
              "  rounded-lg bg-primary p-2 text-white",
              "hover:cursor-pointer hover:bg-primary/80 hover:shadow-md",
              "focus:outline-none focus:ring-2 focus:ring-primary/80 focus:ring-offset-2 focus:ring-offset-white"
            )}
            onClick={() => onFilesSelected(selectedFiles)}
          >
            Upload {selectedFiles.length} files
          </button>
        </div>
      )}
    </div>
  );
};

// FilePickerToUpload is a component that can be used to select files,
// callback to parent component selected files throw onFilesSelected.
export const FileUploader = forwardRef<FileUploaderRef, FileUploaderProps>(
  (
    { onComplete, onUpdate, uploadEndpoint, uploadOptions }: FileUploaderProps,
    ref
  ) => {
    const [selectedFiles, setSelectedFiles] = useState<FileWithStatus[]>([]);

    const [options, setOptions] = useState<UploadOptionsProps>({
      maxFiles:
        uploadOptions && uploadOptions.maxSize ? uploadOptions.maxSize : 10,
      maxSize:
        uploadOptions && uploadOptions.maxSize
          ? uploadOptions.maxSize
          : 1024 * 1024 * 10, // 10 MB
      mimeTypes:
        uploadOptions && uploadOptions.mimeTypes
          ? uploadOptions.mimeTypes
          : [
              "image/jpeg",
              "image/png",
              "text/csv",
              "application/vnd.ms-excel",
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            ],
      multiUpload:
        uploadOptions && uploadOptions.multiUpload
          ? uploadOptions.multiUpload
          : true,
      immediateUpload:
        uploadOptions && uploadOptions.immediateUpload
          ? uploadOptions.immediateUpload
          : true,
      additionalParams: uploadOptions && uploadOptions.additionalParams,
      uploadInChunks:
        uploadOptions && uploadOptions.uploadInChunks ? true : false,
    });

    useImperativeHandle(ref, () => ({
      uploadFiles,
    }));

    const updateFileStatus = (fileName: string, status: string) => {
      setSelectedFiles((currentFiles) =>
        currentFiles.map((fileInfo) =>
          fileInfo.file.name === fileName ? { ...fileInfo, status } : fileInfo
        )
      );
    };

    const appendAdditionalParams = (formData: FormData, file: File) => {
      formData.append("file", file);
      if (options.additionalParams) {
        Object.entries(options.additionalParams).forEach(([key, value]) => {
          formData.append(key, value);
        });
      }
    };

    const uploadFileInChunks = async (file: File) => {
      let start = 0;
      let uploaded = 0;

      while (start < file.size) {
        const chunk = file.slice(start, start + CHUNK_SIZE);
        // Create a new File object from the chunk
        const chunkFile = new File([chunk], file.name, {
          type: file.type,
          lastModified: file.lastModified,
        });

        const formData = new FormData();
        appendAdditionalParams(formData, chunkFile);

        try {
            // const request = await fetch(uploadEndpoint, {
            //   method: "POST",
            //   body: formData,
            // });

            // if (!request.ok) {
            //   throw new Error(`Chunk upload failed: ${request.statusText}`);
            // }

            // // Update uploaded size and progress
            // uploaded += chunk.size;
            // onUpdate(`Uploading ${file.name}`, (uploaded / file.size) * 100);
          // simulate upload in chunks
         return await new Promise((resolve, reject) => {
            const interval = setInterval(() => {
              // Simulate chunk upload
              uploaded += CHUNK_SIZE;
              const progress = Math.min((uploaded / file.size) * 100, 100);
              onUpdate(`Uploading ${file.name}`, progress);

              // When complete, clear interval and resolve
              if (uploaded >= file.size) {
                clearInterval(interval);
                resolve(file);
              }
            }, 500);
          });
        } catch (error) {
          // Handle the error
        }

        start += CHUNK_SIZE;
      }
    };

    const uploadFile = async (file: File) => {
      const formData = new FormData();
      appendAdditionalParams(formData, file);

      try {
        // const request = await fetch(uploadEndpoint, {
        //   method: "POST",
        //   body: formData,
        // });
        // if (!request.ok) {
        //   throw new Error(`Chunk upload failed: ${request.statusText}`);
        // }
        // simulate upload
        await new Promise((resolve) => setTimeout(resolve, 1000));
        onUpdate(`Uploaded ${file.name}`, 100);
      } catch (error) {
        throw error;
      }
    };

    const uploadFiles = async (FilesWithStatus: FileWithStatus[]) => {
      onUpdate("Uploading...", 0);
      setSelectedFiles(FilesWithStatus);
      for (const fileInfo of FilesWithStatus) {
        const fileName = fileInfo.file.name;
        updateFileStatus(fileName, "uploading");
        try {
          if (options.uploadInChunks) {
            await uploadFileInChunks(fileInfo.file);
          } else {
            await uploadFile(fileInfo.file);
          }
          onUpdate(`Uploaded ${fileInfo.file.name}`, 100);
          updateFileStatus(fileName, "uploaded");
        } catch (error) {
          updateFileStatus(fileName, `error "${error}"`);
          onUpdate(`Error uploading`, 0);
        }
      }
      onUpdate("Upload complete", 100);
      onComplete(selectedFiles);
    };

    return (
      <div className="">
        <div className="mt-4">
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className="  flex items-center justify-between p-2"
            >
              <span className="max-w-xs truncate">{file.file.name}</span>
              <span className=" text-sm text-gray-600">{file.status}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
);
