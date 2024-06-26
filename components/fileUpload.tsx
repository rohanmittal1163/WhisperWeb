import { UploadButton } from '@/lib/uploadThing';
import Image from 'next/image';
import '@uploadthing/react/styles.css';
import { Button } from './ui/button';
import { FileIcon, X } from 'lucide-react';

export default function FileUpload({
	endpoint,
	onChange,
	value,
}: {
	endpoint: 'serverImage' | 'messageFile';
	value: string;
	onChange: (url: string) => void;
}) {
	const filetype = value?.split('.').pop();
	if (value && filetype != 'pdf') {
		return (
			<div className="relative h-20 w-20">
				<Image
					src={value}
					alt="upload"
					fill
					className="rounded-full shadow-md border-white/10 border-2 border-solid object-cover"
				/>
				<Button
					onClick={() => {
						onChange('');
					}}
					className="absolute text-white text-sm font-semibold flex items-center justify-center top-0 right-0 bg-red-500  hover:bg-red-600 rounded-full p-0 aspect-square w-5 h-5 color-white shadow-md"
				>
					x
				</Button>
			</div>
		);
	}
	if (value && filetype === 'pdf') {
		return (
			<div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
				<FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
				<a
					href={value}
					target="_blank"
					rel="noopener noreferrer"
					className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
				>
					{value}
				</a>
				<button
					onClick={() => onChange('')}
					className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
					type="button"
				>
					<X className="h-4 w-4" />
				</button>{' '}
			</div>
		);
	}
	return (
		<>
			<UploadButton
				endpoint={endpoint}
				onClientUploadComplete={(res) => {
					onChange(res[0].url);
				}}
				onUploadError={(error: Error) => {
					console.log(error);
				}}
			/>
		</>
	);
}
