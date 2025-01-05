 class userServices{

    async getUserProfile(channelId, loginUser= ""){
        try{
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/channel-profile/${channelId}?loginUser=${loginUser}`,
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

    async updateDetail (accountDetail){

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/update-details`,{
                method : "PATCH",
                body : JSON.stringify(accountDetail),
                headers : {
                    "content-type" : "application/json"
                },
                credentials : "include"
            })
            const data = await response.json()
            if(response.ok) return data
            else{
                throw data
            }   
        }catch(error){
            throw error
        }
    }

    async changePassword (passwords) {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/change-password`,{
                method : "POST",
                body : JSON.stringify(passwords),
                headers : {
                    "content-type" : "application/json"
                },
                credentials : "include"
            })
            const data = await response.json()
            if(response.ok) return data
            else{
                throw data
            }   
        }catch(error){
            throw error
        }

    }

    async updateAvatar (avatar){
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/update-avatar`,
                {
                    method : "PATCH",
                    body : avatar,
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

    async updateCoverImage (coverImage){
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/update-coverImage`,
                {
                    method : "PATCH",
                    body : coverImage,
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

const userService = new userServices()

export default userService

