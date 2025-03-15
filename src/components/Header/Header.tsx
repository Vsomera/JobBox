import { doSignOut } from '../../config/auth';
import styles from './header.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export const Header = () => {

	const navigate = useNavigate();

	return (
		<>
			<div id={styles.header_root}>
				<div id={styles.header_container}>
					<div id={styles.logo_title} className='items-center'>
						<img
							src='../../../public/logo.svg'
							alt=''
							id={styles.logo}
						/>
						<p>JobBox.io</p>
					</div>
					<ul id={styles.nav_bar}>
						<li className={styles.nav_icons}>
							<Link to='/tracker'>
								<img
									src='../../../public/list.png'
									alt=''
									className={styles.icons}
								/>
							</Link>
						</li>
						<li className={styles.nav_icons}>
							<Link to='/'>
								<img
									src='../../../public/search.png'
									alt=''
									className={styles.icons}
								/>
							</Link>
						</li>
						<li className={styles.nav_icons}>
							<div onClick={ async () => {
								try {
									await doSignOut()
									navigate("/login")
								} catch (err) {
									console.log(err)
								}
							}}>
								<img
									src='../../../public/profile.png'
									alt=''
									className={styles.icons}
								/>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};
