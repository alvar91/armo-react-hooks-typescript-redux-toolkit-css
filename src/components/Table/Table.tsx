import { useState, memo } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { GridColDef } from "@mui/x-data-grid/models/colDef";
import { GridCellParams, GridRowParams } from "@mui/x-data-grid/models/params";

import { UserI } from "../../models/UserI";

import { SelectedRowI } from "../../models/SelectedRowI";

interface TablePropsI {
  setSelectedRow: (params: SelectedRowI) => void;
  users: UserI[];
  error: boolean;
  isLoading: boolean;
}

const Table = ({ setSelectedRow, users, error, isLoading }: TablePropsI) => {
  const [pageSize, setPageSize] = useState<number>(10);

  const selectRowHandler = (row: SelectedRowI | GridRowParams<any>) => {
    if(row) setSelectedRow(row as SelectedRowI);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 120 },
    {
      field: "access",
      headerName: "Доступ",
      width: 80,
      renderCell: (params: GridCellParams) => {
        if (params.value === true) return <span>✅</span>;
        else return <span>❌</span>;
      },
    },
    {
      field: "lastName",
      headerName: "Фамилия",
      width: 120,
    },
    {
      field: "name",
      headerName: "Имя",
      width: 120,
    },
    {
      field: "email",
      headerName: "Email",
      width: 160,
    },
    {
      field: "birthDate",
      headerName: "Дата рождения",
      width: 120,
    },
  ];

  return (
    <Box sx={{ mb: 2, height: 631 }}>
      <DataGrid
        rows={users}
        error={false}
        loading={isLoading}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
        rowsPerPageOptions={[10, 20, 50]}
        onRowClick={(row) => selectRowHandler(row)}
      />
    </Box>
  );
};

export default memo(Table);
