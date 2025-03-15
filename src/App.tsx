import './App.css';
import { Explore } from './pages/Explore/Explore';
import { Auth } from './pages/Auth/Auth';
import { Tracker } from './pages/Tracker/Tracker';
import { Header } from './components/Header/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
	return (
			<div>
				<Router>
					<Header />
					<Routes>
						<Route path='/' element={<Explore />}></Route>
						<Route path='/auth' element={<Auth />}></Route>
						<Route path='/tracker' element={<Tracker />}></Route>
					</Routes>
				</Router>
			</div>
);
}

export default App;
