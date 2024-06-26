import { Member, Profile, Server } from '@prisma/client';
import { Socket, Server as NetServer } from 'net';
import { NextApiResponse } from 'next';
import { Server as SocketIOServer } from 'socket.io';

export type MemberWithProfiles = Member & {
	profile: Profile;
};

export type ServerWithMembersWithProfiles = Server & {
	members: MemberWithProfiles[];
};
export type NextApiResponseServerIo = NextApiResponse & {
	socket: Socket & {
		server: NetServer & {
			io: SocketIOServer;
		};
	};
};
