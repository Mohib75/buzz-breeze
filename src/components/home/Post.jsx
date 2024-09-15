import useAxiosCommon from "../../hooks/useAxiosCommon"
import { useSearchParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import LoadingSpinner from "../shared/LoadingSpinner"
import PostCard from "./PostCard"
import { useEffect, useState } from "react"
import Button from "../Button"

const Post = () => {
	const axiosCommon = useAxiosCommon()
	// eslint-disable-next-line no-unused-vars
	const [params, setParams] = useSearchParams()
	const selectedTags = params.get("tags")
	const [currentPage, setCurrentPage] = useState(0)
	const [itemsPerPage, setItemsPerPage] = useState(5)
	const [count, setCount] = useState(0)
	const [filteredPosts, setFilteredPosts] = useState([])

	const numberOfPages = Math.ceil(count / itemsPerPage)
	const pages = [...Array(numberOfPages).keys()]

	// console.log(selectedTags)
	const { data: posts = [], isLoading } = useQuery({
		queryKey: ["posts", selectedTags],
		queryFn: async () => {
			const { data } = await axiosCommon.get(`/posts?tags=${selectedTags}`)
			return data
		},
	})

	useEffect(() => {
		setFilteredPosts(posts)
	}, [posts])

	useEffect(() => {
		fetch("https://buzz-breeze-server.vercel.app/postsCount")
			.then((res) => res.json())
			.then((data) => setCount(data.count))
	}, [])

	useEffect(() => {
		fetch(`https://buzz-breeze-server.vercel.app/posts?page=${currentPage}&size=${itemsPerPage}`)
			.then((res) => res.json())
			.then((data) => setFilteredPosts(data))
	}, [currentPage, itemsPerPage])

	const handleItemsPerPage = (e) => {
		const val = parseInt(e.target.value)
		console.log(val)
		setItemsPerPage(val)
		setCurrentPage(0)
	}

	const handlePrevPage = () => {
		if (currentPage > 0) {
			setCurrentPage(currentPage - 1)
		}
	}

	const handleNextPage = () => {
		if (currentPage < pages.length - 1) {
			setCurrentPage(currentPage + 1)
		}
	}

	if (isLoading) return <LoadingSpinner />

	return (
		<>
			{filteredPosts && filteredPosts.length > 0 ? (
				<div className='flex flex-col bg-[#313046] rounded-2xl p-8 mb-12'>
					<h2 className='text-4xl text-white font-bold self-center'>Posts</h2>

					<div className='flex flex-col gap-4 overflow-x-auto'>
						{filteredPosts.map((post, index) => (
							<PostCard key={index} post={post} />
						))}
					</div>

					<div className='pagination mt-20 flex flex-col sm:flex-row gap-8 self-center'>
						<div className='join'>
							<Button onClick={handlePrevPage} className='join-item btn'>
								«
							</Button>
							{pages.map((page, index) => (
								<Button
									onClick={() => setCurrentPage(page)}
									key={index}
									className={currentPage === page ? "bg-[#878495] join-item btn text-white" : "join-item btn"}>
									{page + 1}
								</Button>
							))}

							<Button onClick={handleNextPage} className='join-item btn'>
								»
							</Button>
						</div>

						<select
							className='select border-gray-300 bg-[#F2ECFF] outline-none focus:outline-none w-full max-w-xs text-[#2B2938] hidden'
							value={itemsPerPage}
							onChange={handleItemsPerPage}
							name=''
							id=''>
							<option value='5'>5</option>
							<option value='10'>10</option>
							<option value='20'>20</option>
							<option value='50'>50</option>
						</select>
					</div>
				</div>
			) : (
				""
			)}
		</>
	)
}

export default Post
