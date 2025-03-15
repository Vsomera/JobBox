import { 
	createUserWithEmailAndPassword, 
	signInWithEmailAndPassword, 
	signInWithPopup,
	UserCredential } from "firebase/auth";

import { auth, db, googleProvider } from "./firebase";
import { doc, setDoc } from "firebase/firestore"


export const doCreateUserWithEmailAndPassword = async (email: string, password: string) => {
	try {
		const newUser = await createUserWithEmailAndPassword(auth, email, password)
		await addUsertoDb(newUser)
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
		const res = await signInWithPopup(auth, googleProvider);
		await addUsertoDb(res)
	} catch (err) {
		console.log(err)
	}
}


const addUsertoDb = async (userInfo: UserCredential) => {
    try {
        // adds a new user to firestore user database
        const user = userInfo.user

        await setDoc(doc(db, "users", user.uid), {
            // adds a document with the user data
            uid: user.uid,
            email: user.email,
        })

    } catch (err: unknown) {
		console.log(err)
    }
}

export const doSignOut = () => {
	return auth.signOut();
}