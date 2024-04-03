import { IRow, StepEnum } from "@/app/page";
import { FC } from "react";
import { FiArrowLeft } from "react-icons/fi";

interface IFinalTableProps {
  data: IRow[];
  onChangeStep: (step: StepEnum) => void;
}
const FinalTable: FC<IFinalTableProps> = ({ data, onChangeStep }) => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-2xl font-bold mb-4">This is your data</h2>
        <div className="w-full flex justify-between">
          <button
            className="bg-blue-500 gap-2 w-fit text-white px-4 py-2 rounded border border-blue-700 hover:bg-blue-700 hover:border-blue-500 flex items-center justify-center cursor-pointer"
            onClick={() => onChangeStep(StepEnum.dataProcessing)}
          >
            <FiArrowLeft className="ml-2" /> Go Back
          </button>
        </div>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Location</th>
            <th className="border p-2">Class of Travel</th>
            <th className="border p-2">Flight Details</th>
            <th className="border p-2">Total Travelers</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td className="border p-2">{row.Location}</td>
              <td className="border p-2">{row["Class of travel"]}</td>
              <td className="border p-2">{row["Flight  Details"]}</td>
              <td className="border p-2">{row["Total Travelers"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FinalTable;
