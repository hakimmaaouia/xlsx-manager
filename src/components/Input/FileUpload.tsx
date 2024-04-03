import React, { FC, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload } from "react-icons/fi";

interface FileUploadProps {
  onDrop: (acceptedFiles: File[]) => void;
}

const FileUpload: FC<FileUploadProps> = ({ onDrop }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <div
      className="relative flex flex-col text-gray-400 border border-gray-200 border-dashed rounded w-full items-center justify-center  cursor-pointer py-16"
      {...getRootProps()}
    >
      <input
        className="absolute inset-0 z-50 w-full h-full p-0 m-0 outline-none opacity-0 cursor-pointer"
        {...getInputProps()}
      />
      <FiUpload className="mr-2" />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag drop the file here, or click to select file</p>
      )}
    </div>
  );
};

export default FileUpload;
