import { useQuery } from "@tanstack/react-query"
import useAxiosCommon from "../../hooks/useAxiosCommon"
import TagBox from "./TagBox"

const Tags = () => {
	const axiosCommon = useAxiosCommon()
	// const [loading, setLoading] = useState(false)

	const { data: tags = [] } = useQuery({
		queryKey: ["tags"],

		queryFn: async () => {
			const { data } = await axiosCommon.get(`/tags`)
			return data
		},
	})

	return (
		<div className='flex flex-col gap-8 bg-[#313046] rounded-2xl mb-12 py-4'>
			<h2 className='text-4xl text-white font-bold self-center'>Tags</h2>
			<div className='overflow-x-auto'>
				<div className='pt-4 flex items-center justify-between'>
					{tags.map((tag, index) => (
						<TagBox key={index} tags={tag.tags} />
					))}
				</div>
			</div>
		</div>
	)
}

export default Tags
