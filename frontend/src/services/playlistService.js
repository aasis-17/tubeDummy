
class playlistServices {

    async getUserPlaylist (userId){
        try{
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/playlist/get-userPlaylist/${userId}`,
                {
                    credentials : "include"
                }
            )
            console.log(response)
            if (response.ok){
               return response.json()
            }else{
                throw new Error("Something went wrong")
            }
        }catch(error){
            throw new Error(error?.message)
        }

    }

    async addVideoToPlaylist (playlistId, videoId) {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/playlist/addvideo-to-playlist/${playlistId}/${videoId}`,
                {
                    method : "PATCH",
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

    async removeVideoFromPlaylist (playlistId, videoId) {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/playlist/remove-video/${playlistId}/${videoId}`,
                {
                    method : "DELETE",
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

    async createPlaylist (name){
        try{
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/playlist/create-playlist`,
                {
                    method : "POST",
                    headers : {
                        "content-type" : "application/json"
                    },
                    body : JSON.stringify(
                        {
                        name,
                        description : name
                    }),
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

    async deletePlaylist(playlistId) {
        try{
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/playlist/delete-playlist/${playlistId}`,
                {
                    method : "DELETE",
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

const playlistService = new playlistServices()

export default playlistService