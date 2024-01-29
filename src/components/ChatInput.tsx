'use client';
import axios from 'axios';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import TextareaAutosize from 'react-textarea-autosize';
import Button from './ui/Button';

interface ChatInputProps {
	chatPartner: User;
	chatId: string;
}

const ChatInput = ({ chatPartner, chatId }: ChatInputProps) => {
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);
	const [input, setInput] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const sendMessage = async () => {
		setIsLoading(true);
		if (!input) return;
		try {
			await axios.post('/api/message/send', { text: input, chatId });
			setInput('');
			textareaRef.current?.focus();
		} catch (error: any) {
			toast.error('Something went wrong. Please try again later.');
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div className='border-t border-gray-700 px-4 pt-4 mb-2 sm:mb-0'>
			<div className='relative flex-1 overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-700 focus-within:ring-px focus-within:ring-indigo-600'>
				<TextareaAutosize
					ref={textareaRef}
					onKeyDown={e => {
						if (e.key === 'Enter' && !e.shiftKey) {
							e.preventDefault();
							sendMessage();
						}
					}}
					rows={1}
					value={input}
					onChange={e => setInput(e.target.value)}
					placeholder={`Message ${chatPartner.name}`}
					className='block w-full resize-none border-0 bg-transparent text-gray-300 placeholder:text-gray-500 focus:ring-0 sm:py-5 sm:text-sm'
				/>

				<div
					onClick={() => textareaRef.current?.focus()}
					className='py-2'
					aria-hidden='true'
				>
					<div className='py-px'>
						<div className='h-9' />
					</div>
				</div>

				<div className='absolute right-0 bottom-0 flex justify-between py-2 pl-3 pr-2'>
					<div className='flex-shrink-0'>
						<Button
							{...{ isLoading, onClick: sendMessage }}
							type='submit'
						>
							Send
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatInput;
