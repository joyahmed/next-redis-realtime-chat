'use client';

import { pusherClient } from '@/lib/pusher';
import { chatHrefConstructor, toPusherKey } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import UnseenChatToast from './UnseenChatToast';

interface SidebarChatListProps {
	friends: User[];
	sessionId: string;
}

interface ExtendedMessage extends Message {
	senderImg: string;
	senderName: string;
}

const SidebarChatList = ({
	friends,
	sessionId
}: SidebarChatListProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const [unseenMessages, setUnseenMessages] = useState<Message[]>([]);

	useEffect(() => {
		// console.log('event triggered');

		pusherClient.subscribe(toPusherKey(`user:${sessionId}:chats`));
		pusherClient.subscribe(toPusherKey(`user:${sessionId}:friends`));

		const newFriendHandler = () => {
			router.refresh();
		};

		const chatHandler = (message: ExtendedMessage) => {
			const shouldNotify =
				pathname !==
				`/dashboard/chat/${chatHrefConstructor(
					sessionId,
					message.senderId
				)}`;

			if (!shouldNotify) return;

			// should be notified
			toast.custom(t => (
				<UnseenChatToast
					{...{
						t,
						sessionId,
						senderId: message.senderId,
						senderImg: message.senderImg,
						senderMessage: message.text,
						senderName: message.senderName
					}}
				/>
			));

			setUnseenMessages(prev => [...prev, message]);
		};

		pusherClient.bind('new_message', chatHandler);
		pusherClient.bind('new_friend', newFriendHandler);

		return () => {
			pusherClient.unsubscribe(
				toPusherKey(`user:${sessionId}:chats`)
			);
			pusherClient.unsubscribe(
				toPusherKey(`user:${sessionId}:friends`)
			);

			pusherClient.unbind('new_message', chatHandler);
			pusherClient.unbind('new_friend', newFriendHandler);
		};
	}, [pathname, sessionId, router]);

	useEffect(() => {
		if (pathname.includes('chat')) {
			setUnseenMessages(prev => {
				return prev.filter(msg => !pathname.includes(msg.senderId));
			});
		}
	}, [pathname]);

	return (
		<ul
			role='list'
			className='max-h-[25rem] overflow-y-auto -mx-2 space-y-1'
		>
			{friends.sort().map(friend => {
				const unseenMessagesCount = unseenMessages.filter(
					unseenMsg => {
						return unseenMsg.senderId === friend.id;
					}
				).length;

				return (
					<li key={friend.id}>
						<a
							href={`/dashboard/chat/${chatHrefConstructor(
								sessionId,
								friend.id
							)}`}
							className='flex items-center text-gray-300 hover:text-white/90 hover:bg-blue-600 gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold group'
						>
							{friend.name}
							{unseenMessagesCount > 0 ? (
								<div className='flex items-center justify-center bg-indigo-600 font-medium text-xs text-white w-4 h-4 rounded-full'>
									{unseenMessagesCount}
								</div>
							) : null}
						</a>
					</li>
				);
			})}
		</ul>
	);
};

export default SidebarChatList;
