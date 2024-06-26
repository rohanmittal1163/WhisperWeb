'use client';

import qs from 'query-string';
import axios from 'axios';
import { useState } from 'react';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { useModal } from '@/hooks/use-modal-store';
import { Button } from '@/components/ui/button';

export const DeleteMessage = () => {
	const { isOpen, onClose, type, data } = useModal();

	const isModalOpen = isOpen && type === 'deleteMessage';
	const { apiUrl, query } = data;

	const [isLoading, setIsLoading] = useState(false);

	const onClick = async () => {
		try {
			setIsLoading(true);
			const url = qs.stringifyUrl({
				url: apiUrl || '',
				query,
			});

			await axios.delete(url);

			onClose();
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog open={isModalOpen} onOpenChange={onClose}>
			<DialogContent className="bg-white dark:bg-black text-black p-0 overflow-hidden">
				<DialogHeader className="pt-8 px-6">
					<DialogTitle className="text-2xl text-center font-bold dark:text-white text-black">
						Delete Message
					</DialogTitle>
					<DialogDescription className="text-center text-zinc-500 dark:text-white text-black">
						Are you sure you want to do this? <br />
						The message will be permanently deleted.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className="bg-gray-100 dark:bg-black px-6 py-4">
					<div className="flex items-center justify-between w-full gap-3">
						<Button
							disabled={isLoading}
							onClick={onClose}
							variant="ghost"
							className="w-full  dark:text-white bg-rose-500 hover:bg-rose-600"
						>
							Cancel
						</Button>
						<Button
							disabled={isLoading}
							className="bg-indigo-500 text-white rounded-sm capitalize font-semibold hover:bg-indigo-500/90 w-full"
							onClick={onClick}
						>
							Confirm
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
