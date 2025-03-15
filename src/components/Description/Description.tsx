import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AI } from '../AI/AI';
import styles from './description.module.css';
import { UserContext } from '../../contexts/userContext';
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

export const Description = ({
	position,
	company,
	location,
	job_description,
	applyLink,
}) => {
	const formattedDescription = job_description.replace(/\n/g, '<br />');
	const [isBookmarked, setIsBookmarked] = useState(false);
	const { user } = useContext(UserContext);
	const navigate = useNavigate();

	// Function to check if the job is bookmarked
	const checkBookmark = async () => {
		if (!user) return;

		try {
			const applicationsRef = collection(db, 'applications');
			const q = query(
				applicationsRef,
				where('uid', '==', user.uid),
				where('position', '==', position),
				where('company', '==', company)
			);

			const querySnapshot = await getDocs(q);
			setIsBookmarked(!querySnapshot.empty); // If results exist, set to true
		} catch (error) {
			console.error('Error checking bookmark:', error);
		}
	};

	// Fetch bookmark status when job changes
	useEffect(() => {
		if (position && company) {
			checkBookmark();
		}
	}, [position, company]);

	// Function to toggle bookmark
	const toggleBookmark = async () => {
		if (!user) {
			navigate('/login');
			return;
		}

		try {
			const applicationsRef = collection(db, 'applications');
			const q = query(
				applicationsRef,
				where('uid', '==', user.uid),
				where('position', '==', position),
				where('company', '==', company)
			);

			const querySnapshot = await getDocs(q);

			if (!querySnapshot.empty) {
				querySnapshot.forEach(async (doc) => {
					await deleteDoc(doc.ref);
				});
				setIsBookmarked(false);
			} else {
				await addDoc(applicationsRef, {
					company: company,
					intDate: Timestamp.now(),
					position: position,
					postURL: applyLink,
					uid: user.uid,
					status: 'applied',
				});
				setIsBookmarked(true);
			}
		} catch (error) {
			console.error('Error updating bookmark:', error);
		}
	};

	return (
		<div className={styles.description_container}>
			<div className={styles.description_header}>
				<div className={styles.basic_details}>
					<p className={styles.company}>{company}</p>
					<p className={styles.position}>{position}</p>
					<p className={styles.location}>{location}</p>
				</div>
				<div className={styles.apply_container}>
					<img
						src={
							isBookmarked
								? '../../../public/bookmark_filled.png'
								: '../../../public/bookmark_empty.png'
						}
						id={styles.bookmark}
						alt='Bookmark'
						onClick={toggleBookmark}
						style={{ cursor: 'pointer' }}
					/>
					<a
						href={applyLink}
						target='_blank'
						rel='noopener noreferrer'>
						<div className={styles.button}>Apply</div>
					</a>
				</div>
			</div>
			<main id={styles.description_content}>
				<AI job_description={job_description} />
				<p id={styles.about}>About this job</p>
				<div
					id={styles.content}
					dangerouslySetInnerHTML={{ __html: formattedDescription }}
				/>
			</main>
			<br />
		</div>
	);
};
