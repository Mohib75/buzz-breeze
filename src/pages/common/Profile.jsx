import { FaMedal } from "react-icons/fa"
import useAuth from "../../hooks/useAuth"
import useRole from "../../hooks/useRole"
import LoadingSpinner from "../../components/shared/LoadingSpinner"
import AddTag from "../../components/dashboard/form/AddTag"
import AdminDetails from "../../components/dashboard/AdminDetails"
import useBadge from "../../hooks/useBadge"
import AdminStats from "../../components/dashboard/AdminStats"
import { Helmet } from "react-helmet-async"

const Profile = () => {
	const { user, loading } = useAuth() || {}
	const [role, isLoading] = useRole()
	const [badge] = useBadge()

	if (isLoading || loading) return <LoadingSpinner />
	return (
		<>
			<Helmet>
				<title>BuzzBreeze || Profile</title>
			</Helmet>
			<div className='flex flex-col gap-12 mt-8'>
				<div className='avatar self-center'>
					<div className='w-60 rounded-full'>
						<img src={user?.photoURL || "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} />
					</div>
					{role === "guest" ? (
						<span className={`absolute ${badge === "Bronze" ? "text-[#CD7F32]" : "text-[#FCB434]"} right-12`}>
							<FaMedal className='size-12' />
						</span>
					) : (
						""
					)}
				</div>

				<div className='flex flex-col gap-2 items-center'>
					<h2 className='text-white text-2xl font-bold'>{user?.displayName}</h2>
					<p className='text-[#B9B9C8]'>{user?.email}</p>
					{role === "guest" ? <p className='text-[#B9B9C8]'>Badge : {badge}</p> : ""}

					<p className='text-[#B9B9C8]'>Role : {role}</p>
					{role === "admin" && <AdminDetails />}
				</div>

				{role === "admin" && (
					<div className='flex flex-col justify-between w-full xl:flex-row'>
						<div className='hidden md:flex md:w-1/2'>
							<AdminStats />
						</div>
						<div className='w-full md:w-1/2 self-center'>
							<AddTag />
						</div>
					</div>
				)}
			</div>
		</>
	)
}

export default Profile
