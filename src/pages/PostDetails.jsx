import { useParams } from "react-router-dom"
import useAxiosCommon from "../hooks/useAxiosCommon"
import { useMutation, useQuery } from "@tanstack/react-query"
import LoadingSpinner from "../components/shared/LoadingSpinner"
import { HiMiniHandThumbDown, HiMiniHandThumbUp } from "react-icons/hi2"
import Button from "../components/Button"
import { IoPaperPlaneOutline } from "react-icons/io5"
import { useForm } from "react-hook-form"
import { useState } from "react"
import useAuth from "../hooks/useAuth"
import { axiosSecure } from "../hooks/useAxiosSecure"
import toast from "react-hot-toast"
import { LinkedinShareButton, TwitterShareButton, WhatsappShareButton } from "react-share"
import { FaLinkedinIn, FaTwitter, FaWhatsapp } from "react-icons/fa"
import { Helmet } from "react-helmet-async"

const PostDetails = () => {
	const { id } = useParams()
	const axiosCommon = useAxiosCommon()
	const [loading, setLoading] = useState(false)
	const { user } = useAuth()
	const { register, handleSubmit } = useForm({
		criteriaMode: "all",
	})
	// State for upvote and downvote counts
	const [upvoteCount, setUpvoteCount] = useState(0)
	const [downvoteCount, setDownvoteCount] = useState(0)

	// get the post data
	const {
		data: post = {},
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["post", id],
		queryFn: async () => {
			const { data } = await axiosCommon.get(`/post/${id}`)
			return data
		},
		onSuccess: (data) => {
			setUpvoteCount(data.upvote)
			setDownvoteCount(data.downvote)
		},
	})

	const { title } = post

	// get the comment data
	const { data: comment = [] } = useQuery({
		queryKey: ["comment", title],
		queryFn: async () => {
			const { data } = await axiosCommon.get(`/comment/${title}`)
			return data
		},
		onSuccess: () => {
			refetch()
			setLoading(false)
		},
	})

	const { mutateAsync: addComment } = useMutation({
		mutationFn: async (commentData) => {
			const { data } = await axiosSecure.post(`/addComment`, commentData)
			return data
		},
		onSuccess: () => {
			console.log("Comment Added Successfully")
			toast.success("Comment Added Successfully!")
			refetch()
			setLoading(false)
		},
	})

	const { mutateAsync: updatePost } = useMutation({
		mutationFn: async (updateData) => {
			const { data } = await axiosSecure.patch(`/post/${id}`, updateData)
			return data
		},
		onSuccess: () => {
			console.log("Post Updated Successfully")
			toast.success("Post Updated Successfully!")
			refetch()
			setLoading(false)
		},
		onError: (error) => {
			console.log(error)
			toast.error("Failed to update post")
		},
	})

	// Handlers for upvote and downvote
	const handleUpvote = async () => {
		if (downvoteCount > 0) {
			setDownvoteCount(downvoteCount - 1)
		}
		setUpvoteCount(upvoteCount + 1)
		await updatePost({ upvote: upvoteCount + 1, downvote: downvoteCount > 0 ? downvoteCount - 1 : downvoteCount })
	}

	const handleDownvote = async () => {
		if (upvoteCount > 0) {
			setUpvoteCount(upvoteCount - 1)
		}
		setDownvoteCount(downvoteCount + 1)
		await updatePost({ upvote: upvoteCount > 0 ? upvoteCount - 1 : upvoteCount, downvote: downvoteCount + 1 })
	}

	//   Form handler
	const onSubmit = async (data) => {
		const { comment } = data

		try {
			setLoading(true)
			const commentData = {
				name: user?.displayName,
				email: user?.email,
				title: post?.title,
				comment,
			}
			// console.table(commentData)

			//   Post request to server
			await addComment(commentData)
		} catch (err) {
			console.log(err)
			toast.error(err.message)
			setLoading(false)
		}
	}

	if (loading || isLoading) return <LoadingSpinner />

	const shareUrl = window.location.href

	return (
		<>
			<Helmet>
				<title>BuzzBreeze || Post Details</title>
			</Helmet>
			<div className='flex flex-col gap-8 mx-4 sm:mx-0'>
				<h2 className='text-4xl text-white font-bold self-center'>{post?.title}</h2>

				<div className='flex flex-col bg-[#313046] rounded-2xl w-full p-6 overflow-x-auto'>
					<div className='flex gap-4'>
						<div className='avatar'>
							<div className='size-16 rounded-full ring ring-[#b9b9c8] ring-offset-[#b9b9c8] ring-offset-2'>
								<img src={post?.image} />
							</div>
						</div>

						<div className='flex flex-col gap-4'>
							<div className='flex flex-col gap-4'>
								<div className='flex gap-4 justify-between'>
									<div className='flex gap-4 items-center w-full'>
										<p className='text-white text-sm font-bold'>{post?.name}</p>
										<div className='rounded-lg p-1 bg-[#4e4b6d] text-[#b9b9c8] w-32 text-sm text-center'>Topic author</div>
										<p className='text-white text-sm'># {post?.tags}</p>
									</div>
									<p className='text-white text-sm w-24'>{post?.timestamp}</p>
								</div>

								{post?.tags === "Game Development" && (
									<div className='rounded-2xl sm:w-96 h-80'>
										<img className='object-cover w-full h-full rounded-2xl' src='/Images/post_1.png' />
									</div>
								)}
								{post?.tags === "General Discussion" && (
									<div className='rounded-2xl sm:w-96 h-80'>
										<img className='object-cover w-full h-full rounded-2xl' src='/Images/post_2.jpg' />
									</div>
								)}
								{post?.tags === "Marketplace" && (
									<div className='rounded-2xl sm:w-96 h-80'>
										<img className='object-cover w-full h-full rounded-2xl' src='/Images/post_3.jpeg' />
									</div>
								)}
								{post?.tags === "Suggestions" && (
									<div className='rounded-2xl sm:w-96 h-80'>
										<img className='object-cover w-full h-full rounded-2xl' src='/Images/post_4.png' />
									</div>
								)}
								{post?.tags === "Travel Diaries" && (
									<div className='rounded-2xl sm:w-96 h-80'>
										<img className='object-cover w-full h-full rounded-2xl' src='/Images/post_5.png' />
									</div>
								)}

								<p className='text-white text-sm leading-8'>{post?.description}</p>

								<div className='flex gap-6 items-center justify-between'>
									<div className='flex gap-6 items-center'>
										<div className='flex gap-2'>
											<div className='cursor-pointer' onClick={handleUpvote}>
												<HiMiniHandThumbUp
													className='text-[#D7A31B] hover:scale-110 transform transition-all duration-500'
													size='24'
												/>
											</div>
											<p>{post?.upvote}</p>
										</div>

										<div className='flex gap-2'>
											<div className='cursor-pointer' onClick={handleDownvote}>
												<HiMiniHandThumbDown
													className='text-[#D7A31B] hover:scale-110 transform transition-all duration-500'
													size='24'
												/>
											</div>
											<p>{post?.downvote}</p>
										</div>
									</div>

									<div className='flex gap-4'>
										<p className='text-white text-sm w-24'>share with :</p>

										<TwitterShareButton url={shareUrl}>
											<FaTwitter className='text-[#1DA1F2] hover:scale-125 transform transition-all duration-500' size={20} />
										</TwitterShareButton>
										<LinkedinShareButton url={shareUrl}>
											<FaLinkedinIn
												className='text-[#0077B5] hover:scale-125 transform transition-all duration-500'
												size={20}
											/>
										</LinkedinShareButton>
										<WhatsappShareButton url={shareUrl}>
											<FaWhatsapp className='text-[#25D366] hover:scale-125 transform transition-all duration-500' size={20} />
										</WhatsappShareButton>
									</div>
								</div>
							</div>

							<hr className='w-full bg-[#4e4b6d] h-[1px] my-4' />
							<div className='flex flex-col gap-6'>
								{comment &&
									comment.map((cmnt, index) => (
										<div key={index} className='flex gap-4'>
											<div className='avatar'>
												<div className='size-10 rounded-full ' title={cmnt?.name || "name not found"}>
													<img alt='profile pic' src={"/Images/avatar.jpg"} />
												</div>
											</div>

											<div className='flex flex-col gap-4'>
												<div className='flex gap-4 items-center'>
													<p className='text-white text-sm font-bold'>{cmnt?.name}</p>
													<div className='rounded-lg p-1 bg-[#4e4b6d] text-[#b9b9c8] w-32 text-sm text-center'>
														Commenter
													</div>
												</div>

												<p className='text-white text-sm leading-8'>{cmnt?.comment}</p>
											</div>
										</div>
									))}
							</div>
							<form className='flex gap-4' onSubmit={handleSubmit(onSubmit)}>
								<div className='avatar'>
									<div className='size-10 rounded-full ' title={user?.displayName || "username not found"}>
										<img
											alt='profile pic'
											src={user?.photoURL || "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"}
										/>
									</div>
								</div>
								<textarea
									{...register("comment")}
									className='textarea bg-transparent w-full border-[#b9b9c8] min-h-32 outline-none focus:outline-none resize-none focus:border-[#b9b9c8]'
									placeholder='Enter your comment'></textarea>

								<Button className='self-start mt-4'>
									<IoPaperPlaneOutline className='text-white' size='24' />
								</Button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default PostDetails
