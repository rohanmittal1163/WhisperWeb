import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import React from 'react';

export default function ActionTooltip({
	label,
	children,
	side,
	align,
}: {
	label: string;
	children: React.ReactNode;
	side?: 'top' | 'right' | 'bottom' | 'left';
	align?: 'start' | 'center' | 'end';
}) {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={50}>
				<TooltipTrigger>{children}</TooltipTrigger>
				<TooltipContent side={side} align={align}>
					<p className="font-semibold capitalize text-sm">
						{label.toLowerCase()}
					</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
