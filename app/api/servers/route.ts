import { currentProfile } from '@/lib/currentProfile';
import { db } from '@/lib/db';
import { MemberRole } from '@prisma/client';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
export async function POST(req: Request) {
	try {
		const { name, imageUrl } = await req.json();
		const profile = await currentProfile();
		if (!profile) {
			return new NextResponse('Unauthorized', { status: 401 });
		}
		const server = await db.server.create({
			data: {
				profileId: profile.id,
				name,
				imageUrl,
				inviteCode: uuidv4(),
				channels: {
					create: [
						{
							name: 'general',
							profileId: profile.id,
						},
					],
				},
				members: {
					create: [{ profileId: profile.id, role: MemberRole.ADMIN }],
				},
			},
		});
		console.log(server);
		return NextResponse.json(server);
	} catch (err: any) {
		console.log('[API-SERVERS_POST]', err);
		return new NextResponse('Internal error', { status: 500 });
	}
}
