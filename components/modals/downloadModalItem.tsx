import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';
import { redirect } from 'next/navigation';

export default function DownloadItem({
	name,
	src,
	buttons,
}: {
	name: string;
	src: string;
	buttons: {
		name: string;
		url: string;
	}[];
}) {
	return (
		<div className="flex w-full flex-col gap-2 p-5 border-2 border-solid border-slate-300 rounded-lg items-center justify-between transition hover:border-indigo-500/90">
			<Image
				src={src}
				alt={name}
				width={100}
				height={100}
				className="rounded-full"
			/>
			<p>{name}</p>
			<div className="flex items-center gap-3">
				{buttons.map((button, id) => {
					return (
						<Button
							key={id}
							className="bg-slate-400/20 text-white rounded-sm capitalize font-semibold hover:bg-indigo-500/90"
							onClick={() => redirect(button.url)}
						>
							{button.name}
						</Button>
					);
				})}
			</div>
		</div>
	);
}
