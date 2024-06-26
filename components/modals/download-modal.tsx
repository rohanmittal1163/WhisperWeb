'use client';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useModal } from '@/hooks/use-modal-store';
import DownloadItem from './downloadModalItem';

export default function DownloadModal() {
	const { isOpen, onClose, type } = useModal();
	const isModalOpen = isOpen && type === 'downloadApps';

	const handleClose = () => {
		onClose();
	};

	return (
		<Dialog open={isModalOpen} onOpenChange={handleClose}>
			<DialogContent className="p-5 pt-10 flex flex-col gap-10 items-center justify-between  transition min-w-[520px] max-w-[600px] ">
				<div className="flex gap-4 items-center justify-between w-full ">
					<DownloadItem
						name="MacOS"
						src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/MacOS_logo_%282017%29.svg/773px-MacOS_logo_%282017%29.svg.png"
						buttons={[
							{
								name: 'download',
								url: 'https://discord.com/api/download?platform=osx',
							},
						]}
					/>
					<DownloadItem
						name="Windows"
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf-Yp7jhNSUnEDyP1JvKCHeCevoK0i9_pEWg&s"
						buttons={[
							{
								name: 'download',
								url: 'https://discord.com/api/download?platform=win',
							},
						]}
					/>
					<DownloadItem
						name="Linux"
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsiPmv7kx-pYFxI1-d8eFXdoiC_nKlk_ABJQ&s"
						buttons={[
							{
								name: 'deb',
								url: 'https://discord.com/api/download?platform=linux&format=deb',
							},
							{
								name: 'tar',
								url: 'https://discord.com/api/download?platform=linux&format=tar.gz',
							},
						]}
					/>
				</div>
				<p>or on the go</p>
				<div className="flex gap-10 items-center justify-between">
					<DownloadItem
						name="Apple iOS"
						src="https://w7.pngwing.com/pngs/779/601/png-transparent-apple-logo-symbol-black-logo-circle-apple-2-logo-black-apple-thumbnail.png"
						buttons={[
							{
								name: 'download',
								url: 'https://itunes.apple.com/app/discord/id985746746',
							},
						]}
					/>
					<DownloadItem
						name="Android"
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZrwdUNOQgTt-wA8QMORDG1BHJhJPPcHhcuA&s"
						buttons={[
							{
								name: 'download',
								url: 'https://play.google.com/store/apps/details?id=com.discord',
							},
						]}
					/>
				</div>
			</DialogContent>
		</Dialog>
	);
}
