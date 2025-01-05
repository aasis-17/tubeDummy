

class authServices{
    
    async createAccount (formData){
        try{
        const email = formData.get("email")
        const password = formData.get("password")

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/register`, {
            method : "POST",
            body : formData     
        })
        const data = await response.json()

        if(response.ok){
           await this.login({email,  password})
           return data   
        }
        else{
            throw data
        }
    }catch(error){
        throw error
    }
}

    async login({email, password}){
        try{
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/login`, {
                method : "POST",
                headers : {
                    "content-type" : "application/json"
                },
                body : JSON.stringify({
                    email,
                    username : email,
                    password
                }),
                credentials: 'include'
            })
            const data = await response.json()
            if(response.ok) return data
            else{
                throw data
            }
    
        }catch(error){
            throw error;
        }
    }

    async logout(){
        try{
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/logout`,{
                method: "POST",
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

    async changePassword(formData) {
        try {
            const response =  await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/change-password`,{
                method : "POST",
                headers : {
                    "content-type" : "application/json"
                },
                body : JSON.stringify(formData),
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

    async getCurrentUser(){
        try{
            
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/current-user`, {
            method : "GET",
            credentials: 'include'
        } )

        const data = await response.json()
        if(response.ok) return data
        else{
            throw data
        }   
    }catch(error){
        throw error
    }
        
    }

    async channelDashboard (channelId) {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/dashboard/getchannel-stats/${channelId}`,
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

    async refreshAccessToken () {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/refreshed-accesstoken`,{
                method : "POST",

                
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

    async deactivateAccount (){
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/deactivate-account`,
                {
                    method : "DELETE"
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

const authService = new authServices()

export default authService