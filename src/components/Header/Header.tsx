import styles from './header.module.css';
export const Header = () => {
	return (
		<>
			<div id={styles.header_container}>
				<div id={styles.logo_title}></div>
				<ul id={styles.nav_bar}>
					<li className={styles.nav_icons}>1</li>
					<li className={styles.nav_icons}>2</li>
					<li className={styles.nav_icons}>3</li>
				</ul>
			</div>
		</>
	);
};
