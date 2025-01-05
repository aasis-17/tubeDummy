import React, { useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisVertical} from "@fortawesome/free-solid-svg-icons"
import { useTimeConverterHook } from "../../utils/index"
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from 'react-query'
import videoService from '../../services/videosService'
import UploadVideo from './UploadVideo'

function YourVideoCard({video}) {
    const [toggleThreeDots, setToggleThreeDots] = useState(false)
    const [toggleVideoForm, setToggleVideoForm] = useState(false)

    const navigate = useNavigate()

    const queryClient = useQueryClient()

    const deleteVideoMutate =  useMutation(
        {
            mutationFn : (videoId) => videoService.deleteVideo(videoId),
            onSuccess : () =>{
              queryClient.invalidateQueries({ queryKey : ["userVideos"]})
              setToggleThreeDots(false)
            }
        }
    )

  return (
    <>

      <div key={video._id} onClick={() =>{navigate(`/video-detail/${video._id}/description`)}} className="relative cursor-pointer bg-white w-full rounded-lg min-h-20 shadow-md">  
        <div className="p-2 flex justify-between items-center w-full ">           
          
          <img src={video.thumnail} alt={video.title} className="px-2 w-[100px] h-16 object-cover " />   
          <h4 className="text-lg font-semibold">{video.title}</h4>
          <h3>{useTimeConverterHook(video.createdAt)}</h3>

          <span onClick={(e) => {
            e.stopPropagation()
            setToggleThreeDots(prev => !prev)}} className='cursor-pointer'>
            <FontAwesomeIcon className='w-5 px-2 h-8' icon={faEllipsisVertical} />
          </span>
        </div>
          {toggleThreeDots &&
                      <div className='z-10 bg-white shadow-md rounded-lg min-w-32 min-h-22 absolute top-9 right-9 '>
                        
                        <h3 onClick={(e) =>{
                            e.stopPropagation()
                            setToggleVideoForm(prev => !prev)
                            setToggleThreeDots(false)
                        } } className='cursor-pointer p-2 hover:shadow-md hover:bg-gray-50'>Edit</h3>

                        <h3 onClick={(e) =>{
                            e.stopPropagation()
                            deleteVideoMutate.mutate(video._id)
                        } } className='cursor-pointer p-2 hover:bg-slate-50 hover:shadow-lg'>Remove</h3>
                    </div>
          }

      </div>
            {
              toggleVideoForm && 
              (<div onClick={ () => setToggleVideoForm(false)} className='z-20  w-screen absolute top-[-80px] left-0 h-screen '>
                <UploadVideo video = {video} setToggleVideoForm={setToggleVideoForm} edit={true} />
              </div>)
              
            }
            </>

  )
}

export default YourVideoCard