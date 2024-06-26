import { currentProfile } from '@/lib/currentProfile';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';

export default async function InviteCodePage({
	params,
}: {
	params: { inviteCode: string };
}) {
	const profile = await currentProfile();
	if (!profile) {
		return redirect(`${process.env.NEXT_PUBLIC_APP_URL}/sign-in`);
	}

	if (!params.inviteCode) return redirect('/');

	const existingUser = await db.server.findFirst({
		where: {
			inviteCode: params.inviteCode,
			members: {
				some: {
					profileId: profile.id,
				},
			},
		},
	});

	if (existingUser) return redirect(`/servers/${existingUser.id}`);

	const server = await db.server.update({
		where: {
			inviteCode: params.inviteCode,
		},
		data: {
			members: {
				create: [
					{
						profileId: profile.id,
					},
				],
			},
		},
	});

	if (server) return redirect(`/servers/${server.id}`);
	return null;
}
