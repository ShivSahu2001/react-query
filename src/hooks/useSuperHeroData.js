import {useQuery} from "react-query"
import axios from "axios"

const fetchSuperHero = ({queryKey}) => {
    // ['super-hero', heroId] this is th queryKey we are refering 
    const heroId = queryKey[1]
    return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}

export const useSuperHeroData = (heroId) => {
    // return useQuery(['super-hero', heroId], () => fetchSuperHero(heroId))
    return useQuery(['super-hero', heroId],  fetchSuperHero)
}