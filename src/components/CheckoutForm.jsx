import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import "./CheckoutForm.css"
import { ImSpinner9 } from "react-icons/im"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import useAxiosSecure from "../hooks/useAxiosSecure"
import useAuth from "../hooks/useAuth"
import Button from "./Button"
const CheckoutForm = ({ price }) => {
	const stripe = useStripe()
	const elements = useElements()
	const axiosSecure = useAxiosSecure()
	const navigate = useNavigate()
	const { user } = useAuth()
	const [clientSecret, setClientSecret] = useState()
	const [cardError, setCardError] = useState("")
	const [processing, setProcessing] = useState(false)

	useEffect(() => {
		// fetch client secret
		if (price && price > 1) {
			getClientSecret({ price: price })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	//   get clientSecret
	const getClientSecret = async (price) => {
		const { data } = await axiosSecure.post(`/create-payment-intent`, price)
		console.log("clientSecret from server--->", data)
		setClientSecret(data.clientSecret)
	}

	const handleSubmit = async (event) => {
		// Block native form submission.
		event.preventDefault()
		setProcessing(true)
		if (!stripe || !elements) {
			// Stripe.js has not loaded yet. Make sure to disable
			// form submission until Stripe.js has loaded.
			return
		}

		// Get a reference to a mounted CardElement. Elements knows how
		// to find your CardElement because there can only ever be one of
		// each type of element.
		const card = elements.getElement(CardElement)

		if (card == null) {
			return
		}

		// Use your card Element with other Stripe.js APIs
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: "card",
			card,
		})

		if (error) {
			console.log("[error]", error)
			setCardError(error.message)
			setProcessing(false)
			return
		} else {
			console.log("[PaymentMethod]", paymentMethod)
			setCardError("")
		}

		// confirm payment
		const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: card,
				billing_details: {
					email: user?.email,
					name: user?.displayName,
				},
			},
		})

		if (confirmError) {
			console.log(confirmError)
			setCardError(confirmError.message)
			setProcessing(false)
			return
		}

		if (paymentIntent.status === "succeeded") {
			console.log(paymentIntent)
			// // 1. Create payment info object
			const paymentInfo = {
				email: user?.email,
				transactionId: paymentIntent.id,
				badge: "Gold",
				status: "Paid",
			}
			// delete paymentInfo._id
			console.log(paymentInfo)
			try {
				// // 2. save payment info in booking collection (db)
				// const { data } = await axiosSecure.post("/booking", paymentInfo)
				// console.log(data)

				// 3. change room status to booked in db
				const { data } = await axiosSecure.patch("/user", paymentInfo)
				console.log(data) // Optional: log server response

				toast.success("Membership Updated Successfully")
				navigate("/dashboard/myPost")
			} catch (err) {
				console.error("Error updating user data:", err)
				toast.error("An error occurred. Please try again.")
			}
		}

		setProcessing(false)
	}

	return (
		<>
			{" "}
			<form onSubmit={handleSubmit}>
				<CardElement
					options={{
						style: {
							base: {
								fontSize: "16px",
								color: "#424770",
								"::placeholder": {
									color: "#aab7c4",
								},
							},
							invalid: {
								color: "#9e2146",
							},
						},
					}}
				/>

				<div className='flex mt-2 justify-around'>
					<Button
						disabled={!stripe || !clientSecret || processing}
						type='submit'
						className='inline-flex justify-center items-center px-4 py-2 text-sm text-[#2B2938] hover:scale-105 transition-all duration-500 font-bold bg-[#AFACBE] hover:bg-[#AFACBE] btn rounded-lg border-none drop-shadow-xl'>
						{processing ? <ImSpinner9 className='animate-spin m-auto' size={24} /> : `Pay ${price}`}
					</Button>
					<form method='dialog'>
						{/* if there is a button in form, it will close the modal */}
						<Button className='text-[#2B2938] hover:scale-105 transition-all duration-500 font-bold bg-[#AFACBE] hover:bg-[#AFACBE] btn rounded-lg border-none drop-shadow-xl'>
							Cancel
						</Button>
					</form>
				</div>
			</form>
			{cardError && <p className='text-red-600 ml-8'>{cardError}</p>}
		</>
	)
}

export default CheckoutForm
