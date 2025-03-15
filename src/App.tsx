import './App.css';
import { Explore } from './pages/Explore/Explore';
import { Login } from './pages/Login/Login';
import { Tracker } from './pages/Tracker/Tracker';
import { Register } from './pages/Register/Register'
import { Header } from './components/Header/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
	return (
			<div>
				<Router>
					<Header />
					<Routes>
						<Route path='/' element={<Explore />}></Route>
						<Route path='/tracker' element={<Tracker />}></Route>
						<Route path='/login' element={<Login />}></Route>
						<Route path="/register" element={<Register />}></Route>
					</Routes>
				</Router>
			</div>
);
}

export default App;
