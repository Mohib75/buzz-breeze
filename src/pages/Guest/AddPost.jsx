import { useForm } from "react-hook-form"
import useAxiosCommon from "../../hooks/useAxiosCommon"
import useAxiosSecure from "../../hooks/useAxiosSecure"
import { useMutation, useQuery } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { Helmet } from "react-helmet-async"
import { useEffect, useState } from "react"
import useAuth from "../../hooks/useAuth"
import { TbFidgetSpinner } from "react-icons/tb"
import CheckStatusModal from "../../components/modal/CheckStatusModal"
import LoadingSpinner from "../../components/shared/LoadingSpinner"
import useStatus from "../../hooks/useBadge"

const AddPost = () => {
	const axiosSecure = useAxiosSecure()
	const axiosCommon = useAxiosCommon()
	const { user } = useAuth()
	const [badge, isLoading] = useStatus()
	const [loading, setLoading] = useState(false)
	const [isOpen, setIsOpen] = useState(false)
	const [showForm, setShowForm] = useState(true)
	const { register, handleSubmit } = useForm({
		criteriaMode: "all",
	})

	const closeModal = () => {
		setIsOpen(false)
		setShowForm(false)
	}

	const { mutateAsync } = useMutation({
		mutationFn: async (postData) => {
			const { data } = await axiosSecure.post(`/addPost`, postData)
			return data
		},
		onSuccess: () => {
			console.log("Post Added Successfully")
			toast.success("Post Added Successfully!")
			setLoading(false)
		},
	})

	const { data: tags = [] } = useQuery({
		queryKey: ["tags"],
		enabled: !loading && !!user?.email,
		queryFn: async () => {
			const { data } = await axiosSecure.get(`/tags`)
			return data
		},
	})

	const {
		data: count,
		isLoading: countLoading,
		refetch: refetchCount,
	} = useQuery({
		queryKey: ["count"],
		enabled: !!user?.email,
		queryFn: async () => {
			const { data } = await axiosSecure.get(`/myPostsCount/${user?.email}`)
			return data.count
		},
	})

	const refetchData = () => {
		refetchCount() // Refetch post count
	}

	useEffect(() => {
		if (!countLoading && !isLoading && badge === "Bronze" && count >= 5) {
			setIsOpen(true)
		}
	}, [count, countLoading, badge, isLoading])

	//   Form handler
	const onSubmit = async (data) => {
		const { name, email, title, description, tags } = data
		const imageFile = { image: data.image[0] }

		try {
			setLoading(true)
			// 1. Upload image and get image url
			const { data } = await axiosCommon.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, imageFile, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})

			const timestamp = new Date().toLocaleDateString("en-GB", {
				day: "2-digit",
				month: "short",
				year: "numeric",
			})

			const postData = {
				name,
				email,
				image: data.data.display_url,
				title,
				description,
				tags,
				upvote: 0,
				downvote: 0,
				timestamp,
			}
			console.table(postData)

			//   Post request to server
			await mutateAsync(postData)
			refetchCount()
		} catch (err) {
			console.log(err)
			toast.error(err.message)
			setLoading(false)
		}
	}

	// if (isOpen) {
	// 	return <CheckStatusModal isOpen={isOpen} closeModal={closeModal} />
	// }

	if (countLoading) return <LoadingSpinner />
	return (
		<>
			{refetchData}
			<Helmet>
				<title>BuzzBreeze || Add Post</title>
			</Helmet>
			{showForm && ( // Render the form only if showForm is true
				<div className='flex justify-center my-16 p-12 px-4 sm:px-12 rounded-2xl mx-2 sm:mx-0'>
					<div className='w-full max-w-4xl p-8 space-y-3 rounded-xl drop-shadow-xl h-full bg-[#313046] bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20 border border-gray-100'>
						<h1 className='text-2xl font-bold text-center'>Add Post</h1>
						<form action='' className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
							<div className='flex gap-4 flex-col sm:flex-row items-center w-full'>
								<div className='space-y-1 text-sm w-full sm:w-1/2'>
									<label htmlFor='name' className='block text-[#FFFFFF9E]'>
										Author Name
									</label>
									<input
										required
										{...register("name")}
										type='text'
										name='name'
										id='name'
										placeholder='Author Name'
										defaultValue={user?.displayName}
										className='w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-900 outline-none'
									/>
								</div>

								<div className='space-y-1 text-sm w-full sm:w-1/2'>
									<label htmlFor='image' className='block text-[#FFFFFF9E]'>
										Select Image:
									</label>
									<input
										{...register("image")}
										type='file'
										name='image'
										id='image'
										accept='image/*'
										placeholder='Photo URL'
										className='w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-900 outline-none'
									/>
								</div>
							</div>

							<div className='flex gap-4 flex-col sm:flex-row items-center w-full'>
								<div className='space-y-1 text-sm w-full sm:w-1/2'>
									<label htmlFor='email' className='block text-[#FFFFFF9E]'>
										Email
									</label>
									<input
										required
										{...register("email")}
										type='email'
										name='email'
										id='email'
										placeholder='Email'
										defaultValue={user?.email}
										className='w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-900 outline-none'
									/>
								</div>

								<div className='space-y-1 text-sm w-full sm:w-1/2'>
									<label htmlFor='title' className='block text-[#FFFFFF9E]'>
										Title
									</label>
									<input
										{...register("title")}
										type='text'
										name='title'
										id='title'
										placeholder='Title'
										className='w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-900 outline-none'
									/>
								</div>
							</div>

							<div className='flex gap-4 flex-col sm:flex-row items-center w-full'>
								<div className='space-y-1 text-sm w-full sm:w-1/2'>
									<label htmlFor='description' className='block text-[#FFFFFF9E]'>
										Description
									</label>
									<input
										required
										{...register("description")}
										type='text'
										name='description'
										id='description'
										placeholder='Description'
										className='w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-900 outline-none'
									/>
								</div>

								<div className='space-y-1 text-sm w-full sm:w-1/2'>
									<label htmlFor='title' className='block text-[#FFFFFF9E]'>
										Tags
									</label>
									<select
										{...register("tags")}
										className='px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-900 outline-none w-full max-w-xs'>
										<option disabled selected>
											Select Tag
										</option>
										{tags?.map((tag, index) => (
											<option key={index}>{tag.tags}</option>
										))}
									</select>
								</div>
							</div>

							<div className='flex gap-4 flex-col sm:flex-row items-center w-full'>
								<div className='space-y-1 text-sm w-full sm:w-1/2'>
									<label htmlFor='upvote' className='block text-[#FFFFFF9E]'>
										Up Vote
									</label>
									<input
										disabled
										required
										{...register("upvote")}
										type='number'
										name='upvote'
										id='upvote'
										placeholder='Up Vote'
										defaultValue={0}
										className='w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-900 outline-none'
									/>
								</div>

								<div className='space-y-1 text-sm w-full sm:w-1/2'>
									<label htmlFor='downvote' className='block text-[#FFFFFF9E]'>
										Down Vote
									</label>
									<input
										disabled
										required
										{...register("downvote")}
										type='number'
										name='downvote'
										id='downvote'
										placeholder='Down Vote'
										defaultValue={0}
										className='w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-900 outline-none'
									/>
								</div>
							</div>

							<button
								disabled={loading ? true : false}
								className='block w-full p-3 text-center text-white bg-transparent border-solid border-[1px] border-[#FFFFFF45] hover:bg-[#2575ED] transition-all duration-500 rounded-md'
								type='submit'>
								{loading ? <TbFidgetSpinner className='animate-spin m-auto' /> : "Add"}
							</button>
						</form>
					</div>
				</div>
			)}
			<CheckStatusModal isOpen={isOpen} closeModal={closeModal} />
		</>
	)
}

export default AddPost
