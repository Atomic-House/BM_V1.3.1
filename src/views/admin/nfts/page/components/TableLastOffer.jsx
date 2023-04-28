import { useMemo } from "react";
// React Table
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

import { FaEthereum } from "react-icons/fa";
import Card from "components/card";

const TableLastOffer = (props) => {
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
    <Card extra="mt-7 w-full px-[30px] py-[30px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold text-navy-700 dark:text-white">
          Latest Offers
        </p>
        <button className="dark:active-bg-white-20 linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10">
          See all
        </button>
      </div>
      {/* table section */}
      <div className="mt-1 overflow-y-hidden overflow-x-scroll xl:overflow-x-hidden">
        <table
          {...getTableProps()}
          className="mt-3 w-full"
          variant="simple"
          color="gray-500"
        >
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    className="pr-20"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={index}
                    borderColor="transparent"
                  >
                    <div className="pb-[10px] text-sm uppercase tracking-wide text-gray-600">
                      {column.render("Header")}
                    </div>
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
                    if (cell.column.Header === "Price") {
                      data = (
                        <div className="flex items-center gap-2">
                          <div className="text-black text-base font-bold !text-navy-700 dark:!text-white">
                            <FaEthereum />
                          </div>
                          <div className="text-base font-bold text-navy-700 hover:cursor-pointer dark:text-white">
                            {cell.value} ETH
                          </div>
                        </div>
                      );
                    } else if (cell.column.Header === "USD Price") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value}{" "}
                        </p>
                      );
                    } else if (cell.column.Header === "Expiration") {
                      data = (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          {cell.value}
                        </p>
                      );
                    } else if (cell.column.Header === "From") {
                      data = (
                        <p className="text-sm font-bold text-[#3965FF] dark:text-white">
                          {cell.value}{" "}
                        </p>
                      );
                    }
                    return (
                      <td
                        className="py-2.5 text-sm"
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

      {/* table section */}
    </Card>
  );
};

export default TableLastOffer;
