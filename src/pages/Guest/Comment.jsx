import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import useAxiosSecure from "../../hooks/useAxiosSecure"
import CommentDataRow from "../../components/dashboard/tableRows/CommentDataRow"
import { Helmet } from "react-helmet-async"

const Comment = () => {
	const { title } = useParams()
	const axiosSecure = useAxiosSecure()
	console.log(title)
	// get the comment data
	const { data: comments = [], refetch } = useQuery({
		queryKey: ["comment", title],
		queryFn: async () => {
			const { data } = await axiosSecure.get(`/comment/${title}`)
			return data
		},
		onSuccess: () => {
			refetch()
		},
	})

	return (
		<>
			<Helmet>
				<title>BuzzBreeze || Comments</title>
			</Helmet>

			<div className='container mx-auto px-4 sm:px-8'>
				<div className='py-8'>
					<div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
						<div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
							<table className='min-w-full leading-normal'>
								<thead>
									<tr>
										<th
											scope='col'
											className='px-5 py-3 bg-[#313046] text-[#b9b9c8]  border-b border-gray-200 text-left text-sm uppercase font-normal'>
											Email
										</th>
										<th
											scope='col'
											className='px-5 py-3 bg-[#313046] text-[#b9b9c8]  border-b border-gray-200 text-left text-sm uppercase font-normal'>
											Comment
										</th>
										<th
											scope='col'
											className='px-5 py-3 bg-[#313046] text-[#b9b9c8]  border-b border-gray-200 text-left text-sm uppercase font-normal'>
											Feedback
										</th>
										{/* <th
											scope='col'
											className='px-5 py-3 bg-[#313046] text-[#b9b9c8]  border-b border-gray-200 text-left text-sm uppercase font-normal'></th> */}
									</tr>
								</thead>
								<tbody>
									{/* Table Row Data */}

									{comments.map((comment, index) => (
										<CommentDataRow key={index} comment={comment} />
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Comment
