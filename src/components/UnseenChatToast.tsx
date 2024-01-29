'use client';

import { chatHrefConstructor } from '@/lib/utils';
import Image from 'next/image';
import toast, { type Toast } from 'react-hot-toast';

interface UnseenChatToastProps {
	t: Toast;
	sessionId: string;
	senderId: string;
	senderImg: string;
	senderName: string;
	senderMessage: string;
}

const UnseenChatToast = ({
	t,
	sessionId,
	senderId,
	senderImg,
	senderName,
	senderMessage
}: UnseenChatToastProps) => {
	return (
		<div
			className={`flex ring-1 ring-blue-900 ring-opacity-5 max-w-md w-full bg-gray-900 shadow-lg rounded-lg pointer-events-auto
      ${t.visible ? 'animate-enter' : 'animate-leave'}
      `}
		>
			<a
				onClick={() => toast.dismiss(t.id)}
				href={`/dashboard/chat/${chatHrefConstructor(
					sessionId,
					senderId
				)}`}
				className='flex-1 w-0 p-4'
			>
				<div className='flex items-start'>
					<div className='flex-shrink-0 pt-0.5'>
						<div className='relative h-10 w-10'>
							<Image
								fill
								referrerPolicy='no-referrer'
								className='roudned-full'
								src={senderImg}
								alt={`${senderName}'s profile picture`}
							/>
						</div>
					</div>
					<div className='flex-1 ml-3'>
						<p className='text-sm font-medium text-gray-300'>
							{senderName}
						</p>
						<p className='mt-1 text-sm text-gray-500'>
							{senderMessage}
						</p>
					</div>
				</div>
			</a>

			<div className='flex border-l border-gray-700'>
				<button
					onClick={() => toast.dismiss(t.id)}
					className='flex items-center justify-center w-full text-sm font-medium text-indigo-600 hover:text-indigo-500 border border-transparent rounded-none rounded-r-lg p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500'
        >
          Close
        </button>
			</div>
		</div>
	);
};

export default UnseenChatToast;
