'use client';
import React, { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks/use-modal-store';

import { Loader2Icon } from 'lucide-react';

export default function DeleteChannel() {
	const { isOpen, onClose, type, data } = useModal();
	const isModalOpen = isOpen && type === 'deleteChannel';
	const handleClose = () => {
		onClose();
	};
	const router = useRouter();

	const [isloading, setIsLoading] = useState(false);

	async function onLeave() {
		try {
			setIsLoading(true);
			const res = await axios.delete(
				`/api/channel/${data.channel?.id}?serverId=${data.server?.id}`
			);
			onClose();
			router.refresh();
			setIsLoading(false);
		} catch (err) {
			console.log(err);
		} finally {
			router.push('/');
		}
	}
	return (
		<Dialog open={isModalOpen} onOpenChange={handleClose}>
			<DialogContent>
				<DialogHeader className="flex flex-col items-center justify-center gap-0">
					<DialogTitle className="font-bold text-xl">
						Delete Channel
					</DialogTitle>
					<DialogDescription className="text-center ">
						Are you sure you want to delete{' '}
						<span className="text-sky-500 font-semibold">
							{data.channel?.name}
						</span>
						?
					</DialogDescription>
				</DialogHeader>

				<button
					disabled={isloading}
					onClick={onLeave}
					className="bg-rose-500 text-white rounded-md flex items-center justify-center font-normal py-2 hover:bg-rose-700 border-none outline-none"
				>
					{isloading ? <Loader2Icon className="animate-spin" /> : 'Delete'}
				</button>
			</DialogContent>
		</Dialog>
	);
}
