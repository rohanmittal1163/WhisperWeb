'use client';
import { Download } from 'lucide-react';
import ActionTooltip from '../Action-tooltip';
import { useModal } from '@/hooks/use-modal-store';

export default function NavigationDownload() {
	const { onOpen } = useModal();
	return (
		<div>
			<ActionTooltip side="right" align="center" label="Download apps">
				<button
					className="group flex items-center"
					onClick={() => onOpen('downloadApps')}
				>
					<div className="h-[48px] w-[48px] dark:bg-neutral-700 group-hover:bg-emerald-600 bg-background justify-center items-center overflow-hidden transition-all group-hover:rounded-[14px] rounded-[24px] flex">
						<Download
							className="group-hover:text-white transition text-emerald-500 "
							size={25}
						/>
					</div>
				</button>
			</ActionTooltip>
		</div>
	);
}
