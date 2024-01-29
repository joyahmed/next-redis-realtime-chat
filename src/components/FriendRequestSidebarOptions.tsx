'use client';

import { pusherClient } from '@/lib/pusher';
import { toPusherKey } from '@/lib/utils';
import { User } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface FriendRequestSidebarOptionsProps {
	sessionId: string;
	initialUnseenRequestCount: number;
}
const FriendRequestSidebarOptions = ({
	sessionId,
	initialUnseenRequestCount
}: FriendRequestSidebarOptionsProps) => {
	const [unseenRequestCount, setUnseenRequestCount] =
		useState<number>(initialUnseenRequestCount);

	useEffect(() => {
		pusherClient.subscribe(
			toPusherKey(`user:${sessionId}:incoming_friend_requests`)
		);
		pusherClient.subscribe(toPusherKey(`user:${sessionId}:friends`));

		const friendRequestHandler = () => {
			setUnseenRequestCount(prev => prev + 1);
		};

		const addedFriendHandler = () => {
			setUnseenRequestCount(prev => prev - 1);
		};

		pusherClient.bind(
			'incoming_friend_requests',
			friendRequestHandler
		);
		pusherClient.bind('new_friend', addedFriendHandler);

		return () => {
			pusherClient.unsubscribe(
				toPusherKey(`user:${sessionId}:incoming_friend_requests`)
			);
			pusherClient.unsubscribe(
				toPusherKey(`user:${sessionId}:friends`)
			);

			pusherClient.unbind('new_friend', addedFriendHandler);
			pusherClient.unbind(
				'incoming_friend_requests',
				friendRequestHandler
			);
		};
	}, [sessionId]);

	return (
		<Link
			href='/dashboard/requests'
			className='flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-300 hover:text-indigo-400 hover:bg-indigo-500 group'
		>
			<div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-gray-300 border-gray-700 group-hover:border-indigo-600 group-hover:text-indigo-600 border text-[0.625rem] font-medium bg-red-500'>
				<User className='h-4 w-4' />
			</div>
			<p className='truncate'>Friend Requests</p>

			{unseenRequestCount > 0 ? (
				<div className='flex items-center justify-center text-white bg-indigo-600 rounded-full w-5 h-5 text-xs'>
					{unseenRequestCount}
				</div>
			) : null}
		</Link>
	);
};

export default FriendRequestSidebarOptions;
