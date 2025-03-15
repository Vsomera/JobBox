import { onAuthStateChanged } from "firebase/auth";
import { useState, createContext, useEffect } from "react";
import { auth } from "../config/firebase";

const AuthContext = createContext({currentUser: null,
	userLoggedIn: false,
	loading: true
  });

export function AuthProvider({ children }: any) {
	const [currentUser, setCurrentUser] = useState(null);
	const [userLoggedIn, setUserLoggedIn] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, initializeUser);
		return unsubscribe;
	}, [])

	async function initializeUser(user: any) {
		if (user) {
			setCurrentUser({ ...user });
			setUserLoggedIn(true);
		} else {
			setCurrentUser(null);
			setUserLoggedIn(false);
		}
		setLoading(false);
	}

	const value = {
		currentUser,
		userLoggedIn,
		loading
	}

	return  (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	)
}

export {AuthContext};
