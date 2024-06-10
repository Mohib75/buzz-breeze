import { useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import toast from "react-hot-toast"
import useAxiosSecure from "../../../hooks/useAxiosSecure"
import { BiDownvote, BiUpvote } from "react-icons/bi"
import { FaRegComments } from "react-icons/fa"
import { MdDeleteOutline } from "react-icons/md"
import Button from "../../Button"
import DeleteModal from "../../modal/DeleteModal"
import { Link } from "react-router-dom"

const PostDataRow = ({ post, refetch }) => {
	const axiosSecure = useAxiosSecure()
	const [isOpen, setIsOpen] = useState(false)
	const closeModal = () => {
		setIsOpen(false)
	}

	//   delete
	const { mutateAsync } = useMutation({
		mutationFn: async (id) => {
			const { data } = await axiosSecure.delete(`/post/${id}`)
			return data
		},
		onSuccess: async (data) => {
			console.log(data)
			refetch()
			toast.success("Post Deleted")
		},
	})

	const { data: commentCount = "" } = useQuery({
		queryKey: ["count"],
		// enabled: !loading && !!user?.email,
		queryFn: async () => {
			const { data } = await axiosSecure(`/myCommentCount/${post?.title}`)
			console.log(data)
			return data.count
		},
	})

	//  Handle Delete
	const handleDelete = async (id) => {
		console.log(id)
		try {
			await mutateAsync(id)
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<tr>
			<td className='px-5 py-5 border-b border-gray-200 bg-[#313046] text-sm'>
				<div className='flex items-center'>
					<div className='ml-3'>
						<p className='text-[#b9b9c8] whitespace-no-wrap'>{post?.title}</p>
					</div>
				</div>
			</td>
			<td className='px-5 py-5 border-b border-gray-200 bg-[#313046] text-sm'>
				<div className='flex items-center gap-4'>
					<div className='flex-shrink-0 flex items-center gap-2'>
						<BiUpvote className='size-6' />

						<p className='text-[#b9b9c8] whitespace-no-wrap'>{post?.upvote}</p>
					</div>

					<div className='flex items-center gap-2'>
						<BiDownvote className='size-6' />

						<p className='text-[#b9b9c8] whitespace-no-wrap'>{post?.downvote}</p>
					</div>
				</div>
			</td>
			<td className='py-5 border-b border-gray-200 bg-[#313046] text-sm '>
				<div className='ml-3 flex items-center gap-2'>
					<Link to={`/dashboard/comment/${post?.title}`}>
						<FaRegComments className='size-6 hover:scale-125 transition-all transform duration-500' />
					</Link>

					<p className='text-[#b9b9c8] whitespace-no-wrap'>{commentCount}</p>
				</div>
			</td>

			<td className=' py-5 border-b border-gray-200 bg-[#313046] text-sm'>
				<Button onClick={() => setIsOpen(true)} className='ml-4 cursor-pointer inline-block py-1 font-semibold leading-tight'>
					<MdDeleteOutline className='size-6 text-red-500 hover:scale-125 transition-all transform duration-500' s />
				</Button>
				{/* Delete Modal */}
				<DeleteModal handleDelete={handleDelete} closeModal={closeModal} isOpen={isOpen} id={post?._id} />
			</td>
		</tr>
	)
}

export default PostDataRow
