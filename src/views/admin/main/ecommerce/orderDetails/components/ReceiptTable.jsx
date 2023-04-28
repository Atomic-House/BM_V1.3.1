import React, { useMemo } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
const ReceiptTable = (props) => {
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
    <div className="h-full w-full overflow-x-scroll py-[45px] dark:!bg-navy-800  md:px-9 lg:overflow-x-hidden">
      <table {...getTableProps()} className="w-full text-gray-600">
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr className="" {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <th
                  className="border-b border-gray-200 px-4 text-start dark:!border-white/10"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={index}
                >
                  <div className="pb-[11px] text-xs font-bold uppercase text-gray-600">
                    {column.render("Header")}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody className="" {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <tr className="" {...row.getRowProps()} key={index}>
                {row.cells.map((cell, index) => {
                  let data = "";
                  if (cell.column.Header === "Item") {
                    data = (
                      <div className="">
                        <p className="text-base font-bold text-navy-700 dark:text-white xl:leading-3">
                          {cell.value[0]}
                        </p>
                        <p className="font-base mt-[2px] text-gray-600">
                          {" "}
                          {cell.value[1]}
                        </p>
                      </div>
                    );
                  } else if (cell.column.Header === "Quantity") {
                    data = (
                      <div className="text-base font-bold text-navy-700 dark:text-white">
                        {cell.value}
                      </div>
                    );
                  } else if (cell.column.Header === "Rate") {
                    data = (
                      <div className="text-base font-bold text-navy-700 dark:text-white">
                        {cell.value}
                      </div>
                    );
                  } else if (cell.column.Header === "Amount") {
                    data = (
                      <div className="text-base font-bold text-navy-700 dark:text-white">
                        ${cell.value}
                      </div>
                    );
                  }
                  return (
                    <td
                      {...cell.getCellProps()}
                      key={index}
                      className="font-sm mt-[20px] border-b border-gray-200 px-[23px] py-[25px] dark:!border-white/10"
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

export default ReceiptTable;
