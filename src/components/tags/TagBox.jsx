import queryString from "query-string"
import { FaComment } from "react-icons/fa"
import { useNavigate, useSearchParams } from "react-router-dom"

const TagBox = ({ tags }) => {
	// eslint-disable-next-line no-unused-vars
	const [params, setParams] = useSearchParams()
	const selectedTags = params.get("tags")

	const navigate = useNavigate()
	const handleClick = () => {
		// 1. Create Query String
		let currentQuery = { tags: tags }
		const url = queryString.stringifyUrl({
			url: "/",
			query: currentQuery,
		})
		// url output---> /?tags=tags

		// 2. Set query string in url
		navigate(url)
	}

	return (
		<div
			onClick={handleClick}
			className={`flex items-center justify-center gap-4 p-3 border-r-2 bg-[#313046] text-white hover:text-[#b9b9cb] transition cursor-pointer ${
				selectedTags === tags && "text-[#a9a9c7] border-b-2 border-white"
			}`}>
			<FaComment className='text-[#2575ED]' size={26} />
			<div className='text-sm font-medium'>{tags}</div>
		</div>
	)
}

export default TagBox
