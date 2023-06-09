import {useQuery} from "react-query"
import axios from "axios"

const fetchUserByEmail = (email) => {
    return axios.get(`http://localhost:4000/users/${email}`)
}

const fetchCoursesByChannelId = (channelId) => {
    return axios.get(`http://localhost:4000/channels/${channelId}`)
}



const DependentQueriesPage = ({email}) => {
    const {data : user} = useQuery(['user', email], () => fetchUserByEmail(email))
    
    const channelId = user?.data.channelId
    
    // third parameter enabled is passed because when the channelId will get from the user response then only hit this query means hit (channelId)
    useQuery(['courses', channelId], () => fetchCoursesByChannelId(channelId), {
        enabled: !!channelId,
    })

    return (
        <div>
           Dependent Queries Page 
        </div>
    )
}

export default DependentQueriesPage
