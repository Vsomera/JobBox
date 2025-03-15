import './App.css';
import { Explore } from './pages/Explore/Explore';
import { Login } from './pages/Login/Login';
import { Tracker } from './pages/Tracker/Tracker';
import { Register } from './pages/Register/Register'
import { Header } from './components/Header/Header';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserContext } from './contexts/userContext';
import { useContext } from 'react';

function App() {
	interface ProtectedRouteProps {
		children: React.ReactNode
	  }
	
	  const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
		const { user } = useContext(UserContext)
	
		if (!user) {
		  // If a user is not logged in, redirect to the login page
		  return <Navigate to="/login" />
		}

		console.log(user)
	
		return <>{children}</>
	  }
	

	return (
			<div>
				<Router>
					<Header />
					<Routes>
						<Route path='/' element={<Explore />}></Route>
						<Route path='/tracker' element={<ProtectedRoute><Tracker /></ProtectedRoute>}></Route>
						<Route path='/login' element={<Login />}></Route>
						<Route path="/register" element={<Register />}></Route>
					</Routes>
				</Router>
			</div>
);
}

export default App;
