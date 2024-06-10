import MenuItem from "./MenuItem"
import { MdOutlineForum, MdPostAdd } from "react-icons/md"

const GuestMenu = () => {
	return (
		<>
			{/* add post */}
			<MenuItem label='Add Post' address='/dashboard/addPost' icon={MdPostAdd} />
			{/* my post */}
			<MenuItem label='My Post' address='/dashboard/myPost' icon={MdOutlineForum} />
		</>
	)
}

export default GuestMenu
