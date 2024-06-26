'use client';
import ActionTooltip from '../Action-tooltip';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useParams, useRouter } from 'next/navigation';

function NavigationItem({
	id,
	imageUrl,
	name,
}: {
	id: string;
	imageUrl: string;
	name: string;
}) {
	const router = useRouter();
	const onclick = () => {
		router.push(`/servers/${id}`);
	};
	const params = useParams();
	return (
		<ActionTooltip side="right" align="center" label={name}>
			<button onClick={onclick} className="group relative flex items-center">
				<div
					className={cn(
						'absolute left-0 bg-primary rounded-r-full transition-all w-[4px]',
						params?.serverId !== id && 'group-hover:h-[20px]',
						params?.serverId === id ? 'h-[36px]' : 'h-[8px]'
					)}
				/>
				<div
					className={cn(
						'relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden',
						params?.serverld === id &&
							'bg-primary/10 text-primary rounded-[16px]'
					)}
				>
					<Image src={imageUrl} fill alt="channel" className="object-cover" />
				</div>
			</button>
		</ActionTooltip>
	);
}

export default NavigationItem;
