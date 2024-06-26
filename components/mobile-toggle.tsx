import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';
import ServerSidebar from './server/serverSidebar';
import NavigationSidebar from './navigations/NavigationSidebar';

interface MobileToggleProps {
	serverId: string;
}
export default function MobileToggle({ serverId }: MobileToggleProps) {
	return (
		<Sheet>
			<SheetTrigger>
				<Button variant="ghost" size="icon" className="md:hidden">
					<Menu />
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="p-0 flex gap-0">
				<div className="w-[72px]">
					<NavigationSidebar />
				</div>
				<ServerSidebar serverId={serverId} />
			</SheetContent>
		</Sheet>
	);
}
