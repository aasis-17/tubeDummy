 class userServices{

    async getUserProfile(channelId, loginUser= ""){
        try{
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/channel-profile/${channelId}?loginUser=${loginUser}`,
            {
                credentials : "include"
            }
        )
        if(response.ok) return response.json()
        else{
            throw new Error("something went wrong!!")
        }

    }catch(error){
        throw new Error(error?.message);
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
            if(response.ok) return response.json()
            else{
                throw new Error("something went wrong!!")
            }
    
        }catch(error){
            throw new Error(error?.message);
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
            if (response.ok) return response.json()
            else{
                throw new Error("something went wrong!!")
            }
    
        }catch(error){
            throw new Error(error?.message);
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
        if (response.ok) return response.json()
        else{
            throw new Error("something went wrong!!")
        }

    }catch(error){
        throw new Error(error?.message);
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
            if(response.ok) return response.json()
            else{
                throw new Error("something went wrong!!")
            }
    
        }catch(error){
            throw new Error(error?.message);
        }
    }
}

const userService = new userServices()

export default userService

