import { createBrowserRouter } from "react-router-dom"
import MainLayout from "../layout/MainLayout"
import Home from "../pages/Home"
import ErrorPage from "../components/ErrorPage"
import Register from "../pages/Register"
import Login from "../pages/Login"
import DashboardLayout from "../layout/DashboardLayout"
import PrivateRoute from "./PrivateRoute"
import Profile from "../pages/common/Profile"
import AdminRoute from "./AdminRoute"
import ManageUsers from "../pages/Admin/ManageUsers"
import AddAnnouncement from "../pages/Admin/AddAnnouncement"
import AddPost from "../pages/Guest/AddPost"
import Mypost from "../pages/Guest/Mypost"
import PostDetails from "../pages/PostDetails"
import Membership from "../pages/Membership"
import Comment from "../pages/Guest/Comment"
import Reports from "../pages/Admin/Reports"

export const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/",
				element: <Home />,
			},

			{
				path: "/membership",
				element: (
					<PrivateRoute>
						<Membership />
					</PrivateRoute>
				),
			},

			{
				path: "/post/:id",
				element: (
					<PrivateRoute>
						<PostDetails />
					</PrivateRoute>
				),
			},
		],
	},
	{
		path: "/register",
		element: <Register />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/login",
		element: <Login />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/dashboard",
		element: (
			<PrivateRoute>
				<DashboardLayout />
			</PrivateRoute>
		),
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: (
					<PrivateRoute>
						<Profile />
					</PrivateRoute>
				),
			},
			{
				path: "manageUsers",
				element: (
					<PrivateRoute>
						<AdminRoute>
							<ManageUsers />
						</AdminRoute>
					</PrivateRoute>
				),
			},
			{
				path: "makeAnnouncement",
				element: (
					<PrivateRoute>
						<AdminRoute>
							<AddAnnouncement />
						</AdminRoute>
					</PrivateRoute>
				),
			},
			{
				path: "reportedComments",
				element: (
					<PrivateRoute>
						<AdminRoute>
							<Reports />
						</AdminRoute>
					</PrivateRoute>
				),
			},
			{
				path: "addPost",
				element: (
					<PrivateRoute>
						<AddPost />
					</PrivateRoute>
				),
			},
			{
				path: "myPost",
				element: (
					<PrivateRoute>
						<Mypost />
					</PrivateRoute>
				),
			},
			{
				path: "comment/:title",
				element: (
					<PrivateRoute>
						<Comment />
					</PrivateRoute>
				),
			},
		],
	},
])
