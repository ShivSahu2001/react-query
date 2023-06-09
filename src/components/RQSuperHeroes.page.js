import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const RQSuperHeroesPage = () => {
  // useQuery(queryKey, promise)
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "super-heroes",
    fetchSuperHeroes,
    {
        // default cache time is 5min
        //  cacheTime: 5000 

        // stale time is useful when you know your data is not frequenlty changing
        // so we can add stale time of some seconds to reduce no.of network request. 
        // default stale time: 0
        // staleTime: 30000

        // three value are provided true, false, 'always'
        // default is set to true  
        // refetchOnMount: 'always' 

        // on the window if the data is changed in api it will reflect directly in window automatically : true, false, 'always'
        // refetchOnWindowFocus: true

        // polling -> fetching data at regular intervals
        // by default it is set to false
        // refetchInterval: 5000,

        // It will run in background as well if you don't have focus on window
        // By default is set to false
        // refetchIntervalInBackground: true

        // if you don't want to load the data on loading of the page you need to add
        // this enabled: false
        enabled:false
    }
  );

  console.log({ isLoading, isFetching });

  if (isLoading || isFetching) {
    return <h2>Loading....</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2> RQ Super Heroes Page</h2>
      {/* onclick of te button the data from api will be displayed */}
      <button onClick={refetch}>Fetch Heroes</button>
      {data?.data.map((hero) => (
        <div key={hero.id}>{hero.name}</div>
      ))}
    </>
  );
};

export default RQSuperHeroesPage;
