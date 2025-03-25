import { useParams } from 'react-router-dom';

export const Posting = () => {
	const { jobId } = useParams();
	return <div>{jobId}</div>;
};
