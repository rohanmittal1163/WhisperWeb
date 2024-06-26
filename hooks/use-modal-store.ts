import { ServerWithMembersWithProfiles } from '@/types';
import { Channel, ChannelType } from '@prisma/client';
import { create } from 'zustand';
export type ModalType =
	| 'createServer'
	| 'invite'
	| 'events'
	| 'editServer'
	| 'downloadApps'
	| 'members'
	| 'channel'
	| 'leaveServer'
	| 'deleteServer'
	| 'category'
	| 'editChannel'
	| 'deleteChannel'
	| 'messageFile'
	| 'deleteMessage';

interface ModalData {
	server?: ServerWithMembersWithProfiles;
	channelType?: ChannelType;
	channel?: Channel;
	apiUrl?: string;
	query?: Record<string, any>;
}
interface ModalStore {
	type: ModalType | null;
	isOpen: boolean;
	data: ModalData;
	onOpen: (type: ModalType, data?: {}) => void;
	onClose: () => void;
}
export const useModal = create<ModalStore>((set) => ({
	type: null,
	isOpen: false,
	data: {},
	onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
	onClose: () => set({ type: null, isOpen: false }),
}));
