class commentServices {

    async getVideoComment (videoId){
        try{
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/comment/getall-video-comments/${videoId}`,
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

    async addComment (videoId, data) {
        try{
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/comment/add-comment/${videoId}`,
            {
                method: "POST",
                headers :{
                    "content-type" : "application/json"
                },
                body : JSON.stringify({
                    content : data.text
                }),
                credentials : "include"
            }
        )
        if(response.ok)return response.json()
        else{
            throw new Error("something went wrong!!")
        }

    }catch(error){
        throw new Error(error?.message);
    }
    }

  
}

const commentService = new commentServices()

export default commentService