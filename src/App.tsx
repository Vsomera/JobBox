import './App.css';
import { Explore } from './pages/Explore/Explore';
import { Login } from './pages/Login/Login';
import { Tracker } from './pages/Tracker/Tracker';
import { Register } from './pages/Register/Register';
import { Posting } from './pages/Posting/Posting';
import { Header } from './components/Header/Header';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import { UserContext } from './contexts/userContext';
import { useContext } from 'react';

function App() {
	const { user } = useContext(UserContext);

	return (
		<div className='h-full w-full fixed bottom-0'>
			<Router>
				{user && <Header />}
				<Routes>
					<Route
						path='/'
						element={user ? <Explore /> : <Navigate to='/login' />}
					/>
					<Route
						path='/tracker'
						element={user ? <Tracker /> : <Navigate to='/login' />}
					/>

					<Route
						path='/login'
						element={!user ? <Login /> : <Navigate to='/' />}
					/>
					<Route
						path='/register'
						element={!user ? <Register /> : <Navigate to='/' />}
					/>
					<Route
						path='/posting/:jobId'
						element={!user ? <Posting /> : <Navigate to='/login' />}
					/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
