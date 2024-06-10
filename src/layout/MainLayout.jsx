import { Outlet, ScrollRestoration } from "react-router-dom"

// import Footer from "../components/Footer"
import Navbar from "../components/shared/Navbar"
import Footer from "../components/shared/Footer"

const MainLayout = () => {
	return (
		<>
			<div className='container mx-auto'>
				<Navbar />
				<Outlet />
				<ScrollRestoration />
			</div>
			<Footer />
		</>
	)
}

export default MainLayout
