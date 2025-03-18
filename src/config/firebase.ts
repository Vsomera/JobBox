import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

console.log('FIREBASE_API_KEY:', import.meta.env.VITE_FIREBASE_API_KEY);
console.log('FIREBASE_AUTHDOMAIN:', import.meta.env.VITE_FIREBASE_AUTHDOMAIN);
console.log('FIREBASE_PROJECTID:', import.meta.env.VITE_FIREBASE_PROJECTID);
console.log(
	'FIREBASE_STORAGEBUCKET:',
	import.meta.env.VITE_FIREBASE_STORAGEBUCKET
);
console.log(
	'FIREBASE_MESSAGINGSENDERID:',
	import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID
);
console.log('FIREBASE_APPID:', import.meta.env.VITE_FIREBASE_APPID);
console.log(
	'FIREBASE_MEASUREMENTID:',
	import.meta.env.VITE_FIREBASE_MEASUREMENTID
);

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
	appId: import.meta.env.VITE_FIREBASE_APPID,
	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const gitHubProvider = new GithubAuthProvider();
