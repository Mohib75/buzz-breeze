import { FaComment } from "react-icons/fa"
import { Link } from "react-router-dom"

const PostCard = ({ post }) => {
	// Function to slice the title to 20 words and add "..."
	const truncateTitle = (title) => {
		if (!title) return ""

		const fixedWord = title.slice(0, 16)
		const finalWord = fixedWord + "..."
		return title.length >= 20 ? finalWord : title
	}
	return (
		<Link to={`/post/${post?._id}`} className='hover:bg-[#222038] transition-all duration-500 cursor-pointer p-4 rounded-2xl'>
			<div className='flex justify-between items-center mt-4 gap-20'>
				<div className='flex gap-4 w-80'>
					<FaComment className='text-[#2575ED]' size={26} />

					<div className='text-lg text-white w-60'>{post?.tags}</div>
				</div>

				<div className='flex flex-col items-center w-40'>
					<p className='text-[#b9b9c8]'>Comments</p>
					<p className='text-white'>30</p>
				</div>

				<div className='flex gap-4 items-center md:items-start'>
					<div className='avatar'>
						<div className='size-16 rounded-full ring ring-[#b9b9c8] ring-offset-[#b9b9c8] ring-offset-2'>
							<img src={post?.image} />
						</div>
					</div>

					<div className='flex flex-col gap-2'>
						<p className='text-[#b9b9c8]'>{truncateTitle(post?.title)}</p>
						<div className='flex items-center gap-4 text-white'>
							<p>{post?.timestamp}</p>
							<p>{post?.name}</p>
						</div>
					</div>
				</div>
			</div>
		</Link>
	)
}

export default PostCard
