import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebase";

export const doCreateUserWithEmailAndPasword = async (email: string, password: string) => {
	return createUserWithEmailAndPassword(auth, email, password)
}

export const doSignInWithEmailAndPassword = (email: string, password: string) => {
	return signInWithEmailAndPassword(auth, email, password);
}

export const doSignInWithGoogle = async () => {
	const result = await signInWithPopup(auth, googleProvider);
	result.user
	return result;
}

export const doSignOut = () => {
	return auth.signOut();
}