import React, {  useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faHeart} from "@fortawesome/free-regular-svg-icons"
import { faList } from '@fortawesome/free-solid-svg-icons'
import likeService from '../../services/likeServices'
import subService from '../../services/subscriptionServise'
import { PlaylistSection} from '../index'
import { setChannelProfile, setVideoDetails } from '../../store/videoSlice'
import {useSelector, useDispatch } from 'react-redux'
import {useDebounce} from "../../utils/index"
import { useMutation } from 'react-query'
import useDataFetch from '../../utils/useDataFetch'
// import { getVideoById } from '../../../../backendProject/src/controllers/videos.controller'
import videoService from '../../services/videosService'



function VideoSection() {

  const videoDetail = useSelector((state) => state.videoReducer.videoDetail)
  const channelProfile = useSelector(state => state.videoReducer.channelProfile)
  const authStatus = useSelector((state) => state.authReducer.status)

  const [error, setError] = useState("")

  const dispatch = useDispatch()

  const [playlistDisplay, setPlaylistDisplay] = useState(false)
    
  const navigate = useNavigate()

  const fetcher = (videoId) => {
    return videoService.getVideoById(videoId)
  }
  const {data} = useDataFetch(fetcher,videoDetail.detail._id, videoDetail)

  const getPublicId = (videoFile) =>
    {
    const arr = videoFile.split("/")
    return arr[arr.length - 1].replace(".mp4", "") 
    }

  const publicId = useRef(getPublicId(videoDetail.detail?.videoFile))  

  const toggleLike = async (videoId) => {
      setError("")
      try{
        !authStatus && navigate("/login")
          await likeService.toggleVideoLike(videoId)
          dispatch(setVideoDetails({
          userLikedVideo : !videoDetail.userLikedVideo,
        }))

        }
        catch(error){
          setError(error?.message)
        }    
      }

  const debounceToggleLike = useDebounce(toggleLike, 300)

  const toggleSubscription = async (channelId) => {
    setError("")
      try {
        !authStatus && navigate("/login")
            await subService.toggleSubscription(channelId)
            dispatch(setChannelProfile({
            userSubscribedChannel : !channelProfile.userSubscribedChannel
          }))
        }
        catch (error) {
          setError(error?.message) 
        }
      }

  const debounceToggleSubscription = useDebounce(toggleSubscription, 300)

  if(error) return  <p>{error}</p>
  
  return  (
    <div className='relative '>
        <iframe
        className='rounded-t-md object-fill'
        width="100%"
        height="500"
        src={`https://player.cloudinary.com/embed/?public_id=${publicId.current}&cloud_name=backend-project-chai&player[controls]=true`}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        
      ></iframe>
      <div className='w-full bg-gray-200 rounded-b-md sm:h-[100px] sm:mt-2 pb-2'>
        <div className='h-10 pl-7 sm:pl-24 font-semibold py-2 text-xl'>{videoDetail.detail.title}</div>
        <div className='flex items-center justify-between px-2'>
        <div className='flex gap-4 items-center w-[50%] justify-around'>
          <div onClick={() => navigate(`/channel-profile/${videoDetail.detail.owner}/videos`)} className='flex cursor-pointer w-full gap-3 sm:gap-12'>
            <div className='w-12 h-12 rounded-full overflow-hidden'>
                <img src={channelProfile.channelOwnerProfile.avatar} className='w-full h-full'/>
            </div>
            <div className='flex items-center'>
                <h2 className='text-lg font-medium pr-1 sm:pr-3'>{channelProfile.channelOwnerProfile.username}</h2>
                <h5 className='text-lg font-thin text-gray-500'>{channelProfile.channelOwnerProfile.subscriberCount}</h5>
            </div>
            </div>
            <div onClick={() => debounceToggleSubscription(channelProfile.channelOwnerProfile._id)} className='cursor-pointer bg-red-500 sm:w-56 h-10 text-white text-lg text-center content-center rounded-3xl p-1'>
                {channelProfile.userSubscribedChannel ? "Subscribed" : "Subscribe"}
            </div>
        </div>
        <div className='flex items-center w-[40%] cursor-pointer justify-evenly'>
            <div className='w-10 flex justify-around items-center' onClick={() => debounceToggleLike(videoDetail.detail._id)}>
              <FontAwesomeIcon icon={faHeart} style={{color: videoDetail.userLikedVideo ? "#db0f4c" : ""}} />
              <span>{data?.data.videoLikeCount}</span>
            </div>

            <div onClick={() => setPlaylistDisplay((prev => !prev))} className='cursor-pointer'>
                <FontAwesomeIcon icon={faList} />
                {playlistDisplay &&  <PlaylistSection />}
            </div>
        </div>
      </div>
        </div>
      </div>
    
  ) 
}

export default VideoSection