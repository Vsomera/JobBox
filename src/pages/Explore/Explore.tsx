import styles from './explore.module.css';
import { Wave } from '../../assets/wave';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { JobCard } from '../../components/JobCard/JobCard';
import { Description } from '../../components/Description/Description';

export const Explore = () => {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [jobList, setJobList] = useState<any[]>([]);
	const rapidapi = async (jobTitle = 'developer', location = 'canada') => {
		try {
			const res = await axios.get(
				`https://jsearch.p.rapidapi.com/search?query=${jobTitle}+jobs+in+${location}&page=1&num_pages=1&country=us&date_posted=all`,
				{
					headers: {
						'x-rapidapi-key':
							'c040b58a21msh0a3a0fb9f48ea20p146d55jsn01e001fb8a87',
						'x-rapidapi-host': 'jsearch.p.rapidapi.com',
					},
				}
			);

			setJobList((prev) => [...prev, ...res.data.data]);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		rapidapi();
	}, []);

	const handleCardClick = (index: number) => {
		setSelectedIndex(index);
	};

	return (
		<>
			<div className='w-vw h-screen flex justify-between'>
				<div>
					<Wave width='w-full' height='h-full' />
				</div>

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
						{jobList.length > 0 && (
							<div id={styles.results}>
								<section
									className={styles.result_sections}
									id={styles.job_list}>
									{jobList.map((job, index) => {
										const position = job.job_title;
										const company = job.employer_name;
										const location = job.job_location;
										const postedDate = job.job_posted_at;
										const highlighted =
											index === selectedIndex;
										return (
											<JobCard
												position={position}
												company={company}
												location={location}
												postedDate={postedDate}
												highlighted={highlighted}
												onClick={() =>
													handleCardClick(index)
												}
											/>
										);
									})}
									<br />
								</section>
								<section
									className={styles.result_sections}
									id={styles.job_description}>
									<Description
										position={
											jobList[selectedIndex].job_title
										}
										company={
											jobList[selectedIndex].employer_name
										}
										location={
											jobList[selectedIndex].job_location
										}
										job_description={
											jobList[selectedIndex]
												.job_description
										}
										applyLink={
											jobList[selectedIndex]
												.job_apply_link
										}
									/>
								</section>
							</div>
						)}
					</main>
				</div>
				<div className='rotate-180'>
					<Wave width='w-full' height='h-full' />
				</div>
			</div>
		</>
	);
};
