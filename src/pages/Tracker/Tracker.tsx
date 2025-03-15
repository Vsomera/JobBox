import { Wave } from "../../assets/wave";
import { Arrow } from "../../assets/arrow";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import { useEffect, useState, useContext } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";

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


  const getStatusLabel = (status: string) => {
	const statusMap: { [key: string]: { label: string; color: string } } = {
	  inter: { label: "Interview", color: "purple-50" },
	  applied: { label: "Applied", color: "blue-50" },
	  rejected: { label: "Rejected", color: "red-50" },
	  offer: { label: "Offer", color: "green-40" },
	};
  
	return statusMap[status] || { label: "Unknown", color: "gray-500" };
  };


  const uid = user?.uid;

  useEffect(() => {
    const fetchApplications = async () => {
      if (uid) {
        try {
          // Create a query to get all applications where uid matches the current user's UID
          const q = query(collection(db, "applications"), where("uid", "==", uid));

          // Get the query snapshot
          const querySnapshot = await getDocs(q);

          // Map the querySnapshot to an array of application data
          const apps = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Application[]; // Cast to Application[] type

          setApplications(apps);
        } catch (err) {
          console.error("Error fetching applications: ", err);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false); // Handle case if there's no user UID available
      }
    };

    fetchApplications();
  }, [uid]); // Re-fetch if UID changes

  return (
    <>
      <div className="w-vw h-screen flex justify-between">
        <div>
          <Wave width="w-full" height="h-full" />
        </div>

        <div className="flex w-2/4">
          <div className="mt-24 w-full">
            <div className="flex justify-between w-full items-center">
              <h1 className="font-semibold text-3xl">Application Tracker</h1>

              <div className="flex align-items">
                <button
                  style={{ backgroundColor: "#007AFF" }}
                  onClick={() => {
                    navigate("/");
                  }}
                  className="text-white rounded-md m-4 px-3 py-2 flex items-center cursor-pointer"
                >
                  Search for Jobs
                  <Arrow className="ml-4" height="2rem" width="2rem" />
                </button>
              </div>
            </div>
            <hr />

            {/* Display the fetched applications */}
            <div className="mt-4">
              {loading ? (
                <p>Loading...</p>
              ) : applications.length > 0 ? (
                applications.map((application) => (
                  <div 
				  	key={application.id} 
				  	className="mb-4 p-4 rounded-lg shadow-md flex justify-between">
						
						<div>
							{application.position}
						</div>

						<div>
                   			{application.company}
						</div>
				
						<div className="flex items-center">
							<span className={`h-3 w-3 rounded-full bg-blue-500 mr-2`} />
							<span className="font-medium">
								{getStatusLabel(application.status).label}
							</span>
						</div>


						<div>
							{application.intDate}
						</div>
						
						<a
							className="underline text-teal-500"
							href={application.postURL}
							target="_blank"
							rel="noopener noreferrer"
						>
							Job Posting
						</a>
                  </div>
                ))
              ) : (
                <p>No applications found for this user.</p>
              )}
            </div>
          </div>
        </div>

        <div className="rotate-180">
          <Wave width="w-full" height="h-full" />
        </div>
      </div>
    </>
  );
};
