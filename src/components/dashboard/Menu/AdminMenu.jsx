import { TfiAnnouncement } from "react-icons/tfi"
import MenuItem from "./MenuItem"
import { FaUserCog } from "react-icons/fa"
import { GoReport } from "react-icons/go"

const AdminMenu = () => {
	return (
		<>
			{/* Profile */}
			<MenuItem label='Manage Users' address='/dashboard/manageUsers' icon={FaUserCog} />
			{/* announcement */}
			<MenuItem label='Announcements' address='/dashboard/makeAnnouncement' icon={TfiAnnouncement} />
			{/* reported comments */}
			<MenuItem label='Reports' address='/dashboard/reportedComments' icon={GoReport} />
		</>
	)
}

export default AdminMenu
