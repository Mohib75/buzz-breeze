import { useEffect, useState } from "react"
import useAxiosSecure from "./useAxiosSecure"

const usePost = (search) => {
	const [posts, setPosts] = useState([])
	const axiosSecure = useAxiosSecure()

	useEffect(() => {
		axiosSecure(`/posts?search=${search}`).then((res) => setPosts(res.data))
	}, [search])

	return posts
}

export default usePost
