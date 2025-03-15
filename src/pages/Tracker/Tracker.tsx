import { Wave3 } from "../../assets/waveL";

export const Tracker = () => {
	return (<>
		<div className="w-vw h-screen flex justify-between">
			<div>
				<Wave3 width="w-full" height="h-full" />
			</div>
			
			<div className="rotate-180">
				<Wave3 width="w-full" height="h-full" />
			</div>
		</div>
	</>);
};
