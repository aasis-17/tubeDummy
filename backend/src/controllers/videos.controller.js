import { User } from "../models/user.model.js"
import { ApiError } from "../utiles/ApiErrors.js"
import { Video } from "../models/video.model.js"
import { ApiResponse } from "../utiles/ApiResponse.js"
import { asyncHandler } from "../utiles/asyncHandler.js"
import { deleteFileOnCloudinary, uploadOnCloudinary } from "../utiles/cloudinaryOrFileupload.js"
import mongoose from "mongoose"
import { isValidObjectId } from "mongoose"

const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy= "createdAt", sortType="dec", userId } = req.query
    //TODO: get all videos based on query, sort, pagination
    
    const filter = {}
    const sort = {}

    if(userId){
        filter.owner = new mongoose.Types.ObjectId(userId)
    }

    if(query){
        filter.title = {$regex : query, $options : "i"}
    }

    if(sortBy && sortType){
       sort[sortBy] = sortType === "asc" ? 1 : -1; 
    }

    const pageNo = parseInt(page)
    const limitNo = parseInt(limit)

    const skip = (pageNo - 1) * limitNo; //NOTE : skip no of videos 

    //const allVideos = await Video.find(filter).sort(sort).skip(skip).limit(limit)
    const allVideos = await Video.aggregate([
        {
            $match : filter
        },
        {
            $lookup : {
                from : "users",
                localField : "owner",
                foreignField : "_id",
                as : "owner",
                pipeline : [
                    {
                        $project : {
                            fullName : 1,
                            avatar : 1,
                            username : 1

                        }
                    }
                ]
            }
            
        },
        {
            $addFields : {
                owner : {
                    $first : "$owner"
                }
            }
        },
        {
            $sort : sort
        }
    ])

    //for pagination


    const totalVideosCount = await Video.countDocuments(filter)

    const pagination = {
        currentPage : pageNo,
        totalPage : Math.ceil(totalVideosCount / limitNo),
        totalVideosCount 
    }

    return res.status(200).json( new ApiResponse(200, {allVideos, pagination}, "Videos fetched successfully!!"))

})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description} = req.body
    // TODO: get video, upload to cloudinary, create video

    console.log(req.files)

    if(!title && !description){
        throw new ApiError(400, "title or description missing!!")
    }

    const user = await User.findById(req.user?._id)

    const videoLocalPath = req.files?.videoFile[0]?.path;
    const videoThumnailPath = req.files?.thumnail[0]?.path

    if(!videoLocalPath){
        throw new ApiError(404, "videoFile is reuired!!")
    }

    if(!videoThumnailPath){
        throw new ApiError(404, "Thumnail is required!!")
    }

    const videoFile = await uploadOnCloudinary(videoLocalPath)
    const videoThumnail = await uploadOnCloudinary(videoThumnailPath)

    console.log(videoFile)

    const createVideo = await Video.create(
        {
            videoFile : videoFile.url,
            thumnail : videoThumnail.url,
            owner : user._id,
            title : title,
            description : description,
            duration : videoFile.duration
        }
    )

    const videoPublished = await Video.findById(createVideo._id)

    if(!videoPublished){
        throw new ApiError(500, "Video has not been published!!")
    }

    videoPublished.videoPublic_id = videoFile.public_id
    videoPublished.thumnailPublic_id = videoThumnail.public_id
    await videoPublished.save({validateBeforeSave : false})

    console.log(videoPublished)

    return res.status(200)
    .json( new ApiResponse(200, videoPublished, "Video uploaded successfully!!"))

})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const {loginUser} = req.query
    console.log(loginUser)
    //TODO: get video by id:
    let userId;

    if(!isValidObjectId(videoId)){
        throw new ApiError(400, "videoid invalid!!")
    }
    
    if(loginUser){
        if(!isValidObjectId(loginUser)){
            throw new ApiError(400 , "Invalid userId!!")
        }
        userId = loginUser

    }
     

    const video = await Video.aggregate([
        {
            $match : {
                _id : new mongoose.Types.ObjectId(videoId)
            }
        },
        {
            $lookup :{
                from : "likes",
                localField : "_id",
                foreignField : "video",
                as : "videoLike"
            }
        },
        {
            $addFields : {
                videoLikeCount : {
                    $size : "$videoLike"
                },
                isLiked : {
                    $cond : {
                        if : { $in : [new mongoose.Types.ObjectId(userId), "$videoLike.likedBy"]},
                        then : true,
                        else : false
                    }
                }
            }
        }, 
        {
            $project : {
                videoFile : 1,
                thumnail : 1,
                title : 1,
                description : 1,
                owner : 1,
                duration : 1,
                videoLikeCount : 1,
                isLiked : 1

            }
        }
    ])

    if(!video) {
        throw new ApiError(400, "Video doesnot exists!!")
    }

    return res.status(200).json( new ApiResponse(200, video[0], "video sucessfully fetched!!"))


})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: update video details like title, description, thumbnail

    if(!isValidObjectId(videoId)){
        throw new ApiError(400, "Invaild videoId!!")
    }

    const {title, description} = req.body
    console.log(req.params)
    console.log(title, description)

    if(title?.trim() === "" && description?.trim() === ""){
        throw new ApiError(400, "title and description is required!!")
    }

    const video = await Video.findById(videoId)

    const updateThumnailLocalPath = req.file?.path
    console.log(video)
    console.log(updateThumnailLocalPath)

    let updatedVideo;

    if(!updateThumnailLocalPath){
          updatedVideo = await Video.findByIdAndUpdate(videoId,
            {
                $set : {
                    title : title,
                    description : description,
                    thumnail : video.thumnail,
                    thumnailPublic_id : video.thumnailPublic_id
                }
            },{
                new : true
            }
        )
    }else{
        const response = await deleteFileOnCloudinary(video.thumnailPublic_id)

        const updatedThumnail = await uploadOnCloudinary(updateThumnailLocalPath) 
    
         updatedVideo = await Video.findByIdAndUpdate(videoId,
            {
                $set : {
                    title : title,
                    description : description,
                    thumnail : updatedThumnail.url,
                    thumnailPublic_id : updatedThumnail.public_id
                }
            },{
                new : true
            }
        )
    }

    //const existingThumnailPublicId = video.thumnail.slice(60, 80) // NOTE : We need public_id of existing file in order to delete existing file on cloudinary!
    console.log(updatedVideo)
 


    return res.status(200).json( new ApiResponse(200, {updatedVideo}, "Video updated successfully!!"))
})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: delete video

    if(!isValidObjectId(videoId)){
        throw new ApiError(400, "Invalid videoId!!")
    }

   
    const deleteVideoDoc = await Video.findByIdAndDelete(videoId)

    if(!deleteVideoDoc){
        throw new ApiError(400, "Video doesnot exists!!")
    }

   // const videoPublicId = deleteVideo.videoFile.slice(60, 80)

    const deletingVideoFromCloudinary = await deleteFileOnCloudinary(deleteVideoDoc.videoPublic_id)
    const deletingVideoThumnailFromCloudinary = await deleteFileOnCloudinary(deleteVideoDoc.thumnailPublic_id)
    
    return res
    .status(200)
    .json( new ApiResponse(200, {deleteVideoDoc}, "Video has been deleted successfully!!" ))
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params

    if(!isValidObjectId(videoId)){
        throw new ApiError(400, "Invalid videoId!!")
    }

    const video = await Video.findById(videoId)

    console.log(video.owner, req.user._id)

    if(video.owner.equals(req.user?._id) ){  // NOTE: for comparing ObjectId we use .equals() method
        video.isPublished = true
        await video.save({ validateBeforeSave : false })
    }else{
        video.isPublished = false
        await video.save({ validateBeforeSave : false })
    }

    const updatedVideo = await Video.findById(videoId)

    return res.status(200).json( new ApiResponse(200, updatedVideo, "isPublished toggled successfully !!"))
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}