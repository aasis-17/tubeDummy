

class authServices{
    
    async createAccount (formData){
        try{
        const email = formData.get("email")
        const password = formData.get("password")

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/register`, {
            method : "POST",
            body : formData
            
        })
        if(response.ok){
           await this.login({email,  password})
           return response.json()     
        }
        // else{
        //     throw new Error("something went wrong!!")
        // }

    }catch(error){
        throw new Error(error?.message);
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

            if(response.ok) return response.json()
            else{
                const error = await response.json()
                throw error.errors
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
            if(response.ok) return response.json()
            else{
                throw new Error("something went wrong!!")
            }
    
        }catch(error){
            throw new Error(error?.message);
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
           if(response.ok) return response.json()
           else{
            throw new Error("something went wrong!!")
        }

    }catch(error){
        throw new Error(error?.message)
    }
    }

    async getCurrentUser(){
        try{
            
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/current-user`, {
            method : "GET",
            credentials: 'include'
        } )

        if(response.ok) return response.json()
        else{
            throw new Error("something went wrong!!")
        }

    }catch(error){
        throw new Error(error?.message);
    }
        
    }

    async channelDashboard (channelId) {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/dashboard/getchannel-stats/${channelId}`,
                {
                    credentials : "include"
                }
            )

            if (response.ok) return response.json()

            else throw new Error("Something went wrong!")

        } catch (error) {
            throw new Error(error?.message)
        }
    }

    async refreshAccessToken () {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/refreshed-accesstoken`,{
                method : "POST",

                
            })
            console.log(response)
           if(response.ok) return response.json();
            else{
            throw new Error("something went wrong!!")
        }

        }catch(error){
        throw new Error(error?.message);
    }
    }

    async deactivateAccount (){
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/deactivate-account`,
                {
                    method : "DELETE"
                }
            )
            if(response.ok) return response.json()
                else throw new Error("something went wrong")
        } catch (error) {
            throw error
            
        }
    }
}

const authService = new authServices()

export default authService