import { useMutation } from "@tanstack/react-query"
import Button from "../../Button"
import toast from "react-hot-toast"
import { useForm } from "react-hook-form"
import useAxiosSecure from "../../../hooks/useAxiosSecure"
import { useState } from "react"
import { TbFidgetSpinner } from "react-icons/tb"

const AddTag = () => {
	const axiosSecure = useAxiosSecure()
	const [loading, setLoading] = useState(false)
	// const { user } = useAuth()
	const { register, handleSubmit } = useForm({
		criteriaMode: "all",
	})

	const { mutateAsync } = useMutation({
		mutationFn: async (tagsData) => {
			const { data } = await axiosSecure.post(`/addTags`, tagsData)
			return data
		},
		onSuccess: () => {
			console.log("Tags Added Successfully")
			toast.success("Tags Added Successfully!")
			setLoading(false)
		},
	})

	//   Form handler
	const onSubmit = async (data) => {
		const { tags } = data

		try {
			const tagsData = {
				tags,
			}
			console.table(tagsData)

			//   Post request to server
			await mutateAsync(tagsData)
		} catch (err) {
			console.log(err)
			toast.error(err.message)
			setLoading(false)
		}
	}

	return (
		<div className='flex justify-center my-20 p-12 px-4 sm:px-12 rounded-2xl mx-2 sm:mx-0'>
			<div
				className='w-full sm:max-w-lg p-8 space-y-3 rounded-xl drop-shadow-xl h-full bg-[#313046] bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20 border border-gray-100
'>
				<h1 className='text-2xl font-bold text-center'>Add Tags</h1>
				<form action='' className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
					<div className='space-y-1 text-sm'>
						<label htmlFor='email' className='block text-[#FFFFFF9E]'>
							Tags
						</label>
						<input
							required
							{...register("tags")}
							type='text'
							name='tags'
							id='tags'
							placeholder='Tags'
							className='w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-900 outline-none'
						/>
					</div>

					<Button className='block w-full p-3 text-center text-white bg-transparent border-solid border-[1px] border-[#FFFFFF45] hover:bg-[#2575ED] transition-all duration-500 rounded-md'>
						{loading ? <TbFidgetSpinner className='animate-spin m-auto' /> : "Add"}
					</Button>
				</form>
			</div>
		</div>
	)
}

export default AddTag
