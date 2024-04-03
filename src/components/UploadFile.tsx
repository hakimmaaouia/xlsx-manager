import { FC } from "react";
import FileUpload from "./Input/FileUpload";

interface IUploadFile {
  onDrop: (acceptedFiles: File[]) => void;
}
const UploadFile: FC<IUploadFile> = ({ onDrop }) => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-2xl font-bold mb-4">Upload File</h2>
      </div>
      <FileUpload onDrop={onDrop} />
    </div>
  );
};

export default UploadFile;
