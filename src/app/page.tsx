"use client";
import { useFetchJson } from "./useFetchJson";
// React Grid Logic
import React, { useMemo, useState } from "react";
import Image from "next/image";

// Theme
import {
  ClientSideRowModelModule,
  ColDef,
  IRichCellEditorParams,
  ModuleRegistry,
  RowSelectionOptions,
  TextEditorModule,
  ValidationModule,
  ValueFormatterParams,
  AllCommunityModule,
} from "ag-grid-community";

// Core CSS
import type { CustomCellRendererProps } from "ag-grid-react";
import { AgGridReact } from "ag-grid-react";
import {
  RichSelectModule,
  AdvancedFilterModule,
  ColumnMenuModule,
  ContextMenuModule,
} from "ag-grid-enterprise";
import { colors } from "./colors";
import ColourCellRenderer from "./ColourCellRenderer";

ModuleRegistry.registerModules([
  TextEditorModule,
  ClientSideRowModelModule,
  RichSelectModule,
  AllCommunityModule,
  ValidationModule,
  AdvancedFilterModule,
  ColumnMenuModule,
  ContextMenuModule,
]);

// Custom Cell Renderer (Display logos based on cell value)
const CompanyLogoRenderer = (params: CustomCellRendererProps) => (
  <span
    style={{
      display: "flex",
      height: "100%",
      width: "100%",
      alignItems: "center",
    }}
  >
    {params.value && (
      <Image
        alt={`${params.value} Flag`}
        src={`https://www.ag-grid.com/example-assets/space-company-logos/${params.value.toLowerCase()}.png`}
        width={50}
        height={50}
        style={{
          display: "block",
          width: "25px",
          height: "auto",
          maxHeight: "50%",
          marginRight: "12px",
          filter: "brightness(1.1)",
        }}
      />
    )}
    <p
      style={{
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
    >
      {params.value}
    </p>
  </span>
);

/* Custom Cell Renderer (Display tick / cross in 'Successful' column) */
const MissionResultRenderer = (params: CustomCellRendererProps) => (
  <span
    style={{
      display: "flex",
      justifyContent: "center",
      height: "100%",
      alignItems: "center",
    }}
  >
    {
      <Image
        alt={`${params.value}`}
        src={`https://www.ag-grid.com/example-assets/icons/${
          params.value ? "tick-in-circle" : "cross-in-circle"
        }.png`}
        width={16}
        height={16}
      />
    }
  </span>
);

/* Format Date Cells */
const dateFormatter = (params: ValueFormatterParams): string => {
  return new Date(params.value).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Row Data Interface
interface IRow {
  mission: string;
  company: string;
  location: string;
  date: string;
  time: string;
  rocket: string;
  price: number;
  successful: boolean;
}

const rowSelection: RowSelectionOptions = {
  mode: "multiRow",
  headerCheckbox: false,
};

// Create new GridExample component
const App = () => {
  // Row Data: The data to be displayed.
  const { data, loading } = useFetchJson<IRow>(
    "https://www.ag-grid.com/example-assets/space-mission-data.json"
  );

  // Column Definitions: Defines & controls grid columns.
  const [colDefs] = useState<ColDef[]>([
    {
      field: "mission",
      width: 150,
    },
    {
      field: "company",
      width: 130,
      cellRenderer: CompanyLogoRenderer,
    },
    {
      field: "location",
      width: 225,
    },
    {
      field: "date",
      valueFormatter: dateFormatter,
    },
    {
      field: "price",
      width: 130,
      valueFormatter: (params: ValueFormatterParams) => {
        return "£" + params.value.toLocaleString();
      },
    },
    {
      field: "successful",
      width: 120,
      cellRenderer: MissionResultRenderer,
    },
    { field: "rocket" },
    {
      headerName: "Rich Select Editor",
      field: "color",
      cellRenderer: ColourCellRenderer,
      cellEditor: "agRichSelectCellEditor",
      cellEditorParams: {
        values: colors,
        cellRenderer: ColourCellRenderer,
        valueListMaxHeight: 220,
      } as IRichCellEditorParams,
    },
  ]);

  // Apply settings across all columns
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      filter: true,
      editable: true,
      resizable: true,
      sortable: true,
      flex: 1,
    };
  }, []);

  // Container: Defines the grid's theme & dimensions.
  return (
    <div style={{ width: "100%", height: "100dvh", overflow: "visible" }}>
      <AgGridReact
        rowData={data}
        loading={loading}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        rowSelection={rowSelection}
        onSelectionChanged={() => console.log("Row Selected!")}
        stopEditingWhenCellsLoseFocus={true}
      />
    </div>
  );
};

export default App;
