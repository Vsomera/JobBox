import { Logout } from '../../assets/logout';
import styles from './header.module.css';
import { Link } from 'react-router-dom';

export const Header = () => {
	return (
		<>
			<div id={styles.header_root}>
				<div id={styles.header_container}>
					<div id={styles.logo_title} className='items-center'>
						<img src='/logo.svg' alt='' id={styles.logo} />
						<p>JobBox.io</p>
					</div>
					<ul id={styles.nav_bar}>
						<li className={styles.nav_icons}>
							<Link to='/tracker'>
								<img
									src='/list.png'
									alt=''
									className={styles.icons}
								/>
							</Link>
						</li>
						<li className={styles.nav_icons}>
							<Link to='/'>
								<img
									src='/search.png'
									alt=''
									className={styles.icons}
								/>
							</Link>
						</li>
						<li className={styles.nav_icons}>
							<Link to='/login'>
								<Logout height='30px' width='30px' />
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};
