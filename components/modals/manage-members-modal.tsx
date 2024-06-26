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
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';

import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks/use-modal-store';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { ScrollArea } from '@radix-ui/react-scroll-area';
import {
	Check,
	GavelIcon,
	Loader2,
	MoreVertical,
	Shield,
	ShieldAlert,
	ShieldCheck,
	ShieldCheckIcon,
	ShieldQuestionIcon,
} from 'lucide-react';

export default function ManageMemberModal() {
	const { onOpen, isOpen, onClose, type, data } = useModal();
	const isModalOpen = isOpen && type === 'members';
	const handleClose = () => {
		onClose();
	};
	const router = useRouter();

	const roleIconMap = {
		GUEST: null,
		MODERATOR: <ShieldCheckIcon className="h-4 w-4 text-indigo-500" />,
		ADMIN: <ShieldAlert className="h-4 w-4 text-rose-500" />,
	};
	const [loadingId, setloadingId] = useState('');
	const onRoleChange = async (role: string, memberId: string) => {
		try {
			setloadingId(memberId);
			const response = await axios.patch(`/api/member/${memberId}`, {
				role: role,
				serverId: data.server?.id,
			});
			onOpen('members', { server: response.data });
		} catch (err) {
			console.log(err);
		}
		setloadingId('');
		router.refresh();
	};
	const onKick = async (memberId: string) => {
		try {
			setloadingId(memberId);
			const response = await axios.delete(
				`/api/member/${memberId}?serverId=${data.server?.id}`
			);
			onOpen('members', { server: response.data });
		} catch (err) {
			console.log(err);
		}
		setloadingId('');
		router.refresh();
	};
	if (data.server?.members == undefined) return null;
	return (
		<Dialog open={isModalOpen} onOpenChange={handleClose}>
			<DialogContent>
				<DialogHeader className="flex flex-col items-center justify-center gap-1">
					<DialogTitle className="font-bold text-xl">
						Manage Members
					</DialogTitle>
					<DialogDescription className="text-center ">
						{data.server?.members?.length <= 1
							? `${data.server?.members?.length} Member`
							: `${data.server?.members?.length} Members`}
					</DialogDescription>
				</DialogHeader>
				<ScrollArea className="flex flex-col gap-4 justify-center">
					{data.server?.members?.map((member, id) => {
						return (
							<div key={id} className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<Avatar>
										<AvatarImage src={member.profile.imageUrl} />
										<AvatarFallback>CN</AvatarFallback>
									</Avatar>
									<div className="flex flex-col justify-center gap-1 text-sm">
										<div className="flex flex-row gap-1 items-center">
											<p>{member.profile.name} </p>
											<p>{roleIconMap[member.role]}</p>
										</div>
										<p className="text-xs tracking-wide text-zinc-500">
											{member.profile.email}
										</p>
									</div>
								</div>
								{data.server?.profileId != member.profileId &&
									loadingId != member.id && (
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant="outline">
													<MoreVertical className="bg-transparent border-none hover:none" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent className="w-56" side="right">
												<DropdownMenuLabel className="flex items-center gap-2">
													<ShieldQuestionIcon /> Role
												</DropdownMenuLabel>
												<DropdownMenuSeparator />
												<DropdownMenuRadioGroup
													onValueChange={(val) => {
														onRoleChange(val, member.id);
													}}
												>
													<DropdownMenuRadioItem
														value="GUEST"
														className="flex justify-between"
													>
														<div className="flex items-center gap-1">
															<Shield />
															Guest
														</div>
														{member.role === 'GUEST' && (
															<Check className="h-4 w-4 ml-auto" />
														)}
													</DropdownMenuRadioItem>
													<DropdownMenuRadioItem
														value="MODERATOR"
														className="flex justify-between"
													>
														<div className="flex items-center gap-1">
															<ShieldCheck />
															Moderator
														</div>
														{member.role === 'MODERATOR' && (
															<Check className="h-4 w-4 ml-auto" />
														)}
													</DropdownMenuRadioItem>
												</DropdownMenuRadioGroup>
												<DropdownMenuSeparator />
												<DropdownMenuRadioGroup>
													<DropdownMenuRadioItem
														value="top"
														className="flex justify-between"
														onClick={() => onKick(member.id)}
													>
														<div className="flex items-center gap-1 text-rose-500 font-semibold">
															<GavelIcon className="h-4 w-4 ml-auto" />
															Kick
														</div>
													</DropdownMenuRadioItem>
												</DropdownMenuRadioGroup>
											</DropdownMenuContent>
										</DropdownMenu>
									)}
								{loadingId == member.id && (
									<Loader2 className="w-4 h-4 animate-spin text-zinc-500"></Loader2>
								)}
							</div>
						);
					})}
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
}
