class subscriptionServices {

    async toggleSubscription (channelId){
        try{
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/subscription/toggle-subscription/${channelId}`)
            if (response.ok) return response.json()
            else{
                throw new Error("something went wrong!!")
            }
    
        }catch(error){
            throw new Error(error?.message);
        }
        
    }

} 

const subService = new subscriptionServices()

export default subService