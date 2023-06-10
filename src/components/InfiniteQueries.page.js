import { useInfiniteQuery } from "react-query";
import axios from "axios";
import { Fragment } from "react";

// pageParam  === PageNumber
const fetchColors = ({ pageParam = 1 }) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
};

const InfiniteQueriesPage = () => {
  const { isLoading, data, isError, error, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery(["colors"], fetchColors, {
      getNextPageParam: (_lastPage, pages) => {
        if (pages.length < 4) {
          return pages.length + 1;
        } else {
          return undefined;
        }
      },
    });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <div>
        <h2>Infinite Queries Page</h2>
        {data?.pages.map((group, i) => ( 
            <Fragment key={i}>
                {
                    group.data.map(color => (
                        <h2 key={color.id}>{color.id} - {color.label}</h2>
                    ))
                }
            </Fragment>
        ))}
      </div>
      <div>
        <button disabled={!hasNextPage} onClick={fetchNextPage}>
          Load More..
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </>
  );
};

export default InfiniteQueriesPage;
