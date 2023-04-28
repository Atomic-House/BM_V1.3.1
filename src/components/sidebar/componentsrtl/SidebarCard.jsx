import LineChart from "components/charts/LineChart";
import { lineChartDataSidebar } from "variables/charts";
import { lineChartOptionsSidebar } from "variables/charts";
import avatar4 from "assets/img/avatars/avatar4.png";
const FreeCard = () => {
  return (
    <div className="relative flex h-[300px] w-[240px] flex-col items-center rounded-[20px] bg-gradient-to-br from-brandLinear to-blueSecondary">
      <div className="mt-8 flex flex-col items-center">
        <h4 className="text-2xl font-bold text-white">$3942.58</h4>
        <p className="mt-[4px] text-xs font-medium text-white">Total balance</p>
        <div className="mt-3 flex items-center justify-center rounded-[20px] bg-[#C9FBD5] py-1 px-2">
          <p className="text-xs font-bold text-green-500">+2.45%</p>
        </div>
      </div>

      {/* Sidebar Card */}
      <div className="h-full w-full px-3 pb-3">
        <LineChart
          chartData={lineChartDataSidebar}
          chartOptions={lineChartOptionsSidebar}
        />
      </div>
      {/* Sidebar profile info */}
      <div className="ms-2 my-14 flex items-center justify-center gap-3">
        <div className="h-12 w-12 rounded-full bg-blue-200">
          <img src={avatar4} className="rounded-full" alt="avatar" />
        </div>
        <div className="ms-1">
          <h4 className="text-base font-bold text-navy-700 dark:text-white">
            Adela Parkson
          </h4>
          <p className="text-sm font-medium text-gray-600">Product Designer</p>
        </div>
      </div>
    </div>
  );
};

export default FreeCard;
