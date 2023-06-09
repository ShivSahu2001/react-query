


import { useState } from "react";

import { useSuperHeroesData } from "../hooks/useSuperHeroesData";



const MySuperHeroesPage = () => {

    const [IsQueryEnabled, setIsQueryEnabled] = useState(true);

    const onSuccess = (data) => {
        // if (data.data.length >=4 && interval === 3000) {
        //     setInterval(false)
        // }
        // console.log("Perform side effects after data fetching like navigating to another page or opening a modal", data)
        if (data) {
            setIsQueryEnabled(false)
        }
    }
    const onError = (error) => {
        // setInterval(false)
        // console.log("Perform side effects after encountering error", error)
        
    }
    // const enabled = (enable) => {
    //     enable = false
    //     // setInterval(false)
    //     // console.log("Perform side effects after encountering error", error)
    // }

  // useQuery(queryKey, promise, configuration to tweak its behaviour)
  const { isLoading, data, isError, error, isFetching, refetch } = useSuperHeroesData(onSuccess, onError, IsQueryEnabled)
  

  console.log({ isLoading, isFetching });

  if (isLoading || isFetching) {
    return <h2>Loading....</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2> MY Super Heroes Page</h2>
      {/* onclick of the button the data from api will be displayed */}
      <button onClick={refetch}>Fetch Heroes</button>
      {data?.data.map((hero) => (
        <div key={hero.id}>{hero.name}</div>
      ))}

      {/* {
        data.map(heroName => <div key={heroName.id}>{heroName.name}</div>)
      } */}
    </>


  );
};

export default MySuperHeroesPage;
