import styles from './ai.module.css';
import OpenAI from 'openai';
import { useEffect, useState } from 'react';

export const AI = ({ job_description }) => {
	const [summary, setSummary] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const openai = new OpenAI({
		apiKey: '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',
		dangerouslyAllowBrowser: true,
	});

	const llm = async (job_description) => {
		const prompt = `Summarize the following job description in 30 words or less: ${job_description}`;

		try {
			setLoading(true);
			const completion = await openai.chat.completions.create({
				model: 'gpt-3.5-turbo',
				messages: [
					{
						role: 'system',
						content:
							'Provide data in text format in 30 words or less',
					},
					{
						role: 'user',
						content: prompt,
					},
				],
			});

			const finishReason = completion.choices[0].finish_reason;
			if (finishReason !== 'stop') {
				throw new Error(
					'Not enough tokens to generate a complete response.'
				);
			}

			const summaryText = completion.choices[0].message.content || '';
			setSummary(summaryText);
		} catch (error) {
			setError(error.message);
			console.error('Error:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (job_description) {
			llm(job_description);
		}
	}, [job_description]);

	return (
		<div className={styles.ai_container}>
			{loading ? (
				<p>Loading summary...</p>
			) : (
				<>
					{summary && (
						<>
							<div id={styles.ai_header_container}>
								<p id={styles.ai_header}>
									Job Summary - Powered by AI
								</p>{' '}
								<img src='../../../public/ai.png' alt='' />
							</div>
							<p className={styles.summary}>{summary}</p>
						</>
					)}
				</>
			)}
		</div>
	);
};
