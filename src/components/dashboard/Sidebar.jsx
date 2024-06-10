import { useState } from "react"
import { GrLogout } from "react-icons/gr"
import { AiOutlineBars } from "react-icons/ai"
import { Link } from "react-router-dom"
import Button from "../Button"
import useAuth from "../../hooks/useAuth"
import useRole from "../../hooks/useRole"
import GuestMenu from "./Menu/GuestMenu"
import AdminMenu from "./Menu/AdminMenu"
import MenuItem from "./Menu/MenuItem"
import { CgProfile } from "react-icons/cg"

const Sidebar = () => {
	const { logOut } = useAuth()
	const [isActive, setActive] = useState(false)
	const [role, isLoading] = useRole()
	console.log(role, isLoading)

	// Sidebar Responsive Handler
	const handleToggle = () => {
		setActive(!isActive)
	}

	return (
		<>
			{/* Small Screen Navbar */}
			<div className='bg-transparent text-gray-800 flex justify-between md:hidden'>
				<div className='w-1/2 '>
					<Link to='/'>
						<img src='/Images/logo.png' className='object-cover' width='100' height='100' alt='' />
					</Link>
				</div>

				<button onClick={handleToggle} className='mobile-menu-button p-4 focus:outline-none focus:bg-transparent bg-transparent'>
					<AiOutlineBars className='h-5 w-5 bg-transparent text-[#b9b9c8]' />
				</button>
			</div>

			{/* Sidebar */}
			<div
				className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-[#313046] w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
					isActive && "-translate-x-full"
				}  md:translate-x-0  transition duration-200 ease-in-out`}>
				<div className='flex flex-col'>
					<div className='w-1/2 self-center'>
						<Link to='/'>
							<img src='/Images/logo.png' className='object-cover' width='100' height='100' alt='' />
						</Link>
					</div>

					{/* Nav Items */}

					{/*  Menu Items */}
					<nav>
						{/* Profile */}
						<MenuItem label='Profile' address='/dashboard' icon={CgProfile} />
						{role === "guest" && <GuestMenu />}
						{role === "admin" && <AdminMenu />}
					</nav>
				</div>

				<div>
					<hr />

					<Button
						onClick={logOut}
						className='flex w-full items-center px-4 py-2 mt-5 text-[#b9b9c8] hover:bg-[#b9b9cb] rounded-2xl hover:text-[#222038] transition-all duration-300 transform'>
						<GrLogout className='w-5 h-5' />

						<span className='mx-4 font-medium'>Logout</span>
					</Button>
				</div>
			</div>
		</>
	)
}

export default Sidebar
