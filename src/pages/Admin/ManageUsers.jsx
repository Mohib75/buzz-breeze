import { Helmet } from "react-helmet-async"
import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "../../hooks/useAxiosSecure"
import LoadingSpinner from "../../components/shared/LoadingSpinner"
import UserDataRow from "../../components/dashboard/tableRows/UserDataRow"
const ManageUsers = () => {
	const axiosSecure = useAxiosSecure()
	//   Fetch users Data
	const {
		data: users = [],
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["users"],
		queryFn: async () => {
			const { data } = await axiosSecure(`/users`)
			return data
		},
	})

	console.log(users)
	if (isLoading) return <LoadingSpinner />
	return (
		<>
			<div className='container mx-auto px-4 sm:px-8'>
				<Helmet>
					<title>BuzzBreeze || Manage Users</title>
				</Helmet>
				<div className='py-8'>
					<div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
						<div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
							<table className='min-w-full leading-normal'>
								<thead>
									<tr>
										<th
											scope='col'
											className='px-5 py-3 bg-[#313046] text-white border-b font-bold border-gray-200 text-left text-sm uppercase'>
											Email
										</th>

										<th
											scope='col'
											className='px-5 py-3 bg-[#313046] text-white border-b font-bold border-gray-200 text-left text-sm uppercase'>
											Role
										</th>

										<th
											scope='col'
											className='px-5 py-3 bg-[#313046] text-white border-b font-bold border-gray-200 text-left text-sm uppercase'>
											Action
										</th>
									</tr>
								</thead>
								<tbody>
									{users.map((user, index) => (
										<UserDataRow key={index} user={user} refetch={refetch} />
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

export default ManageUsers
