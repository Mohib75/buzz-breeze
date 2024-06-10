import { createContext, useEffect, useState } from "react"
import {
	GithubAuthProvider,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateProfile,
} from "firebase/auth"

import axios from "axios"
import auth from "../firebase/firebase.config"
export const AuthContext = createContext(null)
// social auth provider
const googleProvider = new GoogleAuthProvider()
const githubProvider = new GithubAuthProvider()

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)

	// const createUser = (email, password) => {
	// 	setLoading(true)
	// 	return createUserWithEmailAndPassword(auth, email, password)
	// }

	// const signIn = (email, password) => {
	// 	setLoading(true)
	// 	return signInWithEmailAndPassword(auth, email, password)
	// }

	// const signInWithGoogle = () => {
	// 	setLoading(true)
	// 	return signInWithPopup(auth, googleProvider)
	// }

	// const resetPassword = (email) => {
	// 	setLoading(true)
	// 	return sendPasswordResetEmail(auth, email)
	// }

	// const logOut = async () => {
	// 	setLoading(true)
	// 	await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
	// 		withCredentials: true,
	// 	})
	// 	return signOut(auth)
	// }

	// const updateUserProfile = (name, photo) => {
	// 	return updateProfile(auth.currentUser, {
	// 		displayName: name,
	// 		photoURL: photo,
	// 	})
	// }
	// // Get token from server
	// const getToken = async (email) => {
	// 	const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, { email }, { withCredentials: true })
	// 	return data
	// }

	// // onAuthStateChange
	// useEffect(() => {
	// 	const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
	// 		setUser(currentUser)
	// 		if (currentUser) {
	// 			getToken(currentUser.email)
	// 		}
	// 		setLoading(false)
	// 	})
	// 	return () => {
	// 		return unsubscribe()
	// 	}
	// }, [])

	const createUser = (email, password) => {
		setLoading(true)
		return createUserWithEmailAndPassword(auth, email, password)
	}

	const signIn = (email, password) => {
		setLoading(true)
		return signInWithEmailAndPassword(auth, email, password)
	}

	// google sign in
	const googleSignIn = () => {
		setLoading(true)
		return signInWithPopup(auth, googleProvider)
	}

	// github sign in
	const githubSignIn = () => {
		setLoading(true)
		return signInWithPopup(auth, githubProvider)
	}

	const resetPassword = (email) => {
		setLoading(true)
		return sendPasswordResetEmail(auth, email)
	}

	const logOut = async () => {
		setLoading(true)
		await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
			withCredentials: true,
		})
		return signOut(auth)
	}

	const updateUserProfile = (name, photo) => {
		return updateProfile(auth.currentUser, {
			displayName: name,
			photoURL: photo,
		})
	}
	// Get token from server
	const getToken = async (email) => {
		const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, { email }, { withCredentials: true })
		return data
	}

	// save user
	const saveUser = async (user) => {
		const currentUser = {
			email: user?.email,
			role: "guest",
			status: "Verified",
			badge: "Bronze",
		}
		const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/user`, currentUser)
		return data
	}

	// onAuthStateChange
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser)
			if (currentUser) {
				getToken(currentUser.email)
				saveUser(currentUser)
			}
			setLoading(false)
		})
		return () => {
			return unsubscribe()
		}
	}, [])

	const authInfo = {
		user,
		loading,
		setLoading,
		createUser,
		signIn,
		googleSignIn,
		githubSignIn,
		resetPassword,
		logOut,
		updateUserProfile,
	}

	return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
}

export default AuthProvider
