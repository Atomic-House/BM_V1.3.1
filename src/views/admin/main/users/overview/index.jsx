import SearchTableUsers from './components/SearchTableUsersOverview';
import tableDataUsersOverview from './variables/tableDataUsersOverview.json';
import { columnsDataUsersOverview } from './variables/columnsDataUsersOverview';
import Card from 'components/card';

const UserOverview = () => {
  return (
    <Card extra={'w-full h-full mt-3'}>
      <SearchTableUsers
        tableData={tableDataUsersOverview}
        columnsData={columnsDataUsersOverview}
      />
    </Card>
  );
};

export default UserOverview;
