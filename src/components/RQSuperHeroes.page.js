
// import { useState } from "react";

import { useSuperHeroesData } from "../hooks/useSuperHeroesData";
import {Link} from "react-router-dom"


const RQSuperHeroesPage = () => {

    // const [interval, setInterval] = useState(5000);

    const onSuccess = (data) => {
        // if (data.data.length >=4 && interval === 3000) {
        //     setInterval(false)
        // }
        // console.log("Perform side effects after data fetching like navigating to another page or opening a modal", data)
    }
    const onError = (error) => {
        // setInterval(false)
        // console.log("Perform side effects after encountering error", error)
    }

  // useQuery(queryKey, promise, configuration to tweak its behaviour)
  const { isLoading, data, isError, error, isFetching, refetch } = useSuperHeroesData(onSuccess, onError)
  

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
        <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
        </div>
      ))}

      {/* {
        data.map(heroName => <div key={heroName.id}>{heroName.name}</div>)
      } */}
    </>


  );
};

export default RQSuperHeroesPage;
