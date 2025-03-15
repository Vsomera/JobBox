import styles from './jobCard.module.css';

interface JobCardProps {
	position: string;
	company: string;
	location: string;
	postedDate: string;
	highlighted: boolean;
	onClick: () => void; // Add this prop type for onClick
}

export const JobCard: React.FC<JobCardProps> = ({
	position,
	company,
	location,
	postedDate,
	highlighted,
	onClick, // Destructure onClick
}) => {
	// Conditionally add a class if highlighted is true
	const cardClass = highlighted
		? `${styles.card_container} ${styles.highlighted}`
		: styles.card_container;

	return (
		<div className={cardClass} onClick={onClick}>
			{' '}
			{/* Add onClick handler */}
			<p id={styles.position}>{position}</p>
			{company && <p className={styles.secondary}>{company}</p>}
			{location && <p className={styles.secondary}>{location}</p>}
			{postedDate && (
				<p className={styles.secondary}>Posted {postedDate}</p>
			)}
		</div>
	);
};
