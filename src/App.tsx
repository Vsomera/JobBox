import './App.css';
import { Explore } from './pages/Explore/Explore';
import { Auth } from './pages/Auth/Auth';
import { Tracker } from './pages/Tracker/Tracker';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path='/' element={<Explore />}></Route>
					<Route path='/auth' element={<Auth />}></Route>
					<Route path='/tracker' element={<Tracker />}></Route>
				</Routes>
			</Router>
		</>
	);
}

export default App;
