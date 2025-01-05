class commentServices {

    async getVideoComment (videoId){
        try{
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/comment/getall-video-comments/${videoId}`,
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

const commentService = new commentServices()

export default commentService