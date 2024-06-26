'use client';
import { useModal } from '@/hooks/use-modal-store';
import { CalendarRange } from 'lucide-react';
import React from 'react';

export default function ServerEventHeader() {
	const { onOpen } = useModal();
	const handleClick = () => {
		onOpen('events');
	};
	return (
		<button
			onClick={handleClick}
			className="group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
		>
			<CalendarRange />
			Events
		</button>
	);
}
