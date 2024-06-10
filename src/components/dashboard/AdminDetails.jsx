import { useQuery } from "@tanstack/react-query"

import useAuth from "../../hooks/useAuth"
import useAxiosCommon from "../../hooks/useAxiosCommon"
import useAxiosSecure from "../../hooks/useAxiosSecure"

const AdminDetails = () => {
	const { user, loading } = useAuth()
	const axiosCommon = useAxiosCommon()
	const axiosSecure = useAxiosSecure()

	const { data: usersCount = "" } = useQuery({
		queryKey: ["usersCount"],
		enabled: !loading && !!user?.email,
		queryFn: async () => {
			const { data } = await axiosSecure(`/usersCount`)
			// console.log("usersCount:", data)
			return data.count
		},
	})

	const { data: postsCount = "" } = useQuery({
		queryKey: ["postsCount"],
		enabled: !loading && !!user?.email,
		queryFn: async () => {
			const { data } = await axiosCommon(`/postsCount`)
			// console.log("postsCount:", data)
			return data.count
		},
	})

	const { data: commentsCount = "" } = useQuery({
		queryKey: ["commentsCount"],
		enabled: !loading && !!user?.email,
		queryFn: async () => {
			const { data } = await axiosSecure(`/commentsCount`)
			// console.log("commentsCount:", data)
			return data.count
		},
	})

	return (
		<>
			<p className='text-[#B9B9C8]'>Number of posts : {[postsCount]} </p>
			<p className='text-[#B9B9C8]'>Number of comments : {[commentsCount]} </p>
			<p className='text-[#B9B9C8]'>Number of users : {[usersCount]} </p>
		</>
	)
}

export default AdminDetails
