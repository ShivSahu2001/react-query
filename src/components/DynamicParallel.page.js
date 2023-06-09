

import {useQueries} from "react-query"
import axios from "axios"

const fetchSuperHero = (heroId) => {
    return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}

const DynamicParallelPage = ({heroIds}) => {
        // if you want to hit  multiple dynamic parallel api we use useQueries hook 
   const queryResults = useQueries(
        heroIds.map((id) => {
            return {
                queryKey: ['super-hero', id],
                queryFn: () => fetchSuperHero(id),
            }
        })
    )

    console.log({queryResults})


    return (
        <div>
            Dynamic Parallel Page
        </div>
    )
}

export default DynamicParallelPage
