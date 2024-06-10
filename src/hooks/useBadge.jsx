import useAuth from "./useAuth"
import useAxiosSecure from "./useAxiosSecure"
import { useQuery } from "@tanstack/react-query"

const useBadge = () => {
	const { user, loading } = useAuth()
	const axiosSecure = useAxiosSecure()

	const { data: badge = "", isLoading } = useQuery({
		queryKey: ["badge", user?.email],
		enabled: !loading && !!user?.email,
		queryFn: async () => {
			const { data } = await axiosSecure(`/user/${user?.email}`)
			return data.badge
		},
	})

	//   Fetch user info using logged in user email
	return [badge, isLoading]
}

export default useBadge
