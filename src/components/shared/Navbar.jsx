import { Link, NavLink } from "react-router-dom"
import Button from "../Button"
import useAuth from "../../hooks/useAuth"
import { useQuery } from "@tanstack/react-query"
import useAxiosCommon from "../../hooks/useAxiosCommon"

const Navbar = () => {
	const { logOut, user } = useAuth()
	const axiosCommon = useAxiosCommon()

	const { data: announcementsCount = "" } = useQuery({
		queryKey: ["announcementsCount"],
		queryFn: async () => {
			const { data } = await axiosCommon(`/announcementsCount`)
			// console.log("usersCount:", data)
			return data.count
		},
	})

	return (
		<div className={`navbar bg-base-100 mt-6 justify-center xl:justify-normal`}>
			<div className='navbar-start !justify-center xl:!justify-start'>
				<div className='dropdown'>
					<div tabIndex={0} role='button' className='btn btn-ghost xl:hidden'>
						<svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h8m-8 6h16' />
						</svg>
					</div>
					<ul tabIndex={0} className='menu menu-sm dropdown-content mt-3 z-40 p-2 shadow bg-[#313046] rounded-2xl w-56 items-center gap-2'>
						<NavLink
							className={({ isActive }) =>
								isActive
									? "text-white hover:scale-110 transform transition-all duration-500 leading-5 px-4 py-2 font-bold"
									: "text-white leading-5 hover:scale-110 transform transition-all duration-500 px-4 py-2"
							}
							to='/'>
							Home
						</NavLink>
						<NavLink
							className={({ isActive }) =>
								isActive
									? "text-white hover:scale-110 transform transition-all duration-500 leading-5 px-4 py-2 font-bold"
									: "text-white leading-5 hover:scale-110 transform transition-all duration-500 px-4 py-2"
							}
							to='/membership'>
							Membership
						</NavLink>

						{user ? (
							<>
								<div className='indicator text-[#b9b9c8]'>
									<svg xmlns='http://www.w3.org/2000/svg' className='h-8 w-8' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
										/>
									</svg>
									<span className='badge badge-md badge-primary indicator-item bg-[#313046] text-[#b9b9c8]'>
										{[announcementsCount]}
									</span>
								</div>

								<div className='w-10 rounded-full' title={user?.displayName || "username not found"}>
									<img
										alt='profile pic'
										src={user?.photoURL || "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"}
									/>
								</div>

								<NavLink
									className={({ isActive }) => (isActive ? " leading-5 px-0 py-2 font-bold" : " leading-5 px-0 py-2")}
									to='/dashboard'>
									Dashboard
								</NavLink>

								<li className='flex items-center mt-4'>
									<Button
										className='btn rounded-full bg-[#0F172A] border-solid border-[1px] border-gray-300 text-white hover:bg-[#2575ED] text-sm w-[120px] font-semibold leading-5 hover:scale-105 transform transition-all duration-500'
										onClick={logOut}>
										Logout
									</Button>
								</li>
							</>
						) : (
							<Link to='/login'>
								<Button className='btn rounded-full border-solid border-[1px] border-gray-300 w-[120px] text-lg font-semibold leading-5 hover:border-gray-300 hover:scale-105 transform transition-all duration-500'>
									Join us
								</Button>
							</Link>
						)}
					</ul>
				</div>

				<div className='flex gap-4 items-center'>
					<Link to='/'>
						<img src='/Images/logo.png' className='object-cover' width='100' height='100' alt='' />
					</Link>
					<h1 className='text-xl sm:text-3xl font-bold leading-8 text-center xl:text-left text-white hidden xl:flex'>BuzzBreeze</h1>
				</div>
			</div>
			<div className='navbar-center hidden xl:flex'>
				<ul className='menu menu-horizontal gap-8 items-center'>
					<NavLink
						className={({ isActive }) =>
							isActive
								? "hover:scale-110 transform transition-all duration-500 text-lg leading-5 px-4 py-2 font-bold text-white" // #CBB26A]
								: "text-lg leading-5 hover:scale-110 transform transition-all duration-500 px-4 py-2 text-[#b9b9c8]"
						}
						to='/'>
						Home
					</NavLink>

					<NavLink
						className={({ isActive }) =>
							isActive
								? "hover:scale-110 transform transition-all duration-500 text-lg leading-5 px-4 py-2 font-bold text-white"
								: "text-lg leading-5 hover:scale-110 transform transition-all duration-500 px-4 py-2 text-[#b9b9c8]"
						}
						to='/membership'>
						Membership
					</NavLink>
				</ul>
			</div>
			{user ? (
				<div className='navbar-end gap-4 hidden xl:flex'>
					<div className='indicator text-[#b9b9c8]'>
						<svg xmlns='http://www.w3.org/2000/svg' className='h-8 w-8' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
							/>
						</svg>
						<span className='badge badge-md badge-primary indicator-item bg-[#313046] text-[#b9b9c8]'>{[announcementsCount]}</span>
					</div>

					<div className='dropdown dropdown-end z-30'>
						<div tabIndex={0} role='button' className='btn btn-ghost btn-circle avatar'>
							<div className='w-10 rounded-full' title={user?.displayName || "username not found"}>
								<img
									alt='profile pic'
									src={user?.photoURL || "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"}
								/>
							</div>
						</div>
						<ul
							tabIndex={0}
							className='z-40 p-4 shadow menu menu-sm dropdown-content bg-[#313046] text-white rounded-2xl w-56 items-center'>
							<p className='leading-5 px-0 py-2'>{user?.displayName}</p>
							<NavLink
								className={({ isActive }) => (isActive ? " leading-5 px-0 py-2 font-bold" : " leading-5 px-0 py-2")}
								to='/dashboard'>
								Dashboard
							</NavLink>

							<li className='flex items-center mt-4'>
								<Button
									className='btn rounded-full bg-[#0F172A] border-solid border-[1px] border-gray-300 text-white hover:bg-[#2575ED] text-sm w-[120px] font-semibold leading-5 hover:scale-105 transform transition-all duration-500'
									onClick={logOut}>
									Logout
								</Button>
							</li>
						</ul>
					</div>
				</div>
			) : (
				<div className='navbar-end gap-8 hidden lg:flex'>
					<div className='indicator text-[#b9b9c8]'>
						<svg xmlns='http://www.w3.org/2000/svg' className='h-8 w-8' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
							/>
						</svg>
						<span className='badge badge-md badge-primary indicator-item bg-[#313046] text-[#b9b9c8]'>{[announcementsCount]}</span>
					</div>

					<Link to='/register'>
						<Button className='btn rounded-full border-none bg-[#313046] text-white w-[120px] text-lg font-semibold leading-5 hover:bg-[#2575ED] hover:scale-105 transform transition-all duration-500'>
							Join us
						</Button>
					</Link>
				</div>
			)}
		</div>
	)
}

export default Navbar
