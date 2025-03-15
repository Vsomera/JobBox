import { Wave } from "../../assets/wave";

export const Tracker = () => {
	return (<>
		<div className="w-vw h-screen flex justify-between">
			<div>
				<Wave width="w-full" height="h-full" />
			</div>
			
			<div className="rotate-180">
				<Wave width="w-full" height="h-full" />
			</div>
		</div>
	</>);
};
