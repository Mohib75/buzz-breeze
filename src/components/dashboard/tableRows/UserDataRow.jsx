import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import useAuth from "../../../hooks/useAuth"
import useAxiosSecure from "../../../hooks/useAxiosSecure"
import UpdateUserModal from "../../modal/updateUserModal"
import Button from "../../Button"
const UserDataRow = ({ user, refetch }) => {
	const { user: loggedInUser } = useAuth()

	const [isOpen, setIsOpen] = useState(false)
	const axiosSecure = useAxiosSecure()
	const { mutateAsync } = useMutation({
		mutationFn: async (role) => {
			const { data } = await axiosSecure.patch(`/users/update/${user?.email}`, role)
			return data
		},
		onSuccess: (data) => {
			refetch()
			console.log(data)
			toast.success("User role updated successfully!")
			setIsOpen(false)
		},
	})

	//   modal handler
	const modalHandler = async (selected) => {
		if (loggedInUser.email === user.email) {
			toast.error("Action Not Allowed")
			return setIsOpen(false)
		}

		const userRole = {
			role: selected,
			status: "Verified",
		}

		try {
			await mutateAsync(userRole)
		} catch (err) {
			console.log(err)
			toast.error(err.message)
		}
	}
	return (
		<tr>
			<td className='px-5 py-5 border-b bg-[#313046] text-[#b9b9c8] text-sm'>
				<p className='whitespace-no-wrap'>{user?.email}</p>
			</td>
			<td className='px-5 py-5 border-b bg-[#313046] text-[#b9b9c8] text-sm'>
				<p className='whitespace-no-wrap'>{user?.role}</p>
			</td>

			<td className='px-5 py-5 border-b bg-[#313046] text-[#b9b9c8] text-sm'>
				<Button
					onClick={() => setIsOpen(true)}
					className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-[#222038] leading-tight'>
					<span aria-hidden='true' className='absolute inset-0 bg-[#b9b9cb] rounded-full'></span>
					<span className='relative'>Update Role</span>
				</Button>
				{/* Update User Modal */}
				<UpdateUserModal isOpen={isOpen} setIsOpen={setIsOpen} modalHandler={modalHandler} user={user} />
			</td>
		</tr>
	)
}

export default UserDataRow
