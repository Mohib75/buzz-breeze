import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { HelmetProvider } from "react-helmet-async"
import { RouterProvider } from "react-router-dom"
import { router } from "./routes/Routes.jsx"
import { Toaster } from "react-hot-toast"
import AuthProvider from "./providers/AuthProvider.jsx"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<HelmetProvider>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<RouterProvider router={router} />
					<Toaster />
				</AuthProvider>
			</QueryClientProvider>
		</HelmetProvider>
	</React.StrictMode>
)
