import { useQuery } from "@tanstack/react-query"
import { Helmet } from "react-helmet-async"
import useAxiosSecure from "../../hooks/useAxiosSecure"
import ReportDataRow from "../../components/dashboard/tableRows/ReportDataRow"

const Reports = () => {
	const axiosSecure = useAxiosSecure()

	const { data: reports = [], refetch } = useQuery({
		queryKey: ["reports"],
		queryFn: async () => {
			const { data } = await axiosSecure.get(`/reports`)
			return data
		},
		onSuccess: () => {
			refetch()
		},
	})

	return (
		<>
			<Helmet>
				<title>BuzzBreeze || Reports</title>
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
											className='px-5 py-3 bg-[#313046] text-white  border-b border-gray-200 text-left text-sm uppercase font-bold'>
											Email
										</th>
										<th
											scope='col'
											className='px-5 py-3 bg-[#313046] text-white  border-b border-gray-200 text-left text-sm uppercase font-bold'>
											Comment
										</th>
										<th
											scope='col'
											className='px-5 py-3 bg-[#313046] text-white  border-b border-gray-200 text-left text-sm uppercase font-bold'>
											Feedback
										</th>
										{/* <th
											scope='col'
											className='px-5 py-3 bg-[#313046] text-[#b9b9c8]  border-b border-gray-200 text-left text-sm uppercase font-normal'></th> */}
									</tr>
								</thead>
								<tbody>
									{/* Table Row Data */}

									{reports.map((report, index) => (
										<ReportDataRow key={index} report={report} />
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

export default Reports
