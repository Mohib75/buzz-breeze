import { useQuery } from "@tanstack/react-query"
import useAuth from "../../hooks/useAuth"
import useAxiosCommon from "../../hooks/useAxiosCommon"
import useAxiosSecure from "../../hooks/useAxiosSecure"
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts"

const AdminStats = () => {
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

	const data = [
		{ name: "Users", value: usersCount },
		{ name: "Posts", value: postsCount },
		{ name: "Comments", value: commentsCount },
	]

	const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

	return (
		<div>
			<PieChart width={600} height={600}>
				<Pie
					data={data}
					cx={350}
					cy={300}
					labelLine={false}
					label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
					outerRadius={150}
					fill='#8884d8'
					dataKey='value'>
					{data.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
					))}
				</Pie>
				<Tooltip />
				<Legend />
			</PieChart>
		</div>
	)
}

export default AdminStats
