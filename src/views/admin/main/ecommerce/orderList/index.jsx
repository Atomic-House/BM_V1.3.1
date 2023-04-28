import { columnsDataOrders } from './variables/columnsDataOrders';
import tableDataOrders from 'views/admin/main/ecommerce/orderList/variables/tableDataOrders.json';
import SearchTableOrders from './components/SearchTableOrders';
import Card from 'components/card';

const OrderList = () => {
  return (
    <Card extra={'w-full h-full bg-white mt-3'}>
      <SearchTableOrders
        tableData={tableDataOrders}
        columnsData={columnsDataOrders}
      />
    </Card>
  );
};

export default OrderList;
