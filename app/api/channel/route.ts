import { currentProfile } from '@/lib/currentProfile';
import { db } from '@/lib/db';
import { MemberRole } from '@prisma/client';
import { NextResponse } from 'next/server';
export async function POST(req: Request) {
	try {
		const profile = await currentProfile();
		if (!profile) {
			return new NextResponse('Unauthorized', { status: 401 });
		}
		const { name, type } = await req.json();
		const { searchParams } = new URL(req.url);
		const serverId = searchParams.get('serverId');
		if (!serverId) {
			return new NextResponse('server Id missing', { status: 400 });
		}

		const server = await db.server.update({
			where: {
				id: serverId,
				members: {
					some: {
						profileId: profile.id,
						role: {
							in: [MemberRole.ADMIN, MemberRole.MODERATOR],
						},
					},
				},
			},
			data: {
				channels: {
					create: {
						profileId: profile.id,
						name,
						type,
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
