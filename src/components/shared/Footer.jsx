import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa"
import { Link } from "react-router-dom"

const Footer = () => {
	return (
		<footer className='footer footer-center p-10 bg-[#313046] text-primary-content mt-20'>
			<nav className='grid grid-flow-col gap-4'>
				<Link to='/membership' className='link link-hover text-white'>
					Membership
				</Link>

				<Link to='/login' className='link link-hover text-white'>
					Login
				</Link>

				<Link to='/register' className='link link-hover text-white'>
					Register
				</Link>
			</nav>
			<aside>
				<h1 className='text-4xl font-bold text-white'>BuzzBreeze</h1>

				<p className='font-light leading-7 text-[#FFFFFF9E]'>
					BuzzBreeze Ltd. <br />
					Providing reliable service since 2023
				</p>

				<p className='text-[#FFFFFF9E]'>Copyright © 2024 - All right reserved</p>
			</aside>
			<nav>
				<div className='grid grid-flow-col gap-4'>
					<Link to='https://twitter.com/' target='_blank' className='hover:scale-110 transform transition-all duration-500'>
						<FaTwitter className='text-3xl text-[#1DA1F2]' />
					</Link>

					<Link to='https://web.facebook.com/' target='_blank' className='hover:scale-110 transform transition-all duration-500'>
						<FaFacebookF className='text-3xl text-[#4267B2]' />
					</Link>

					<Link to='https://www.youtube.com/' target='_blank' className='hover:scale-110 transform transition-all duration-500'>
						<FaYoutube className='text-3xl text-[#FF0000]' />
					</Link>
				</div>
			</nav>
		</footer>
	)
}

export default Footer
