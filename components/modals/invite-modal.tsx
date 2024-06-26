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
import { Button } from '@/components/ui/button';
import { useModal } from '@/hooks/use-modal-store';
import { Checkbox } from '@/components/ui/checkbox';

import { Input } from '../ui/input';
import { RefreshCwIcon, Settings } from 'lucide-react';
import { useOrigin } from '@/hooks/use-origin';
import { cn } from '@/lib/utils';

export default function InviteModal() {
	const { onOpen, isOpen, onClose, type, data } = useModal();
	const isModalOpen = isOpen && type === 'invite';

	const handleClose = () => {
		onClose();
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(inviteUrl);
		setIsCopied(true);
		setTimeout(() => {
			setIsCopied(false);
		}, 1000);
	};
	const origin = useOrigin();
	const [isChecked, setIsChecked] = useState(false);
	const [isCopy, setIsCopied] = useState(false);

	const inviteUrl = `${origin}/invite/${data.server?.inviteCode}`;
	const [isLoading, setisLoading] = useState(false);
	const handleNew = async () => {
		setisLoading(true);
		try {
			const res = await axios.patch(`/api/servers/${data.server?.id}`);
			onOpen('invite', { server: res.data });
		} catch (err) {
			console.log(err);
		} finally {
			setisLoading(false);
		}
	};

	return (
		<Dialog open={isModalOpen} onOpenChange={handleClose}>
			<DialogContent className="p-0">
				<DialogHeader className="flex flex-col items-center justify-center gap-0 pt-6">
					<DialogTitle className="font-bold text-xl capitalize">
						invite friends to {data.server?.name}
					</DialogTitle>
					<DialogDescription className="text-center ">
						<span className="text-xl">#</span> General
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col gap-2 p-4">
					<label className="text-sm text-white/40 flex items-center justify-between">
						Share this link to others to grant access to your server!
						<RefreshCwIcon
							size={20}
							className={cn('cursor-pointer', isLoading && 'animate-spin')}
							onClick={handleNew}
						/>
					</label>
					<div className="flex flex-row border-2 border-solid rounded-md w-full p-1.5">
						<Input
							className="focus-within:outline-none border-none caret-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
							value={inviteUrl}
						/>
						<Button
							disabled={isLoading}
							className={cn(
								' w-40 text-white rounded-sm capitalize font-semibold ',
								isCopy
									? 'bg-green-400 hover:bg-green-500/90 '
									: 'bg-indigo-500 hover:bg-indigo-500/90'
							)}
							onClick={handleCopy}
						>
							{isCopy ? 'Copied' : 'Copy'}
						</Button>
					</div>
					<p className="text-xs text-white/40">
						Your invite link
						{isChecked ? ' will never expire' : ' expires in 7 days'}.
					</p>
				</div>
				<div className="flex items-center justify-between bg-slate-300/10 p-4 rounded-bl-md rounded-br-md">
					<div className="flex items-center gap-2">
						<Checkbox
							id="terms1"
							onCheckedChange={() => setIsChecked(!isChecked)}
							disabled={isLoading}
						/>
						<label htmlFor="terms1" className="text-sm text-white/90">
							Set this link to never expire.
						</label>
					</div>
					<Settings
						size={20}
						className="hover:animate-spin cursor-pointer text-gray-400"
					/>
				</div>
			</DialogContent>
		</Dialog>
	);
}
