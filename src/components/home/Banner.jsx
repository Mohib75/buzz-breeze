import { useQuery } from "@tanstack/react-query"
import useAxiosCommon from "../../hooks/useAxiosCommon"
import Button from "../Button"
import queryString from "query-string"
import { useNavigate } from "react-router-dom"

const Banner = () => {
	const axiosCommon = useAxiosCommon()
	const navigate = useNavigate()

	const { data: tags = [] } = useQuery({
		queryKey: ["tags"],

		queryFn: async () => {
			const { data } = await axiosCommon.get(`/tags`)
			return data
		},
	})

	const handleSearch = (e) => {
		e.preventDefault()
		const searchText = e.target.search.value
		let currentQuery = { tags: searchText }
		const url = queryString.stringifyUrl({
			url: "/",
			query: currentQuery,
		})
		// url output---> /?tags=searchText

		// 2. Set query string in url
		navigate(url)
	}
	return (
		<div className='h-[500px] bg-[#313046] rounded-2xl my-12 flex flex-col justify-center items-center mx-4 sm:mx-0 p-4'>
			<h1 className='text-xl md:text-6xl font-bold text-white'>Welcome to BuzzBreeze Forum</h1>
			<p className='text-[#b9b9c8] mt-4 mb-12 text-sm sm:text-base'>
				Join our community to share ideas, ask questions, and connect with fellow enthusiasts!
			</p>

			<form onSubmit={handleSearch} role='form' className='relative flex bg-[#b9b9cb] text-[#222038] rounded-full text-sm sm:text-base'>
				<input
					type='text'
					name='search'
					placeholder='enter your search here'
					className='rounded-full flex-1 px-2 sm:px-6 py-4 focus:outline-none focus:bg-[#b9b9cb] bg-[#b9b9cb] text-[#222038] placeholder:text-[#222038]'
				/>
				<Button className='bg-[#2575ED] text-white rounded-full font-semibold px-4 text-xs sm:text-base sm:px-8 py-4 hover:opacity-70 focus:outline-none'>
					Search
				</Button>
			</form>
		</div>
	)
}

export default Banner
