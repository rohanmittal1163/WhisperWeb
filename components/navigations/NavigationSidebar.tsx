import { currentProfile } from '@/lib/currentProfile';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import React from 'react';
import NavigationAction from './Navigation-action';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '../ui/scroll-area';
import NavigationItem from './Navigation-item';
import { ModeToggle } from '../mode-toggle';
import { UserButton } from '@clerk/nextjs';
import NavigationDownload from './NavigationDownload';

export default async function NavigationSidebar() {
	const profile = await currentProfile();
	if (!profile) {
		return redirect('/');
	}
	const servers = await db.server.findMany({
		where: {
			members: {
				some: {
					profileId: profile.id,
				},
			},
		},
	});
	return (
		<div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] py-3">
			<NavigationAction />
			<NavigationDownload />
			<Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-600 rounded-md w-10 mx-auto" />
			<ScrollArea className="flex-1 w-full">
				{servers.map((server) => {
					return (
						<div key={server.id} className="mb-4">
							<NavigationItem
								id={server.id}
								name={server.name}
								imageUrl={server.imageUrl}
							/>
						</div>
					);
				})}
			</ScrollArea>

			<div className="pb-3 mt-auto flex items-center flex-col gap-y-4 ">
				<ModeToggle></ModeToggle>
				<UserButton
					afterSignOutUrl="/"
					appearance={{
						elements: {
							avatarBox: 'h-[48px] w-[48px]',
						},
					}}
				/>
			</div>
		</div>
	);
}
