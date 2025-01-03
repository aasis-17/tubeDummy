class likeServices {

    async toggleVideoLike (videoId) {
        try{
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/like/toggle-videoLike/${videoId}`,
                {
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

    async toggleCommentLike (commentId){
        try{
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/like/toggle-commentLike/${commentId}`,
                {
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

    async getAllLikedVideos () {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/like/get-allLiked-videos`,
                {
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

}

const likeService = new likeServices()
export default likeService