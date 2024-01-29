'use client';

import { pusherClient } from '@/lib/pusher';
import { toPusherKey } from '@/lib/utils';
import { format } from 'date-fns';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface MessagesProps {
	initialMessages: Message[];
	sessionId: string;
	chatId: string;
	sessionImg: string | null | undefined;
	chatPartner: User;
}

const Messages = ({
	initialMessages,
	sessionId,
	chatId,
	sessionImg,
	chatPartner
}: MessagesProps) => {
	const [messages, setMessages] =
		useState<Message[]>(initialMessages);

	useEffect(() => {
		pusherClient.subscribe(toPusherKey(`chat:${chatId}`));

		const messageHandler = (message: Message) => {
			setMessages(prev => [message, ...prev]);
		};

		pusherClient.bind('incoming-message', messageHandler);

		return () => {
			pusherClient.unsubscribe(toPusherKey(`chat${chatId}`));

			pusherClient.unbind('incoming-message', messageHandler);
		};
	}, [chatId]);

	const scrollDownRef = useRef<HTMLDivElement | null>(null);

	const formatTimestamp = (timestamp: number) => {
		return format(timestamp, 'HH:mm');
	};

	return (
		<div
			id='messages'
			className='flex flex-1 flex-col-reverse h-full gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'
		>
			<div ref={scrollDownRef} />
			{messages.map((message, index) => {
				const isCurrentUser = message.senderId === sessionId;
				const hasNextMessageFromSameUser =
					messages[index - 1]?.senderId === messages[index].senderId;

				return (
					<div key={`${message.id}-${message.timestamp}`}>
						<div
							className={`flex items-end ${
								isCurrentUser ? 'justify-end' : ''
							}`}
						>
							<div
								className={`flex flex-col space-y-2 text-base max-w-xs mx-2
                ${
									isCurrentUser
										? 'order-1 items-end'
										: 'order-2 items-start'
								}
                `}
							>
								<span
									className={`px-4 py-2 rounded-lg inline-block text-white ${
										isCurrentUser ? 'bg-indigo-600' : 'bg-gray-700'
									}
                    ${
											!hasNextMessageFromSameUser
												? isCurrentUser
													? 'rounded-br-none'
													: 'rounded-bl-none'
												: ''
										}
                    `}
								>
									{message.text}{' '}
									<span className='ml-2 text-xs text-gray-300'>
										{formatTimestamp(message.timestamp)}
									</span>
								</span>
							</div>
							<div
								className={`relative w-6 h-6 ${
									isCurrentUser ? 'order-2' : 'order-1'
								}
								${hasNextMessageFromSameUser ? 'invisible' : ''}
									`}
							>
								<Image
									src={
										isCurrentUser
											? (sessionImg as string)
											: chatPartner.image
									}
									alt='Profile Piecure'
									fill
									referrerPolicy='no-referrer'
									className='rounded-full'
								/>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default Messages;
