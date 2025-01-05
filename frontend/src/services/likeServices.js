class likeServices {

    async toggleVideoLike (videoId) {
        try{
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/like/toggle-videoLike/${videoId}`,
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

    async toggleCommentLike (commentId){
        try{
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/like/toggle-commentLike/${commentId}`,
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

    async getAllLikedVideos () {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/like/get-allLiked-videos`,
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

const likeService = new likeServices()
export default likeService