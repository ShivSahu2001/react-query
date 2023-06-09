import {useQuery} from "react-query"
import axios from "axios"

const fetchSuperHeroes = () => {
    return axios.get("http://localhost:4000/superheroes")
}
const fetchFriends = () => {
    return axios.get("http://localhost:4000/friends")
}
const ParallelQueriesPage = () => {

    const {data : superheroes, isLoading: isLoadSuperHero, isError: isErrorSuperHero, error: errorSuperHero} = useQuery('super-heroes', fetchSuperHeroes)
   const {data: friends, isLoading: isLoadFriend, isError: isErrorFriend, error: errorFriend} = useQuery('friends', fetchFriends)


   if (isLoadFriend || isLoadSuperHero) {
        return <h2>Loading ....</h2>
   }
   if (isErrorFriend || isErrorSuperHero) {
        return <h2>{errorFriend.messages}</h2>
   }

    return (
        <div>
          <h2>ParallelQueries Page</h2>  
          {
            superheroes?.data.map((hero) => (
                <div key={hero.id}>{hero.name}</div>
            ))
          }
          {
            friends?.data.map((friend) => (
                <div key={friend.id}>{friend.name}</div>
            ))
          }
        </div>
    )
}

export default ParallelQueriesPage
