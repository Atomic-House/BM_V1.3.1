import React, { useMemo } from "react";
import { FiSearch } from "react-icons/fi";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

function SearchTableOrders(props) {
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

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,

    prepareRow,

    setGlobalFilter,
    state,
  } = tableInstance;

  const { pageIndex, pageSize } = state;

  return (
    <div className="h-full w-full">
      {/* Search */}
      <div
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="flex w-3/4 items-center rounded-[10px] bg-white p-[8px] pt-[18px] shadow-2xl shadow-white dark:!bg-navy-800 dark:shadow-none md:ml-3 md:w-[400px]"
      >
        <div className="flex h-9 w-[400px] flex-grow items-center rounded-[10px] bg-lightPrimary text-sm text-gray-600 dark:!bg-navy-900">
          <FiSearch className="mx-2 h-4 w-4 !text-gray-700 dark:!text-white" />
          <input
            type="text"
            placeholder="Search...."
            className="block h-full w-full rounded-full bg-lightPrimary text-sm text-navy-700 outline-none dark:!bg-navy-900 dark:text-white"
          />
        </div>
      </div>
      {/* table */}
      <div className="mt-11 h-full w-full overflow-x-scroll xl:overflow-hidden">
        <table {...getTableProps()} className="w-full">
          <thead className="w-full">
            {headerGroups.map((headerGroup, index) => (
              <tr
                className=" items-center border-b border-gray-200 dark:!border-white/10"
                {...headerGroup.getHeaderGroupProps()}
                key={index}
              >
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className=" px-4 pb-[10px] text-xs text-gray-600 text-start"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="w-full" {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <tr
                  className="border-b border-gray-200 dark:!border-white/10"
                  {...row.getRowProps()}
                  key={index}
                >
                  {row.cells.map((cell, index) => {
                    let data = "";
                    if (cell.column.Header === "PRODUCT NAME") {
                      data = (
                        <div className="font-medium text-navy-700 dark:text-white">
                          {cell.value}
                        </div>
                      );
                    } else if (cell.column.Header === "EMAIL") {
                      data = (
                        <div className="font-medium text-navy-700 dark:text-white">
                          {cell.value}
                        </div>
                      );
                    } else if (cell.column.Header === "DATE") {
                      data = (
                        <div className="font-medium text-navy-700 dark:text-white">
                          {cell.value}
                        </div>
                      );
                    } else if (cell.column.Header === "STATUS ORDER") {
                      data = (
                        <div
                          className={`flex h-7 w-[110px] items-center justify-center text-sm ${
                            cell.value === "Completed"
                              ? "bg-green-100 dark:bg-green-50"
                              : "bg-red-100 dark:bg-red-50"
                          } rounded-[10px] text-base font-bold `}
                        >
                          <div
                            className={`${
                              cell.value === "Completed"
                                ? "text-green-500 "
                                : "text-red-500"
                            } uppercase `}
                          >
                            {cell.value}
                          </div>
                        </div>
                      );
                    } else if (cell.column.Header === "TOTAL PRICE") {
                      data = (
                        <div className="font-medium text-navy-700 dark:text-white">
                          {cell.value}
                        </div>
                      );
                    } else if (cell.column.Header === "ORDER ACTIONS") {
                      data = (
                        <div
                          className="text-sm font-medium text-brand-500 underline hover:cursor-pointer dark:text-white"
                          id={cell.value}
                        >
                          Edit order
                        </div>
                      );
                    }
                    return (
                      <td
                        className=" mt-[20px] px-4 py-[16px]"
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
      {/* pagination */}
      <div className="mt-2 flex h-20 w-full items-center justify-between px-6">
        <div className="text-sm text-gray-700">
          Showing {pageSize * pageIndex + 1} to{" "}
          {pageSize * (pageIndex + 1) <= tableData.length
            ? pageSize * (pageIndex + 1)
            : tableData.length}{" "}
          of {tableData.length} entries
        </div>

        <div>
          <button className="h-10 w-10 rounded-full bg-brand-500 text-lg text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
            1
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchTableOrders;
