import Card from "components/card";
import React, { useMemo } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

const UserReportsTable = (props) => {
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
    nextPage,
    previousPage,

    initialState,
    setPageSize,
    state,
  } = tableInstance;
  initialState.pageSize = 6;

  const { pageSize } = state;

  return (
    <Card extra={"w-full px-3 overflow-x-scroll 2xl:overflow-x-hidden"}>
      <table {...getTableProps()} className="w-full">
        <thead className="w-full">
          {headerGroups.map((headerGroup, index) => (
            <tr
              className="items-center border-b border-gray-200 dark:!border-white/10"
              {...headerGroup.getHeaderGroupProps()}
              key={index}
            >
              {headerGroup.headers.map((column, index) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="px-[27px] pt-[32px] pb-[12px] text-xs tracking-wide text-gray-600"
                  key={index}
                >
                  <div className="text-xs font-bold">
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
              <tr
                className="border-b border-gray-200 dark:!border-white/10"
                {...row.getRowProps()}
                key={index}
              >
                {row.cells.map((cell, index) => {
                  let data = "";
                  if (cell.column.Header === "USER NAME") {
                    data = (
                      <div className="flex w-full items-center gap-[14px]">
                        <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-blue-300">
                          <img
                            className="h-full w-full rounded-full"
                            src={cell.value[1]}
                            alt=""
                          />
                        </div>
                        <p className="font-medium text-navy-700 dark:text-white">
                          {" "}
                          {cell.value[0]}
                        </p>
                      </div>
                    );
                  } else if (cell.column.Header === "EMAIL") {
                    data = (
                      <div className="w-full text-base font-medium text-navy-700 dark:text-white">
                        {cell.value}
                      </div>
                    );
                  } else if (cell.column.Header === "USERNAME") {
                    data = (
                      <div className="w-full text-base font-medium text-navy-700 dark:text-white">
                        {cell.value}
                      </div>
                    );
                  } else if (cell.column.Header === "JOIN DATE") {
                    data = (
                      <div className="w-full text-base font-medium text-navy-700 dark:text-white">
                        {cell.value}
                      </div>
                    );
                  }
                  return (
                    <td
                      {...cell.getCellProps()}
                      key={index}
                      className="mt-[20px] px-4 py-[16px]"
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
      {/* pagination */}
      <div className="mt-2 flex h-20 w-full items-center justify-between px-6">
        {/* left side */}
        <div className="flex items-center gap-3">
          <p className="> Show rows per page text-sm text-gray-700">
            Show rows per page{" "}
          </p>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="rounded-[20px] border border-gray-200 px-3 py-2 text-gray-700 dark:!border-white/10 dark:!bg-navy-800"
            name=""
            id=""
          >
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
        {/* right side */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => previousPage()}
            className={`linear flex items-center justify-center rounded-full bg-brand-500 p-2 text-lg text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200`}
          >
            <MdChevronLeft />
          </button>

          <button
            onClick={() => nextPage()}
            className={`linear flex items-center justify-center rounded-full bg-brand-500 p-2 text-lg text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200`}
          >
            <MdChevronRight />
          </button>
        </div>
      </div>
    </Card>
  );
};

export default UserReportsTable;
