import { Wave } from "../../assets/wave";
import { Arrow } from "../../assets/arrow";
import { useNavigate } from "react-router-dom";

export const Tracker = () => {


	const navigate = useNavigate()

	return (
		
		<>
			<div className=" w-vw h-screen flex justify-between">
				<div>
					<Wave width="w-full" height="h-full" />
				</div>
				
				<div className="flex w-2/4">
					<div className="mt-24 w-full">
						<div className="flex justify-between w-full items-center">

							<h1 className="font-semibold text-3xl">Application Tracker</h1>

							<div className="flex align-items">
								<button 
									style={{ backgroundColor : "#007AFF" }} 
									onClick={() => {
										navigate("/")
									}}
									className="text-white rounded-md m-4 px-3 py-2 flex items-center cursor-pointer">
									Search for Jobs <Arrow className="ml-4" height="2rem" width="2rem"/>
								</button>
							</div>
						</div>
						<hr />

					</div>
				</div>

				<div className="rotate-180">
					<Wave width="w-full" height="h-full" />
				</div>
			</div>
		</>
	
);
};
