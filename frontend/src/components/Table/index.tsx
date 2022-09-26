import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  TableRow,
  Typography,
  Button,
  TablePagination,
  Avatar,
} from "@mui/material";
import React from "react";
import { HOSTNAME } from "../../api";

export type Row = Record<string, any>;
type Column = { key: string; name: string };

export interface ITableProps {
  columnNames: Column[];
  rows: Row[];
  onRowClick?: (i: number) => void;
  footerButtonText?: string;
  footerButtonOnClick?: () => void;
  showImage?: boolean;
  imageKey?: string;
  currentPage: number;
  totalCount: number;
  handlePageChange: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number
  ) => void;
}

const ColumnHeader = (props: { children: string }) => (
  <Typography
    variant="h6"
    component="h6"
    sx={{
      fontWeight: 600,
      color: "inherit",
    }}
  >
    {props.children}
  </Typography>
);

export default function TableList(props: ITableProps) {
  const {
    columnNames,
    rows,
    onRowClick,
    footerButtonText,
    footerButtonOnClick,
    handlePageChange,
    currentPage,
    totalCount,
    imageKey,
    showImage,
  } = props;

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {columnNames.map((column) => (
                <TableCell key={`col-${column.key}`}>
                  <ColumnHeader>{column.name}</ColumnHeader>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row, index) => {
                return (
                  <TableRow
                    key={index}
                    style={{ cursor: "pointer" }}
                    onClick={() => onRowClick && onRowClick(index)}
                  >
                    <TableCell key={`row-0${columnNames[0].key}`}>
                      {showImage && imageKey && (
                        <Avatar
                          src={`${HOSTNAME}${row[imageKey]}`}
                          style={{ float: "left" }}
                        />
                      )}
                      <div style={{ marginTop: 9, marginLeft: 45 }}>
                        {row[columnNames[0].key]}
                      </div>
                    </TableCell>
                    {columnNames.slice(1).map((column) => (
                      <TableCell key={`row-${index}${column.key}`}>
                        {row[column.key]}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={columnNames.length}>
                  Nothing to view right now, please add some data by clicking
                  the button below
                </TableCell>
              </TableRow>
            )}
            {footerButtonText && footerButtonOnClick && (
              <TableRow key="footer">
                <TableCell colSpan={columnNames.length} align="right">
                  <Button
                    key="add-store-button"
                    variant="contained"
                    onClick={footerButtonOnClick}
                  >
                    {footerButtonText}
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={totalCount}
        rowsPerPage={10}
        rowsPerPageOptions={[]}
        page={currentPage}
        onPageChange={handlePageChange}
      />
    </React.Fragment>
  );
}
