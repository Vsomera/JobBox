import { Wave } from '../../assets/wave';
import { Arrow } from '../../assets/arrow';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/userContext';
import { useEffect, useState, useContext } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase';

interface Application {
    id: string;
    position: string;
    company: string;
    intDate: string;
    postURL: string;
    status: string;
    uid: string;
}

export const Tracker = () => {
	const navigate = useNavigate();
	const { user } = useContext(UserContext);
	const [applications, setApplications] = useState<Application[]>([]);
	const [loading, setLoading] = useState(true);
	const [openModal, setOpenModal] = useState(false);
	const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
	const uid = user?.uid;

	const handleOpenModal = (application: Application) => {
		setSelectedApplication(application);
		setOpenModal(true);
	}

	const handleCloseModal = () => {
		setOpenModal(false);
		setSelectedApplication(null);
	}

    const getStatusLabel = (status: string) => {
        const statusMap: { [key: string]: { label: string; color: string } } = {
            inter: { label: 'Interview', color: 'purple-50' },
            applied: { label: 'Applied', color: 'blue-50' },
            rejected: { label: 'Rejected', color: 'red-50' },
            offer: { label: 'Offer', color: 'green-40' },
        };

        return statusMap[status] || { label: 'Unknown', color: 'gray-500' };
    };

    useEffect(() => {
        const fetchApplications = async () => {
            if (uid) {
                try {
                    const q = query(collection(db, 'applications'), where('uid', '==', uid));
                    const querySnapshot = await getDocs(q);
                    const apps = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Application[];
                    setApplications(apps);
                } catch (err) {
                    console.error('Error fetching applications: ', err);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchApplications();
    }, [uid]);

    return (
        <div className='w-vw h-screen flex justify-between'>
			<div>
            	<Wave width='w-full' height='h-full' />
			</div>

            <div className='flex w-2/4'>
                <div className='mt-24 w-full'>
                    <div className='flex justify-between w-full items-center'>
                        <h1 className='font-semibold text-3xl'>Application Tracker</h1>
                        <button
                            style={{ backgroundColor: '#007AFF' }}
                            onClick={() => navigate('/')}
                            className='text-white rounded-md m-4 px-3 py-2 flex items-center cursor-pointer'
                        >
                            Search for Jobs
                            <Arrow className='ml-4' height='2rem' width='2rem' />
                        </button>
                    </div>
                    <hr />

                    <div className='mt-4'>
                        {loading ? (
                            <p>Loading...</p>
                        ) : applications.length > 0 ? (
                            applications.map((application) => (
								<button
									key={application.id}
									onClick={() => handleOpenModal(application)}
									className='mb-4 p-4 rounded-lg shadow-md w-full flex flex-wrap items-center cursor-pointer text-left'
								>
									<div className='w-full sm:w-2/5 truncate mb-2 sm:mb-0 pr-2'>{application.position}</div>
									<div className='w-1/2 sm:w-1/5 truncate mb-2 sm:mb-0 pr-2'>{application.company}</div>
									<div className='w-1/2 sm:w-1/5 flex items-center mb-2 sm:mb-0 pr-2'>
										<span className='h-3 w-3 min-w-3 rounded-full bg-blue-500 mr-2 flex-shrink-0' />
										<span className='font-medium truncate'>{getStatusLabel(application.status).label}</span>
									</div>
									<div className='w-full sm:w-1/5 text-left sm:text-right'>
										<a
											className='underline text-teal-500'
											href={application.postURL}
											target='_blank'
											rel='noopener noreferrer'
											onClick={(e) => e.stopPropagation()}
										>
											Job Posting
										</a>
									</div>
								</button>
							))
						) : (
                            <div className='flex w-full items-center justify-center h-100'>
                                <div className='flex flex-col gap-4 items-center'>
                                    <img
                                        src='../../../public/greyedOutLogo.svg'
                                        alt='Company logo'
                                        className='w-1/1.5 h-auto'
                                    />
                                    <p className='text-xs font-poppins text-[#b7b3bf]'>No Applications - Apply to jobs to list them here!</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

			<div className='rotate-180'>
            	<Wave width='w-full' height='h-full' />
			</div>

			{openModal && selectedApplication && (
				<div> 
					
				</div>
			)}
			


        </div>
    );
};