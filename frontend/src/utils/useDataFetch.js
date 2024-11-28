import { useEffect, useState } from 'react'

function useDataFetch( fetcher, ...reqData) {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")
    const [data, setData] = useState()

    useEffect(() => {
        setIsLoading(true)
        setError("")

         fetcher(reqData[0])
         .then(res => res.json())
        .then(data => setData(data))
        .then(data => console.log("hellllllo",data))
        .catch(error => setError(error?.message))
        .finally(() => setIsLoading(false))

    },[...reqData])

return {isLoading, error, data}
}

export default useDataFetch