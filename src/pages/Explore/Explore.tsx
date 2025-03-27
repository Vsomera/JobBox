import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/userContext';
import styles from './explore.module.css';
import { Wave } from '../../assets/wave';
import axios from 'axios';
import { JobCard } from '../../components/JobCard/JobCard';
import { Description } from '../../components/Description/Description';

interface Job {
	job_id: string;
	job_title: string;
	employer_name: string;
	job_location: string;
	job_posted_at: string;
	job_description?: string;
	job_apply_link?: string;
}

export const Explore = () => {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [jobList, setJobList] = useState<Job[]>([]);
	const [jobTitle, setJobTitle] = useState('');
	const [location, setLocation] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const { user } = useContext(UserContext);
	const navigate = useNavigate();

	const rapidapi = async (jobTitle = 'developer', location = 'canada') => {
		try {
			setIsLoading(true);
			const res = await axios.get(
				`https://jsearch.p.rapidapi.com/search?query=${jobTitle}+jobs+in+${location}&page=1&num_pages=1&country=us&date_posted=all`,
				{
					headers: {
						'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
						'x-rapidapi-host': 'jsearch.p.rapidapi.com',
					},
				}
			);
			console.log(res.data.data);
			setJobList(res.data.data);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			rapidapi(jobTitle || undefined, location || undefined);
		}
	};

	useEffect(() => {
		rapidapi();
	}, []);

	const handleCardClick = (index: number) => {
		if (!user) {
			navigate('/login');
		}
		setSelectedIndex(index); // Ensure this runs even if user is not logged in
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
								value={jobTitle}
								onChange={(e) => setJobTitle(e.target.value)}
								onKeyDown={handleKeyPress}
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
								value={location}
								onChange={(e) => setLocation(e.target.value)}
								onKeyDown={handleKeyPress}
							/>
						</div>
						{isLoading ? (
							<div className={styles.spinnerContainer}>
								<div className={styles.spinner}></div>
							</div>
						) : jobList.length > 0 ? (
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
												key={index}
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
								</section>
								<section
									className={styles.result_sections}
									id={styles.job_description}>
									<Description
										jobId={jobList[selectedIndex]?.job_id}
										position={
											jobList[selectedIndex]?.job_title
										}
										company={
											jobList[selectedIndex]
												?.employer_name
										}
										location={
											jobList[selectedIndex]?.job_location
										}
										job_description={
											jobList[selectedIndex]
												?.job_description
										}
										applyLink={
											jobList[selectedIndex]
												?.job_apply_link
										}
									/>
								</section>
							</div>
						) : null}
					</main>
				</div>
				<div className='rotate-180'>
					<Wave width='w-full' height='h-full' />
				</div>
			</div>
		</>
	);
};
