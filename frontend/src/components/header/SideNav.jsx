import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { faCirclePlay, faHeart, faListUl, faClockRotateLeft, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import authService from '../../services/authServices'
import { logout as storeLogout } from '../../store/authSlice'

import { Link } from 'react-router-dom'

function SideNav({sidebar, setSidebar}) {

    const authStatus = useSelector((state) => state.authReducer.status)

    const loginUserId = useSelector(state => state.authReducer.userData?._id)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logout = async () => {
        try{
            const loggedOut = await authService.logout() 
                setSidebar(false) 
                dispatch(storeLogout()) 
                navigate("/")  
                location.reload("/")

        }catch(error){
            //setError(error?.message)
        } 
    }

    const navItems = [
        {
            name : "Your channel",
            slug : `/channel-profile/${loginUserId}/videos`,
            status : true,
            logo :faCircleUser
        },
        // {
        //     name : "History",
        //     slug : "",
        //     status :  true,
        //     logo : faClockRotateLeft
        // },
        {
            name : "Your videos",
            slug : "/yourVideos",
            status : authStatus,
            logo : faCirclePlay
        },
        {
            name : "Playlsit",
            slug : `/playlist/${loginUserId}`,
            status : authStatus,
            logo : faListUl,
        },
        {
            name : "Liked videos",
            slug : "/likedVideos",
            status : authStatus,
            logo : faHeart
        },
        {
            name : "Setting",
            slug : "/setting/accountSetting",
            status : true,
            logo : faScrewdriverWrench 

        }    
    ]

    const logOutBtn = {
        name : "Signout",
        logo : faRightFromBracket
    }

  return (
    <div onClick={(e) => e.stopPropagation()}  className={`
    ${sidebar? "" : "-translate-x-full "}  w-[300px] h-[500px] bg-gray-700   bg-opacity-95   transition delay-100 mt-2 `}>
        <nav className=' flex flex-col gap-5 text-lg'>
            <ul className='flex-1 px-5' >

                {navItems.map((item) => {
                    if(item.status){
                       return (
                        <li className="block my-3 py-3.5 px-3  rounded transition duration-200 hover:bg-blue-600 hover:text-white" key={item.name}>
                            <Link  onClick={() => setSidebar(false)} to={item.slug}>
                            <FontAwesomeIcon className='h-6 pr-7 ' icon={item.logo}/>

                             {item.name} 
                             
                            </Link>
                            </li>
                            
                        )
                    }
                    
})}
                <li onClick={logout} className="block cursor-pointer my-3 py-3.5 px-3  rounded transition duration-200 hover:bg-blue-600 hover:text-white" key={logOutBtn.name}>
                    <FontAwesomeIcon className='h-6 pr-7 ' icon={logOutBtn.logo}/>
                    {logOutBtn.name}  
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default SideNav