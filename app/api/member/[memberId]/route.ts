import { currentProfile } from '@/lib/currentProfile';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
export async function PATCH(
	req: Request,
	{ params }: { params: { memberId: string } }
) {
	try {
		const profile = await currentProfile();
		if (!profile) {
			return new NextResponse('Unauthorized', { status: 401 });
		}
		const { role, serverId } = await req.json();
		if (!serverId) {
			return new NextResponse('Server Id is Required', { status: 400 });
		}
		const server = await db.server.update({
			where: {
				id: serverId,
				profileId: profile.id,
			},
			data: {
				members: {
					update: {
						where: {
							id: params.memberId,
							profileId: {
								not: profile.id,
							},
						},
						data: {
							role,
						},
					},
				},
			},
			include: {
				members: {
					include: {
						profile: true,
					},
					orderBy: {
						role: 'asc',
					},
				},
			},
		});
		return NextResponse.json(server);
	} catch (err: any) {
		console.log('[API-MEMBER_PATCH]', err);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { memberId: string } }
) {
	try {
		const profile = await currentProfile();
		if (!profile) {
			return new NextResponse('Unauthorized', { status: 401 });
		}
		const { searchParams } = new URL(req.url);
		const serverId = searchParams.get('serverId');
		if (!serverId) {
			return new NextResponse('server Id missing', { status: 400 });
		}
		if (!params.memberId) {
			return new NextResponse('Member Id missing', { status: 400 });
		}
		const server = await db.server.update({
			where: {
				id: serverId,
				profileId: profile.id,
			},
			data: {
				members: {
					deleteMany: {
						id: params.memberId,
						profileId: {
							not: profile.id,
						},
					},
				},
			},
			include: {
				members: {
					include: {
						profile: true,
					},
					orderBy: {
						role: 'asc',
					},
				},
			},
		});
		return NextResponse.json(server);
	} catch (err) {
		console.log('[API-MEMBER_DELETE]', err);
		return new NextResponse('Internal error', { status: 500 });
	}
}
