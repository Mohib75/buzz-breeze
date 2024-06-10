import { Helmet } from "react-helmet-async"
import Banner from "../components/home/Banner"
import Tags from "../components/tags/Tags"
import Post from "../components/home/Post"
import { useQuery } from "@tanstack/react-query"
import useAxiosCommon from "../hooks/useAxiosCommon"
import Announcement from "../components/home/Announcement"

const Home = () => {
	const axiosCommon = useAxiosCommon()
	const { data: announcements = [] } = useQuery({
		queryKey: ["announcements"],

		queryFn: async () => {
			const { data } = await axiosCommon.get(`/announcements`)
			return data
		},
	})

	return (
		<>
			<Helmet>
				<title>BuzzBreeze</title>
			</Helmet>

			<Banner />

			<Tags />

			<Post />

			{announcements && announcements.length > 0 ? <Announcement announcements={announcements} /> : ""}
		</>
	)
}

export default Home
