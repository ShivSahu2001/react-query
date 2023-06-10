
import { useState } from "react";

import { useAddSuperHeroData, useSuperHeroesData } from "../hooks/useSuperHeroesData";
import {Link} from "react-router-dom"


const RQSuperHeroesPage = () => {

    // const [interval, setInterval] = useState(5000);
    const [name, setName] = useState('');
    const [alterEgo, setAlterEgo] = useState('');

    const onSuccess = (data) => {
        // if (data.data.length >=4 && interval === 3000) {
        //     setInterval(false)
        // }
        console.log("Perform side effects after data fetching like navigating to another page or opening a modal", data)
    }
    const onError = (error) => {
        // setInterval(false)
        console.log("Perform side effects after encountering error", error)
    }

  // useQuery(queryKey, promise, configuration to tweak its behaviour)
  const { isLoading, data, isError, error, isFetching, refetch } = useSuperHeroesData(onSuccess, onError)
  

    const {mutate: AddHero, isLoading: heroLoading, isError: heroError, error: hError} = useAddSuperHeroData()

  // console.log({ isLoading, isFetching });

  const handleAddHeroClick = () => {
    console.log({name, alterEgo})
    const hero = {name, alterEgo}
    AddHero(hero)
  }


  if (heroLoading) {
    return <h2>Hero Loading....</h2>
  }
  if (heroError) {
    return <h2>{hError.message}</h2>
  }

  if (isLoading || isFetching) {
    return <h2>Loading....</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2> RQ Super Heroes Page</h2>
      <div>
        <input type="text" 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
         />
        <input type="text" 
        value={alterEgo}
        onChange={(e) => setAlterEgo(e.target.value)}
        placeholder="alterEgo"
         />
         <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>
      {/* onclick of the button the data from api will be displayed */}
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
