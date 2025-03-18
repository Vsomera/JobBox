import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, } from "firebase/auth";
import { auth, googleProvider } from "./firebase";

export const doCreateUserWithEmailAndPassword = async (email: string, password: string) => {
	try {
		await createUserWithEmailAndPassword(auth, email, password)
	} catch (err) {
		console.log(err)
	}
}

export const doSignInWithEmailAndPassword = async (email: string, password: string) => {
	try {
		await signInWithEmailAndPassword(auth, email, password);
	} catch (err) {
		console.log(err)
	}
}

export const doSignInWithGoogle = async () => {
	try {
		await signInWithPopup(auth, googleProvider);
	} catch (err) {
		console.log(err)
	}
}

// TODO : Implement sign-in with github

export const doSignOut = () => {
	return auth.signOut();
}
