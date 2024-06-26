'use client';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';

import { useModal } from '@/hooks/use-modal-store';

import { CalendarRange } from 'lucide-react';

export default function EventModal() {
	const { isOpen, onClose, type } = useModal();
	const isModalOpen = isOpen && type === 'events';

	const handleClose = () => {
		onClose();
	};

	return (
		<Dialog open={isModalOpen} onOpenChange={handleClose}>
			<DialogContent className="p-0 flex flex-col gap-0 h-96 transition ">
				<DialogHeader className="flex flex-col items-center justify-center gap-0">
					<DialogTitle className="capitalize flex bg-slate-700/10 items-center w-full text-md py-4 px-2 gap-4 ">
						<div className="flex gap-2 items-center border-r-2 border-r-solid border-r-slate-200/30 px-4">
							<CalendarRange />
							events
						</div>
						<button className="bg-indigo-500 w-40 text-sm h-8 text-white rounded-sm capitalize font-semibold hover:bg-indigo-500/90">
							create event
						</button>
					</DialogTitle>
				</DialogHeader>
				<div className="flex flex-col text-sm items-center justify-center h-full p-3 w-full bg-slate-500/20 gap-2 px-5">
					<div className="bg-slate-400/20 rounded-full shadow-md p-3">
						<CalendarRange />
					</div>
					<p className="text-2xl center font-bold ">
						There are no upcoming events.
					</p>
					<p className="text-sm text-white/30">
						Schedule an event for any planned activity in your server
					</p>
					<p className="text-sm text-white/30">
						You can give other people permission to create events in
					</p>
					<span className="text-blue-500 underline font-semibold">
						Server Settings &lt; Roles.
					</span>
				</div>
			</DialogContent>
		</Dialog>
	);
}
