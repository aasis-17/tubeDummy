import React, { useEffect, useState } from 'react'
import videoService from '../services/videosService'
import { useDispatch, useSelector } from 'react-redux'
import { getVideoData } from '../store/videoSlice'
import { Link } from "react-router-dom"
import { Container } from "../components/index"
import { useTimeConverterHook } from '../utils/index'
import useDataFetch from '../utils/useDataFetch'


function Home() {

  const searchTitle = useSelector((state) => state.videoReducer.searchTitle)

  const fetcher = () => {
    return videoService.getAllVideos(searchTitle)
  }
  const {isLoading, error, data} = useDataFetch(fetcher, searchTitle)

  console.log(data)

  if(isLoading) return <div>loading home...</div>

  if(error) return <div>{error?.message}</div>
    
   return  (
    <>
    {/* <Container className='mt-16'> */}
      <div className="w-full h-full flex-wrap sm:flex sm:justify-evenly  sm:gap-y-6 mt-2" >   
        { data?.data.allVideos?.map((video) => {
          const convertTime = useTimeConverterHook(video.createdAt)
            return(
              <div className='mb-4 px-5 ' key={video._id}>

              <Link state={video.owner.username} className="cursor-pointer "  to={`/video-detail/${video._id}/description`}  >
                <div className="bg-white w-full sm:w-[350px] h-[220px] rounded hover:shadow-xl transition-shadow duration-300">
                  <div className="rounded ">
                    <div className=' h-34 overflow-hidden cursor-pointer'>
                      <img className="w-full h-[160px] object-cover" src={video.thumnail} alt="Video Thumbnail"/>
                    </div>
                 
                    <div className=" px-3 ">
                      <div className="font-semibold text-lg">{video.title}</div>
                        <div className='flex justify-between'>
                            <div className="text-gray-600 text-base ">{video.owner.fullName}</div>
                            <div className="text-gray-500 text-sm">{convertTime}</div>
                        </div>
                       
                    </div>
                </div>
                </div>
              </Link>
            </div>
            )
        })}
        </div>
        {/* </Container> */}
    </>
  ) 
  
}

export default Home