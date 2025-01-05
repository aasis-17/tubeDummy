class subscriptionServices {

    async toggleSubscription (channelId){
        try{
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/subscription/toggle-subscription/${channelId}`,
                {
                    credentials : "include"
                }
            )
            const data = await response.json()
            if(response.ok) return data
            else{
                throw data
            }   
        }catch(error){
            throw error
        }
        
    }

} 

const subService = new subscriptionServices()

export default subService