
class videoServices {

    async getAllVideos (query="", userId="", page=1, limit=10,sortBy="createdBy", sortType="des") {
        console.log("userId",userId,"query", query)
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/video/get-allVideos?query=${query}&userId=${userId}&page=${page}&limit=${limit}&sortBy=${sortBy}&sortType=${sortType}`)
 
            const data = await response.json()
            if(response.ok) return data
            else{
                throw data
            }   
        }catch(error){
            throw error
        }
    }

    async getVideoById(videoId, loginUser="") {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/video/get-video/${videoId}?loginUser=${loginUser}`,
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

    async uploadVideo (formData) {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/video/upload-video`,{
                method : "POST",
                body : formData,
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

    async deleteVideo (videoId){
        try{
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/video/deleteVideo/${videoId}`,
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

    async updateVideo (videoId, formData){
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/video/updateVideo/${videoId}`,{
                method : "PATCH",
                body : formData,
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
}

const videoService = new videoServices()

export default videoService