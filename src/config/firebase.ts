import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyARY4AiDSX248BygFFS-mMkHlk3HlZDe04",
    projectId: "jobbox-68180",

};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)