import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import styles from './posting.module.css';
import { Wave } from '../../assets/wave';
import { UserContext } from '../../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import {
	collection,
	addDoc,
	deleteDoc,
	query,
	where,
	getDocs,
	Timestamp,
} from 'firebase/firestore';
import { db } from '../../config/firebase';

interface Details {
	job_title: string;
	employer_name: string;
	job_location: string;
	job_description: string;
	job_apply_link: string;
}

export const Posting = () => {
	const { jobId } = useParams();
	const { user } = useContext(UserContext);
	const [details, setDetails] = useState<Details | null>(null);
	const [loading, setLoading] = useState(true);
	const [isBookmarked, setIsBookmarked] = useState(false);
	const navigate = useNavigate();

	const checkBookmark = async () => {
		if (!user || !details) return;

		try {
			const applicationsRef = collection(db, 'applications');
			const q = query(
				applicationsRef,
				where('uid', '==', user.uid),
				where('position', '==', details.job_title),
				where('company', '==', details.employer_name)
			);

			const querySnapshot = await getDocs(q);
			setIsBookmarked(!querySnapshot.empty);
		} catch (error) {
			console.error('Error checking bookmark:', error);
		}
	};

	useEffect(() => {
		if (details) {
			checkBookmark();
		}
	}, [details, user]);

	const toggleBookmark = async () => {
		if (!user) {
			navigate('/login');
			return;
		}

		if (!details) return;

		try {
			const applicationsRef = collection(db, 'applications');
			const q = query(
				applicationsRef,
				where('uid', '==', user.uid),
				where('position', '==', details.job_title),
				where('company', '==', details.employer_name)
			);

			const querySnapshot = await getDocs(q);

			if (!querySnapshot.empty) {
				const deletePromises = querySnapshot.docs.map((doc) =>
					deleteDoc(doc.ref)
				);
				await Promise.all(deletePromises);
				setIsBookmarked(false);
			} else {
				await addDoc(applicationsRef, {
					jobId: jobId,
					company: details.employer_name,
					intDate: Timestamp.now(),
					position: details.job_title,
					postURL: details.job_apply_link,
					uid: user.uid,
					status: 'applied',
				});
				setIsBookmarked(true);
			}
		} catch (error) {
			console.error('Error updating bookmark:', error);
		}
	};

	const getJobDetails = async (jobId: string) => {
		try {
			console.log(jobId);
			setLoading(true);
			const res = await axios.get(
				`https://jsearch.p.rapidapi.com/job-details?job_id=${jobId}&country=us`,
				{
					headers: {
						'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
						'x-rapidapi-host': 'jsearch.p.rapidapi.com',
					},
				}
			);
			setDetails(res.data.data[0]);
		} catch (error) {
			console.error(error);
			setDetails(null);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (jobId) {
			getJobDetails(jobId);
		}
	}, [jobId]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!details) {
		return <div>No job details found</div>;
	}

	const formattedDescription = details?.job_description
		? details.job_description.replace(/\n/g, '<br />')
		: 'No description available';
	return (
		<>
			<div className='w-full h-[calc(100vh-70.1px)] flex justify-between'>
				<div>
					<Wave width='w-full' height='h-full' />
				</div>
				<div id={styles.container}>
					<main id={styles.main_content}>
						<div id={styles.description_header}>
							<div id={styles.basic_details}>
								<p id={styles.company}>
									{details.employer_name}
								</p>
								<p id={styles.position}>{details.job_title}</p>
								<p id={styles.location}>
									{details.job_location}
								</p>
							</div>
							<div id={styles.apply_container}>
								<img
									src={
										isBookmarked
											? '/bookmark_filled.png' // Removed '../../../public'
											: '/bookmark_empty.png'
									}
									id={styles.bookmark}
									alt='Bookmark'
									onClick={toggleBookmark}
									style={{ cursor: 'pointer' }}
								/>
								<a
									href={details.job_apply_link}
									target='_blank'
									rel='noopener noreferrer'>
									<div id={styles.button}>Apply</div>
								</a>
							</div>
						</div>
						<div id={styles.description_content}>
							<p id={styles.about}>About this job</p>
							<div
								id={styles.content}
								dangerouslySetInnerHTML={{
									__html: formattedDescription,
								}}
							/>
						</div>
					</main>
				</div>
				<div className='rotate-180'>
					<Wave width='w-full' height='h-full' />
				</div>
			</div>
		</>
	);
};
