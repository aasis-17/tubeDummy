import React from 'react'
import likeService from '../../services/likeServices'
import useDataFetch from '../../utils/useDataFetch'

function ProfileLikedVideos() {

  const fetcher = () => {
    return likeService.getAllLikedVideos()
  }
  const {isLoading, error, data} = useDataFetch(fetcher )

  const channelLikedVideos = data?.data

  if(isLoading) return <div>loading liked videos...</div>

  if(error) <div>{error}</div>

  return  (
    <div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-3 mx-3">
          {channelLikedVideos ?  channelLikedVideos?.map((video) => (
            <div key={video._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={video.thumnail} alt={video.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h4 className="text-lg font-semibold">{video.title}</h4>
              </div>
            </div>
          )) : (<p>No liked videos!!</p>)
        }
        </div>
        
    </div>
  )
}

export default ProfileLikedVideos