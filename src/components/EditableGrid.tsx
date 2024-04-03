import { ColDef, NewValueParams } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { location } from "../data/location";
import { travel_class } from "../data/travel_class";
import { Dispatch, FC, SetStateAction } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import {
  isValidData,
  isValidFlightDetails,
  isValidLocations,
  isValidTotalTravelers,
  isValidTravelClass,
} from "@/utile/processData";
import { IRow, StepEnum } from "@/app/page";
interface IEditableGridProps {
  data: IRow[];
  onChange: Dispatch<SetStateAction<IRow[]>>;
  onChangeStep: (step: StepEnum) => void;
}

const errorStyle = "!border !border-[#ff8383] rounded-md";

const EditableGrid: FC<IEditableGridProps> = ({
  data,
  onChange,
  onChangeStep,
}) => {
  const changeCellValue = (event: NewValueParams) => {
    const updatedData = data.map((row, index) => {
      if (index === event.node?.rowIndex) {
        return event.data;
      }
      return row;
    });
    onChange(updatedData);
  };
  const colDefs: ColDef[] = [
    {
      field: "Location",
      editable: true,
      cellEditor: "agSelectCellEditor",
      flex: 1,
      cellClass: (e) => {
        return isValidLocations(e.value) ? "" : errorStyle;
      },
      onCellValueChanged(event) {
        changeCellValue(event);
      },
      cellEditorParams: {
        values: location,
      },
    },
    {
      field: "Class of travel",
      editable: true,
      cellEditor: "agSelectCellEditor",
      flex: 1,
      onCellValueChanged(event) {
        changeCellValue(event);
      },
      cellClass: (e) => {
        return isValidTravelClass(e.value) ? "" : errorStyle;
      },
      cellEditorParams: {
        values: travel_class,
      },
    },
    {
      field: "Flight  Details",
      editable: true,
      flex: 1,
      cellClass: (e) => {
        return isValidFlightDetails(e.value) ? "" : errorStyle;
      },
    },
    {
      field: "Total Travelers",
      editable: true,
      flex: 1,
      onCellValueChanged(event) {
        changeCellValue(event);
      },
      cellEditor: "agNumberCellEditor",
      cellClass: (e) => {
        return isValidTotalTravelers(e.value) ? "" : errorStyle;
      },
    },
  ];

  return (
    <div
      className=" flex flex-col gap-4 "
      style={{ height: 800, width: "100%" }}
    >
      <div>
        <h2 className="text-2xl font-bold mb-4">Edit this Table</h2>
        <div className="w-full flex justify-between">
          <button
            className="bg-blue-500 w-fit gap-2 text-white px-4 py-2 rounded border border-blue-700 hover:bg-blue-700 hover:border-blue-500 flex items-center justify-center cursor-pointer"
            onClick={() => onChangeStep(StepEnum.upload)}
          >
            <FiArrowLeft className="ml-2" /> Go Back
          </button>
          <button
            className="bg-blue-500 w-fit gap-2 text-white px-4 py-2 rounded border border-blue-700 hover:bg-blue-700 hover:border-blue-500 flex items-center justify-center cursor-pointer"
            onClick={() => isValidData(data) && onChangeStep(StepEnum.output)}
          >
            Validate <FiArrowRight className="ml-2" />
          </button>
        </div>
      </div>
      <AgGridReact
        rowData={data}
        className="w-full ag-theme-alpine"
        columnDefs={colDefs}
      />
    </div>
  );
};

export default EditableGrid;
