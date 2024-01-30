'use server'

import { getFriendsByUserid } from '@/helpers/get-friends-by-user-id';
import { fetchRedis } from '@/helpers/redis';
import { authOptions } from '@/lib/auth';
import { chatHrefConstructor } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// export const runtime = 'edge'

const Dashboard = async () => {
	const session = await getServerSession(authOptions);

	if (!session) return notFound();

	const friends = await getFriendsByUserid(session.user.id);

	const friendsWithLastMessage = await Promise.all(
		friends.map(async friend => {
			const [lastMessageRaw] = (await fetchRedis(
				'zrange',
				`chat:${chatHrefConstructor(
					session.user.id,
					friend.id
				)}:messages`,
				-1,
				-1
			)) as string[];

			const lastMessage =
				lastMessageRaw && (JSON.parse(lastMessageRaw) as Message);

			return {
				...friend,
				lastMessage
			};
		})
	);


	return (
		<div className='container py-12'>
			<h1 className='font-bold text-5xl mb-8'>Recent Chats</h1>
			{friendsWithLastMessage.length === 0 ? (
				<p className='text-sm text-zinc-200'>
					Nothing to show here...
				</p>
			) : (
				friendsWithLastMessage.map(friend => (
					<div
						key={friend.id}
						className='relative bg-zinc-700 border-zinc-800 p-3 rounded-md'
					>
						<div className='flex items-center absolute right-4 inset-y-0'>
							<ChevronRight className='w-7 h-7 text-zinc-200' />
						</div>
						<Link
							href={`/dashboard/chat/${chatHrefConstructor(
								session.user.id,
								friend.id
							)}`}
							className='relative sm:flex'
						>
							<div className='flex-shrink-0 mb-4 sm:mb-0 sm:mr-4'>
								<div className='relative w-6 h-6'>
									<Image
										referrerPolicy='no-referrer'
										src={friend.image}
										alt={`${friend.name} profile picture`}
										fill
									/>
								</div>
							</div>
							<div className=''>
								<h4 className='text-lg -font-semibold'>
									{friend.name}
								</h4>
								<p className='mx-1 max-w-md'>
									{friend.lastMessage ? (
										<>
											<span className='text-zinc-200'>
												{friend?.lastMessage?.senderId ===
												session.user.id
													? 'You: '
													: ''}
											</span>
											{friend.lastMessage.text}
										</>
									) : null}
								</p>
							</div>
						</Link>
					</div>
				))
			)}
		</div>
	);
};

export default Dashboard;
