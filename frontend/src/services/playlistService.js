
class playlistServices {

    async getUserPlaylist (userId){
        try{
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/playlist/get-userPlaylist/${userId}`,
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

    async addVideoToPlaylist (playlistId, videoId) {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/playlist/addvideo-to-playlist/${playlistId}/${videoId}`,
                {
                    method : "PATCH",
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

    async removeVideoFromPlaylist (playlistId, videoId) {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/playlist/remove-video/${playlistId}/${videoId}`,
                {
                    method : "DELETE",
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
            const data = await response.json()
            if(response.ok) return data
            else{
                throw data
            }   
        }catch(error){
            throw error
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

const playlistService = new playlistServices()

export default playlistService