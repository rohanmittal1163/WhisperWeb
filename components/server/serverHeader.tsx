'use client';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	ChevronDown,
	FolderClosedIcon,
	LogOutIcon,
	PlusCircle,
	Settings,
	Trash,
	UserPlus,
	Users,
} from 'lucide-react';
import { Channel, Member, MemberRole, Profile, Server } from '@prisma/client';
import { useModal } from '@/hooks/use-modal-store';
import { ServerWithMembersWithProfiles } from '@/types';
export default function ServerHeader({
	server,
	role,
}: {
	server: ServerWithMembersWithProfiles;
	role?: MemberRole;
}) {
	const { onOpen } = useModal();
	const isAdmin = role === MemberRole.ADMIN;
	const isModerator = isAdmin || role === MemberRole.MODERATOR;
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="focus:outline-none" asChild>
				<button className="capitalize w-full text-md font-semibold flex items-center justify-between h-12 px-3 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
					{server.name}
					<ChevronDown />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
				{isModerator && (
					<DropdownMenuItem
						onClick={() => onOpen('invite', { server })}
						className="flex flex-row items-center justify-between text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer"
					>
						Invite People
						<UserPlus className="w-4 h-4" />
					</DropdownMenuItem>
				)}
				{isAdmin && (
					<DropdownMenuItem
						onClick={() => onOpen('editServer', { server })}
						className="flex flex-row items-center justify-between px-3 py-2 text-sm cursor-pointer"
					>
						Server Settings
						<Settings className="w-4 h-4" />
					</DropdownMenuItem>
				)}
				{isAdmin && (
					<DropdownMenuItem
						onClick={() => onOpen('members', { server })}
						className="flex flex-row items-center justify-between px-3 py-2 text-sm cursor-pointer"
					>
						Manage Members
						<Users className="w-4 h-4" />
					</DropdownMenuItem>
				)}
				{isModerator && (
					<DropdownMenuItem
						onClick={() => onOpen('channel', { server })}
						className="flex flex-row items-center justify-between px-3 py-2 text-sm cursor-pointer"
					>
						Create Channel
						<PlusCircle className="w-4 h-4" />
					</DropdownMenuItem>
				)}
				{isModerator && (
					<DropdownMenuItem
						onClick={() => onOpen('category', { server })}
						className="flex flex-row items-center justify-between px-3 py-2 text-sm cursor-pointer"
					>
						Create Category
						<FolderClosedIcon className="w-4 h-4" />
					</DropdownMenuItem>
				)}
				{isModerator && <DropdownMenuSeparator />}

				{isAdmin && (
					<DropdownMenuItem
						onClick={() => onOpen('deleteServer', { server })}
						className=" text-rose-500 flex flex-row items-center justify-between px-3 py-2 text-sm cursor-pointer"
					>
						Delete Server
						<Trash className="w-4 h-4" />
					</DropdownMenuItem>
				)}
				{!isAdmin && (
					<DropdownMenuItem
						onClick={() => onOpen('leaveServer', { server })}
						className="text-rose-500 flex flex-row items-center justify-between px-3 py-2 text-sm cursor-pointer"
					>
						Leave Server
						<LogOutIcon className="w-4 h-4" />
					</DropdownMenuItem>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
