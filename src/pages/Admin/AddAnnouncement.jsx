import { useState } from "react"
import Button from "../../components/Button"
import useAxiosSecure from "../../hooks/useAxiosSecure"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import useAxiosCommon from "../../hooks/useAxiosCommon"
import toast from "react-hot-toast"
import { TbFidgetSpinner } from "react-icons/tb"
import { Helmet } from "react-helmet-async"
import useAuth from "../../hooks/useAuth"

const AddAnnouncement = () => {
	const axiosSecure = useAxiosSecure()
	const axiosCommon = useAxiosCommon()
	const { user } = useAuth()
	const [loading, setLoading] = useState(false)
	// const { user } = useAuth()
	const { register, handleSubmit } = useForm({
		criteriaMode: "all",
	})

	const { mutateAsync } = useMutation({
		mutationFn: async (announcementData) => {
			const { data } = await axiosSecure.post(`/addAnnouncement`, announcementData)
			return data
		},
		onSuccess: () => {
			console.log("Announcement Added Successfully")
			toast.success("Announcement Added Successfully!")
			setLoading(false)
		},
	})

	//   Form handler
	const onSubmit = async (data) => {
		const { name, title, description } = data
		const imageFile = { image: data.image[0] }

		try {
			setLoading(true)
			// 1. Upload image and get image url
			const { data } = await axiosCommon.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, imageFile, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})

			const announcementData = {
				name,
				image: data.data.display_url,
				title,
				description,
			}
			console.table(announcementData)

			//   Post request to server
			await mutateAsync(announcementData)
		} catch (err) {
			console.log(err)
			toast.error(err.message)
			setLoading(false)
		}
	}

	return (
		<>
			<Helmet>
				<title>BuzzBreeze || Add Announcement</title>
			</Helmet>
			<div className='flex justify-center my-16 p-12 px-4 sm:px-12 rounded-2xl mx-2 sm:mx-0'>
				<div className='w-full max-w-4xl p-8 space-y-3 rounded-xl drop-shadow-xl h-full bg-[#313046] bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20 border border-gray-100'>
					<h1 className='text-lg md:text-2xl font-bold text-center'>Make Announcement</h1>
					<form action='' className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
						<div className='space-y-1 text-sm'>
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

						<div className='space-y-1 text-sm'>
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

						<div className='space-y-1 text-sm'>
							<label htmlFor='title' className='block text-[#FFFFFF9E]'>
								Title
							</label>
							<input
								required
								{...register("title")}
								type='title'
								name='title'
								id='title'
								placeholder='Title'
								className='w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-900 outline-none'
							/>
						</div>

						<div className='space-y-1 text-sm'>
							<label htmlFor='description' className='block text-[#FFFFFF9E]'>
								Description
							</label>
							<input
								required
								{...register("description")}
								type='description'
								name='description'
								id='description'
								placeholder='Description'
								className='w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-900 outline-none'
							/>
						</div>

						<Button
							disabled={loading}
							className='block w-full p-3 text-center text-white bg-transparent border-solid border-[1px] border-[#FFFFFF45] hover:bg-[#2575ED] transition-all duration-500 rounded-md'
							type='submit'>
							{loading ? <TbFidgetSpinner className='animate-spin m-auto' /> : "Add"}
						</Button>
					</form>
				</div>
			</div>
		</>
	)
}

export default AddAnnouncement
