'use client';
import { useEffect, useState } from 'react';
import CreateServerModal from '../modals/create-server-modal';
import InviteModal from '../modals/invite-modal';
import EventModal from '../modals/event-modal';
import EditServerModal from '../modals/edit-server-modal';
import DownloadModal from '../modals/download-modal';
import ManageMemberModal from '../modals/manage-members-modal';
import ChannelModal from '../modals/channel-modal';
import LeaveServer from '../modals/leave-server';
import DeleteServer from '../modals/delete-server';
import CategoryModal from '../modals/category-modal';
import DeleteChannel from '../modals/delete-channel';
import ChannelEdit from '../modals/edit-channel';
import { MessageFileModal } from '../modals/message-file-modal';
import { DeleteMessage } from '../modals/delete-message-modal';

export const ModalProvider = () => {
	const [isMounted, setIsMounted] = useState(false);
	useEffect(() => {
		setIsMounted(true);
	}, []);
	if (!isMounted) {
		return null;
	}
	return (
		<>
			<CreateServerModal />
			<InviteModal />
			<EventModal />
			<EditServerModal />
			<DownloadModal />
			<ManageMemberModal />
			<ChannelModal />
			<LeaveServer />
			<DeleteServer />
			<CategoryModal />
			<DeleteChannel />
			<ChannelEdit />
			<MessageFileModal />
			<DeleteMessage />
		</>
	);
};
