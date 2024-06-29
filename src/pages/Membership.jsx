import { TiTick } from "react-icons/ti"
import Button from "../components/Button"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "../components/CheckoutForm"
import useAuth from "../hooks/useAuth"
import { loadStripe } from "@stripe/stripe-js"
import useBadge from "../hooks/useBadge"
import { useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { useEffect } from "react"

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

const Membership = () => {
	const { user } = useAuth()
	const [badge] = useBadge()
	const navigate = useNavigate()
	const price = 200

	useEffect(() => {
		if (badge === "Gold") navigate("/dashboard")
	}, [badge, navigate])

	return (
		<>
			<Helmet>
				<title>BuzzBreeze || Membership</title>
			</Helmet>
			<div className='flex flex-col gap-8 bg-[#313046] rounded-2xl h-[700px] items-center mt-8 mx-4 sm:mx-0'>
				<h2 className='text-2xl md:text-5xl text-white font-bold mt-12'>Choose Your Plan </h2>
				<div className='md:w-96 bg-[#222038] rounded-2xl p-12 mt-4 flex flex-col gap-6 mx-4'>
					<h3 className='text-5xl text-white font-bold'>${price}</h3>

					<p className='text-white md:text-2xl'>This is the best plan for all users</p>

					<div className='flex flex-col gap-4'>
						<div className='flex gap-4 items-center'>
							<TiTick />
							<p className='text-white md:text-lg ext-sm font-light'>Unlimited posts</p>
						</div>

						<div className='flex gap-4 items-center'>
							<TiTick />
							<p className='text-white md:text-lg ext-sm font-light'>Unlimited support</p>
						</div>

						<div className='flex gap-4 items-center'>
							<TiTick />
							<p className='text-white md:text-lg ext-sm font-light'>Own analytics platform</p>
						</div>
					</div>

					<Button
						className='btn rounded-full border-none bg-[#313046] text-white w-full text-lg font-semibold leading-5 hover:bg-[#2575ED] hover:scale-105 transform transition-all duration-500'
						onClick={() => document.getElementById("my_modal_5").showModal()}>
						Choose Plan
					</Button>

					<dialog id='my_modal_5' className='modal modal-bottom sm:modal-middle'>
						<div className='modal-box bg-[#313046]'>
							<h3 className='font-bold text-lg'>Name: {user?.displayName}</h3>
							<h3 className='font-bold text-lg'>Email: {user?.email}</h3>
							<h3 className='font-bold text-lg'>Price: $ {price}</h3>
							<p className='py-4'></p>

							<Elements stripe={stripePromise}>
								<CheckoutForm price={price} />
							</Elements>
						</div>
					</dialog>
				</div>
			</div>
		</>
	)
}

export default Membership
