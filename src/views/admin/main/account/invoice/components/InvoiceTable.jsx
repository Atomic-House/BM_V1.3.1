import React, { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

const InvoiceTable = (props) => {
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    tableInstance;

  return (
    <div className="w-full overflow-x-scroll dark:!bg-navy-800 2xl:overflow-x-hidden">
      <table {...getTableProps()} className="w-full overflow-x-scroll">
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="border-b-2 px-[40px] pb-[10px] pl-6 text-start text-xs uppercase tracking-wide text-gray-600 dark:border-white/10 lg:text-sm"
                  key={index}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell, index) => {
                  let data = "";
                  if (cell.column.Header === "Item") {
                    data = (
                      <p className="min-w-[120px] text-lg font-medium text-navy-700 dark:text-white md:min-w-[150px]">
                        {cell.value}
                      </p>
                    );
                  } else if (cell.column.Header === "Quantity") {
                    data = (
                      <p className="text-sm text-navy-700 dark:text-white lg:text-base">
                        {cell.value}
                      </p>
                    );
                  } else if (cell.column.Header === "Rate") {
                    data = (
                      <p className="text-sm font-medium text-navy-700 dark:text-white lg:text-base">
                        {cell.value}
                      </p>
                    );
                  } else if (cell.column.Header === "Amount") {
                    data = (
                      <p className="text-sm font-medium text-navy-700 dark:text-white lg:text-base">
                        {cell.value}
                      </p>
                    );
                  }
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="mt-[20px] border-b-2 px-[100px] py-[32px] pl-7 text-sm dark:border-white/10"
                      key={index}
                    >
                      {data}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTable;
