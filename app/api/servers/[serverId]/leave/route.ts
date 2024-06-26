import { currentProfile } from '@/lib/currentProfile';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
export async function POST(
	req: Request,
	{ params }: { params: { serverId: string } }
) {
	try {
		const profile = await currentProfile();
		if (!profile) {
			return new NextResponse('Unauthorized', { status: 401 });
		}
		if (!params.serverId) {
			return new NextResponse('Server Id missing', { status: 400 });
		}
		const server = await db.server.update({
			where: {
				id: params.serverId,
				profileId: {
					not: profile.id,
				},
				members: {
					some: {
						profileId: profile.id,
					},
				},
			},
			data: {
				members: {
					deleteMany: {
						profileId: profile.id,
					},
				},
			},
		});
		return NextResponse.json(server);
	} catch (err: any) {
		console.log('[API-SERVERS_POST]', err);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { serverId: string } }
) {
	try {
		const profile = await currentProfile();
		if (!profile) {
			return new NextResponse('Unauthorized', { status: 401 });
		}
		if (!params.serverId) {
			return new NextResponse('Server Id missing', { status: 400 });
		}
		const server = await db.server.delete({
			where: {
				id: params.serverId,
				profileId: profile.id,
			},
		});
		return NextResponse.json(server);
	} catch (err: any) {
		console.log('[SERVER_ID_DELETE]', err);
		return new NextResponse('Internal error', { status: 500 });
	}
}
