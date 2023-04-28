import React, { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
// Assets
import CardMenu from "components/card/CardMenu";
import { MdEdit } from "react-icons/md";
import Card from "components/card";

const ManagementTable = (props) => {
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
    <Card extra={"w-full px-9 py-3 h-full"}>
      <div className="mt-2 flex w-full items-center justify-between px-1">
        <h4 className="font-dm text-xl font-bold text-navy-700 dark:text-white">
          Team Management
        </h4>
        <CardMenu />
      </div>
      {/* tables */}
      <div className="mt-[25px] overflow-x-scroll 2xl:overflow-x-hidden">
        <table {...getTableProps()} className="w-full font-dm text-navy-700">
          <thead className="w-full">
            {headerGroups.map((headerGroup, index) => (
              <tr
                className="items-center border-b border-gray-200 text-base dark:border-white/10"
                {...headerGroup.getHeaderGroupProps()}
                key={index}
              >
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className=" pb-[15px] pl-[5px] text-start text-sm font-bold uppercase tracking-wide text-gray-600"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()} className="w-full">
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={index} className="items-center">
                  {row.cells.map((cell, index) => {
                    let data = "";
                    if (cell.column.Header === "Name") {
                      data = (
                        <div className="flex items-center gap-2 pr-16 sm:min-w-[120px] md:min-w-[200px] lg:w-full lg:pr-0">
                          <img
                            className="h-9 w-9 rounded-xl"
                            src={cell.value[2]}
                            alt=""
                          />
                          <div className="flex w-full flex-col">
                            <p className="text-sm font-bold text-navy-700 dark:text-white">
                              {cell.value[0]}
                            </p>
                            <p className="text-sm font-medium text-gray-600">
                              {cell.value[1]}
                            </p>
                          </div>
                        </div>
                      );
                    } else if (cell.column.Header === "Date") {
                      data = (
                        <div className="w-full text-sm font-bold dark:text-white sm:min-w-[120px] md:min-w-[150px] lg:min-w-[unset]">
                          {cell.value}
                        </div>
                      );
                    } else if (cell.column.Header === "Permissions") {
                      data = (
                        <div className="w-full text-sm font-bold dark:text-white sm:min-w-[120px] md:min-w-[150px] lg:min-w-[unset]">
                          {cell.value}
                        </div>
                      );
                    } else if (cell.column.Header === "Status") {
                      data = (
                        <div className="sm:min-w-[120px] md:min-w-[150px] lg:min-w-[unset]">
                          <div
                            className={`flex w-[95px] items-center justify-center rounded-[10px] py-1.5 text-sm font-bold uppercase ${
                              cell.value.toLowerCase() === "rejected"
                                ? "bg-red-100 text-red-500 dark:bg-red-50"
                                : "bg-green-100 text-green-500 dark:bg-green-50"
                            }`}
                          >
                            {cell.value}
                          </div>
                        </div>
                      );
                    } else if (cell.column.Header === "Price") {
                      data = (
                        <div className="w-full text-sm font-bold dark:text-white sm:min-w-[100px] lg:min-w-[unset]">
                          {cell.value}
                        </div>
                      );
                    } else if (cell.column.Header === "") {
                      data = (
                        <button className="max-h-fit w-full max-w-max cursor-pointer text-xl text-gray-600">
                          <MdEdit />
                        </button>
                      );
                    }
                    return (
                      <td
                        className="mt-[20px] py-[14px] pl-2 lg:pr-2"
                        {...cell.getCellProps()}
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
    </Card>
  );
};

export default ManagementTable;
