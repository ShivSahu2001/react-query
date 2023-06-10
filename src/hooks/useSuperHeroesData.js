import { useQuery, useMutation, useQueryClient } from "react-query";
import { request } from "../utils/axios-utils";
// import axios from "axios";



const fetchSuperHeroes = () => {
    // return axios.get("http://localhost:4000/superheroes");
    return request({url: "/superheroes"})
  };

const addSuperHero = (hero) => {
    // return axios.post("http://localhost:4000/superheroes", hero)
    return request({url: "/superheroes", method: 'post', data: hero})
}

export const useSuperHeroesData = (onSuccess, onError, IsQueryEnabled) => {
   return useQuery(
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
    
            onSuccess,
            onError,
            enabled: false ,
            // enabled: false,
           
            // select: (data) => {
            //     const SuperHeroNames = data.data.filter((hero) => hero.name.length > 15)
            //     // console.log(SuperHeroNames)
            //     return SuperHeroNames
            // },
        
        
        })
}

// useMutation hook is used to create, update and delete a data. 

export const useAddSuperHeroData = () => {
    // in useMutaion hook we don't need to pass queryKey necassrily
    const queryClient = useQueryClient() 
    return useMutation(addSuperHero, {
        // onSuccess: (data) => {
            // by doing these you don't want to again refetch by clicking Button it will automatically added as soon as addHero button is clicked.

            // queryClient.invalidateQueries('super-heroes')

            // setQueryData is used to update the mutate response by doing so we reducing the network request
            // queryClient.setQueryData('super-heroes', (oldQueryData) => {
            //     return {
            //         ...oldQueryData,
            //         // In data : we will spread out the oldQueryData and mutation respnose that is newData --> data.data
            //         data: [...oldQueryData.data, data.data]
            //     }
            // })

        // },
        onMutate: async(newHero) => {
           await queryClient.cancelQueries('super-heroes')
           const previousHeroData = queryClient.getQueryData('super-heroes')
            queryClient.setQueryData('super-heroes', (oldQueryData) => {
                return {
                    ...oldQueryData,
                    // In data : we will spread out the oldQueryData and mutation respnose that is newData --> data.data
                    data: [...oldQueryData.data,
                    {id: oldQueryData?.data?.length + 1, ...newHero}
                ],
                }
            })
            return {
                // this will use to rollback if mutation is prone to errors
                previousHeroData,
            }

        },
        onError: (_error, _hero, context) => {
            // if error then rollback to previousHeroData
            queryClient.setQueryData('super-heroes', context.previousHeroData)
        },
        // This will run either on success or onError
        onSettled: () => {
            queryClient.invalidateQueries('super-heroes')
        }
    })

}