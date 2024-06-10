import { NavLink } from "react-router-dom"

const MenuItem = ({ label, address, icon: Icon }) => {
	return (
		<NavLink
			to={address}
			end
			className={({ isActive }) =>
				`flex items-center px-4 py-2 my-5 transition-all duration-300 transform hover:bg-[#b9b9cb] rounded-2xl hover:text-[#222038] ${
					isActive ? "bg-[#b9b9cb]  text-[#222038]" : "text-[#b9b9c8]"
				}`
			}>
			<Icon className='w-5 h-5' />

			<span className='mx-4 font-medium'>{label}</span>
		</NavLink>
	)
}

export default MenuItem
