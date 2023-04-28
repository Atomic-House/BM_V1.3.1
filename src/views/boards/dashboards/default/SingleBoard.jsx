import React from 'react';
import { getUser } from 'hooks/hooks';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import TaskCard from 'views/admin/dashboards/rtl/components/TaskCard';
import { getBoard } from 'hooks/hooks';
const SingleBoard = () => {
  let { boardId } = useParams();
  const navigate = useNavigate();

  console.log(boardId, "param")
  const userQuery = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });

  const boardQuery = useQuery({
    queryKey: ['board', boardId],
    queryFn: () => getBoard(boardId),
  });

  const listQuery = boardQuery.data?.flatMap((item) =>
    item.lS.map((subitem) => subitem)
  );

  if (userQuery.status && boardQuery.status === 'loading') {
    return <h1>Loading...</h1>;
  }

  if (userQuery.status === 'error') {
    return navigate('/auth/sign-in/default');
  }

  if (userQuery.status && boardQuery.status === 'error') {
    return <h1>{JSON.stringify(userQuery.error)}</h1>;
  }

  return (
    <div className="mt-3 flex h-full w-full flex-col gap-[20px] rounded-[20px] xl:flex-row">
      <div className="h-full w-full rounded-[20px]">
        {/* left side */}
        <div className="col-span-9 h-full w-full rounded-t-2xl xl:col-span-6">
          {/* overall & Balance */}
          <div className="mb-5 grid grid-cols-6 gap-5">
            <div className="col-span-6 h-full w-full rounded-xl 3xl:col-span-4">
              <div className="my-5 grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-3 lg:grid-cols-3">
                {console.log(boardQuery.data, "singleboard")}
                {listQuery?.map((item, index) => {
                //   console.log(item.cS)
                  return (
                    <TaskCard
                      user={userQuery?.data}
                      key={item?.$id}
                      cards={item?.cS}
                      title={item?.title}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* line */}
      <div className="flex w-0 bg-gray-200 dark:bg-navy-700 xl:w-px" />
    </div>
  );
};

export default SingleBoard;
