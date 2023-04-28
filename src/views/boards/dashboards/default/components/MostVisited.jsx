import { MdOutlineCalendarToday } from "react-icons/md";
import React, { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import Card from "components/card";

function MostVisited(props) {
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
  const color1 = " text-green-500 font-medium";
  const color2 = " text-red-500 font-medium";

  return (
    <Card extra={"h-full w-full pt-3 pb-10 px-8"}>
      <div className="flex items-center justify-between">
        <p className="text-lg font-bold text-navy-700 dark:text-white">
          Most Visited Pages
        </p>
        <button className="mt-1 flex items-center justify-center gap-2 rounded-lg bg-lightPrimary p-2 text-gray-600 transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:hover:opacity-90 dark:active:opacity-80">
          <MdOutlineCalendarToday />
          <p className="text-base font-medium">This month</p>
        </button>
      </div>

      <div className="overflow-x-scroll 2xl:overflow-x-hidden">
        <table {...getTableProps()} className="w-full">
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="px-[14px] pt-[29px]"
                    key={index}
                  >
                    <div className="text-left text-xs font-bold uppercase tracking-wide text-gray-600">
                      {column.render("Header")}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()} className="w-full">
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <tr className="w-full" {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data = "";
                    if (cell.column.Header === "Page Name") {
                      data = (
                        <div className="flex items-center text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value}
                        </div>
                      );
                    } else if (cell.column.Header === "Visitors") {
                      data = (
                        <div className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value}
                        </div>
                      );
                    } else if (cell.column.Header === "Unique Visitors") {
                      data = (
                        <div className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value}
                        </div>
                      );
                    } else if (cell.column.Header === "Clients") {
                      data = (
                        <div className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value}
                        </div>
                      );
                    } else if (cell.column.Header === "Bounce Rate") {
                      data = (
                        <div
                          className={`text-sm font-bold ${
                            cell.value[0] === "-" ? color1 : color2
                          }`}
                        >
                          {cell.value}
                        </div>
                      );
                    }
                    return (
                      <td
                        {...cell.getCellProps()}
                        key={index}
                        className="font-xs px-[14px] pt-[19px] pb-[4px]"
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
    </Card>
  );
}

export default MostVisited;
