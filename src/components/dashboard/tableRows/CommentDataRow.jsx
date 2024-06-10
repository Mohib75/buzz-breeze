import { useForm } from "react-hook-form"
import useAxiosSecure from "../../../hooks/useAxiosSecure"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import LoadingSpinner from "../../shared/LoadingSpinner"

const CommentDataRow = ({ comment }) => {
	const axiosSecure = useAxiosSecure()
	const { register, handleSubmit } = useForm({
		criteriaMode: "all",
	})
	const [loading, setLoading] = useState(false)
	const [isButtonDisabled, setIsButtonDisabled] = useState(true)

	const { mutateAsync } = useMutation({
		mutationFn: async (reportData) => {
			const { data } = await axiosSecure.post(`/addReport`, reportData)
			return data
		},
		onSuccess: () => {
			console.log("Report Submitted Successfully")
			toast.success("Report Submitted Successfully!")
			setLoading(false)
			setIsButtonDisabled(true) // Disable button after submission
		},
	})

	const onSubmit = async (data) => {
		const { feedback } = data

		try {
			setLoading(true)

			const reportData = {
				email: comment?.email,
				comment: comment?.comment,
				feedback: feedback,
			}
			console.table(reportData)

			// Post request to server
			await mutateAsync(reportData)
		} catch (err) {
			console.log(err)
			toast.error(err.message)
			setLoading(false)
			setIsButtonDisabled(true) // Disable button in case of error
		}
	}

	const handleFeedbackChange = (event) => {
		setIsButtonDisabled(!event.target.value)
	}

	if (loading) return <LoadingSpinner />

	return (
		<tr>
			<td className='px-5 py-5 border-b border-gray-200 bg-[#313046] text-sm'>
				<div className='flex items-center'>
					<div className='ml-3'>
						<p className='text-[#b9b9c8] whitespace-no-wrap'>{comment?.email}</p>
					</div>
				</div>
			</td>
			<td className='px-5 py-5 border-b border-gray-200 bg-[#313046] text-sm'>
				<div className='flex items-center'>
					<div className='ml-3'>
						<p className='text-[#b9b9c8] whitespace-no-wrap'>{comment?.comment}</p>
					</div>
				</div>
			</td>
			<td className='px-5 py-5 border-b border-gray-200 bg-[#313046] text-sm'>
				<div className='flex items-center gap-4'>
					<form onSubmit={handleSubmit(onSubmit)} className='flex items-center gap-4 w-full'>
						<div className='ml-3'>
							<select
								{...register("feedback")}
								className='px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-900 outline-none w-full max-w-xs'
								onChange={handleFeedbackChange}>
								<option value='' disabled selected>
									Select Feedback
								</option>
								<option value='inappropriate'>This comment is inappropriate</option>
								<option value='violation'>This comment is a violation of the rules</option>
								<option value='inappropriate words'>This comment uses inappropriate words</option>
							</select>
						</div>
						<button
							type='submit'
							className='btn rounded-full border-none bg-[#b9b9c8] text-[#313046] w-[120px] text-lg font-semibold leading-5 hover:bg-[#2575ED] hover:scale-105 transform transition-all duration-500'
							disabled={isButtonDisabled}>
							Report
						</button>
					</form>
				</div>
			</td>
		</tr>
	)
}

export default CommentDataRow
