import React, {useState} from 'react'
import { InputField} from "../index"
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import authService from '../../services/authServices'


function ChangePassword() {
    const [onError, setOnError] = useState("")
    const [visibility, setVisibility] = useState({
        oldPassword : false,
        newPassword : false
    })

    const {register, handleSubmit, reset} = useForm()

    const {mutateAsync, isLoading} = useMutation({
        mutationFn : (formData) => authService.changePassword(formData),
        onError : () => setOnError("Invalid old Password!!"), 
        onSuccess : () => {alert("Password changed successfully!!"), reset()}  
    })
  

  return (
    <div className="max-w-md  p-6 rounded-lg ">
      <h2 className="text-3xl font-semibold mb-10">Change Password</h2>
      <form onSubmit={handleSubmit(mutateAsync)} >
        
        <div className="mb-6">
          <InputField
            label = "Old Password"
            classLabel="block text-gray-700 text-base font-semibold mb-2"
            type={visibility.oldPassword ? "text" : "password"}
            id='oldPassword'
            onClick={() => setOnError("")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter old password"
            {...register("oldPassword",{required : true})}
          />
          {onError && <div className="text-red-500 mb-4">{onError}</div>}
          <InputField
            label = "Show Password"
            classLabel = "text-sm text-gray-700 mx-2"
            type='checkbox'
            defaultChecked = {visibility.oldPassword}
            onClick={(e) => setVisibility(prev => ({...prev, oldPassword : e.target.checked}))}
             />
        </div>
        
        <div className="mb-6">
          <InputField
            label = "New Password"
            classLabel="block text-gray-700 text-base font-semibold mb-2"
            type={visibility.newPassword ? "text" : "password"}
            id="newPassword"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onClick ={() => setOnError("")}
            placeholder="Enter new password"
            {...register("newPassword",{required : true})}
          />
            <InputField
            label = "Show Password"
            classLabel = "text-sm text-gray-700 mx-2"
            type='checkbox'
            defaultChecked = {visibility.newPassword}
            onClick={() => setVisibility(prev => ({...prev, newPassword : !prev.newPassword}))}
             />
             
        </div>
        <div className="flex items-center justify-between">
          <button 
            disabled = {isLoading}
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  )
}

export default ChangePassword