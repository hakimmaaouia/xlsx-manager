"use client";
import EditableGrid from "@/components/EditableGrid";
import FinalTable from "@/components/FinalTable";
import UploadFile from "@/components/UploadFile";
import { ReactElement, useCallback, useState } from "react";
import * as XLSX from "xlsx";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export enum StepEnum {
  upload,
  dataProcessing,
  output,
}
export interface IRow {
  Location: string;
  "Class of travel": string;
  "Flight  Details": string;
  "Total Travelers": number;
}

export default function Home() {
  const [step, setStep] = useState<StepEnum>(StepEnum.upload);
  const [rowData, setRowData] = useState<IRow[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const excelData = XLSX.utils.sheet_to_json<IRow>(worksheet);
        setRowData(excelData);
      };
      reader.readAsArrayBuffer(file);
    });
    setStep(StepEnum.dataProcessing);
  }, []);
  const onChangeStep = (step: StepEnum) => {
    setStep(step);
  };

  const steps: Record<StepEnum, ReactElement> = {
    [StepEnum.upload]: <UploadFile onDrop={onDrop} />,
    [StepEnum.dataProcessing]: (
      <EditableGrid
        onChange={setRowData}
        data={rowData}
        onChangeStep={onChangeStep}
      />
    ),
    [StepEnum.output]: (
      <FinalTable data={rowData} onChangeStep={onChangeStep} />
    ),
  };

  return <main className="flex min-h-screen flex-col p-16">{steps[step]}</main>;
}
