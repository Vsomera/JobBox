import './App.css';
import { Explore } from './pages/Explore/Explore';
import { Tracker } from './pages/Tracker/Tracker';
import { Header } from './components/Header/Header';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { UserContext, UserContextProvider,  } from './contexts/userContext';
import { useContext, useEffect } from 'react';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';


function CheckLoginRoute({children} : any) {

	const navigate = useNavigate();
	const {  user} = useContext(UserContext);


	useEffect(() => {
		if (user === null) {
			navigate("/login");
		}
	})

	return (user === null) ? children : <Navigate to="/login"/>
}
function AppContent() {
	return (
			<div>
					<Header />
					<Routes>
						<Route path='/' element={<CheckLoginRoute>
							<Explore /> </CheckLoginRoute>}></Route>
						<Route path='/login' element={<Login />}></Route>
						<Route path="/register" element={<Register />}></Route>
						<Route path='/tracker' element={
          										<CheckLoginRoute>
            										<Tracker />
          										</CheckLoginRoute>
       											}></Route>

					</Routes>
			</div>
);
}

function App() {
	return (
		<UserContextProvider>
		  <Router>
			<AppContent />
		  </Router>
		</UserContextProvider>
	  );
}

export default App;