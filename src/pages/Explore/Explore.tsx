import { Header } from '../../components/Header/Header';
import styles from './explore.module.css';

export const Explore = () => {
	return (
		<>
			<Header />
			<div id={styles.explore_root}>
				<main>
					<h1>Search for Jobs</h1>
					<div id={styles.search}>
						<img
							src='../../../public/search_bl.png'
							alt=''
							className={styles.search_icons}
						/>
						<input
							type='text'
							placeholder='Add a job title'
							className={styles.search_boxes}
						/>
						<img
							src='../../../public/map_pin.png'
							alt=''
							className={styles.search_icons}
						/>
						<input
							type='text'
							placeholder='Add a location'
							className={styles.search_boxes}
						/>
					</div>
				</main>
			</div>
		</>
	);
};
