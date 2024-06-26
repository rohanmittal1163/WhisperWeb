import { currentProfile } from '@/lib/currentProfile';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
export async function PATCH(
	req: Request,
	{ params }: { params: { serverId: string } }
) {
	try {
		const profile = await currentProfile();
		if (!profile) {
			return new NextResponse('Unauthorized', { status: 401 });
		}
		const server = await db.server.update({
			where: {
				id: params.serverId,
				profileId: profile.id,
			},
			data: {
				inviteCode: uuidv4(),
			},
		});
		return NextResponse.json(server);
	} catch (err: any) {
		console.log('[API-SERVERS_POST]', err);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function PUT(
	req: Request,
	{ params }: { params: { serverId: string } }
) {
	try {
		const { name, imageUrl } = await req.json();
		const profile = await currentProfile();
		if (!profile) {
			return new NextResponse('Unauthorized', { status: 401 });
		}
		const server = await db.server.update({
			where: {
				id: params.serverId,
			},
			data: {
				name,
				imageUrl,
			},
		});
		return NextResponse.json(server);
	} catch (err: any) {
		console.log('[API-SERVERS_POST]', err);
		return new NextResponse('Internal error', { status: 500 });
	}
}
