import { useQuery } from "@tanstack/react-query"
import useAuth from "../../hooks/useAuth"
import useAxiosSecure from "../../hooks/useAxiosSecure"
import LoadingSpinner from "../../components/shared/LoadingSpinner"
import { Helmet } from "react-helmet-async"
import PostDataRow from "../../components/dashboard/tableRows/PostDataRow"
import { useEffect, useState } from "react"
import Button from "../../components/Button"

const Mypost = () => {
	const { user } = useAuth()
	const axiosSecure = useAxiosSecure()
	const [loading, setLoading] = useState(0)
	const [currentPage, setCurrentPage] = useState(0)
	const [itemsPerPage, setItemsPerPage] = useState(5)
	const [count, setCount] = useState(0)
	const [filteredPosts, setFilteredPosts] = useState([])

	const numberOfPages = Math.ceil(count / itemsPerPage)
	const pages = [...Array(numberOfPages).keys()]

	//   Fetch Bookings Data
	const {
		data: posts = [],
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["myPosts", user?.email],
		queryFn: async () => {
			const { data } = await axiosSecure.get(`/myPosts/${user?.email}`)
			return data
		},
	})

	useEffect(() => {
		setFilteredPosts(posts)
	}, [posts])

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true)
				const response = await axiosSecure.get(`https://buzz-breeze-server.vercel.app/myPostsCount/${user?.email}`)
				setCount(response.data.count)
			} catch (error) {
				console.error("Error getting post count data:", error)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true)
				const response = await axiosSecure.get(
					`https://buzz-breeze-server.vercel.app/myPosts/${user?.email}?page=${currentPage}&size=${itemsPerPage}`
				)
				setFilteredPosts(response.data)
			} catch (error) {
				console.error("Error getting post count data:", error)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [currentPage, itemsPerPage])

	// useEffect(() => {
	// 	fetch(`https://buzz-breeze-server.vercel.app/myPostsCount/${user?.email}`)
	// 		.then((res) => res.json())
	// 		.then((data) => setCount(data.count))
	// }, [user?.email])

	// useEffect(() => {
	// 	fetch(`https://buzz-breeze-server.vercel.app/myPosts/${user?.email}?page=${currentPage}&size=${itemsPerPage}`)
	// 		.then((res) => res.json())
	// 		.then((data) => setFilteredPosts(data))
	// }, [currentPage, itemsPerPage, user?.email])

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

	if (isLoading || loading) return <LoadingSpinner />

	return (
		<>
			<Helmet>
				<title>BuzzBreeze || My Posts</title>
			</Helmet>

			<div className='container mx-auto px-4 sm:px-8'>
				<div className='py-8'>
					<div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 flex flex-col'>
						<div className='inline-block min-w-full shadow overflow-x-auto rounded-lg overflow-hidden'>
							<table className='min-w-full leading-normal'>
								<thead>
									<tr>
										<th
											scope='col'
											className='px-5 py-3 bg-[#313046] text-[#b9b9c8]  border-b border-gray-200 text-left text-sm uppercase font-normal'>
											Title
										</th>
										<th
											scope='col'
											className='px-5 py-3 bg-[#313046] text-[#b9b9c8]  border-b border-gray-200 text-left text-sm uppercase font-normal'>
											Votes
										</th>
										<th
											scope='col'
											className='px-5 py-3 bg-[#313046] text-[#b9b9c8]  border-b border-gray-200 text-left text-sm uppercase font-normal'></th>
										<th
											scope='col'
											className='px-5 py-3 bg-[#313046] text-[#b9b9c8]  border-b border-gray-200 text-left text-sm uppercase font-normal'></th>
									</tr>
								</thead>
								<tbody>
									{/* Table Row Data */}

									{filteredPosts.map((post, index) => (
										<PostDataRow key={index} post={post} refetch={refetch} />
									))}
								</tbody>
							</table>
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
				</div>
			</div>
		</>
	)
}

export default Mypost
