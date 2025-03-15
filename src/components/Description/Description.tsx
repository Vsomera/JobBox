import { AI } from '../AI/AI';
import styles from './description.module.css';

export const Description = ({
	position,
	company,
	location,
	job_description,
	applyLink,
}) => {
	const formattedDescription = job_description.replace(/\n/g, '<br />');

	return (
		<div className={styles.description_container}>
			<div className={styles.description_header}>
				<div className={styles.basic_details}>
					<p className={styles.company}>{company}</p>
					<p className={styles.position}>{position}</p>
					<p className={styles.location}>{location}</p>
				</div>
				<div className={styles.apply_container}>
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
