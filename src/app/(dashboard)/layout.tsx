import FriendRequestSidebarOptions from '@/components/FriendRequestSidebarOptions';
import { Icon, Icons } from '@/components/Icons';
import SidebarChatList from '@/components/SidebarChatList';
import SignOutButton from '@/components/SignOutButton';
import { getFriendsByUserid } from '@/helpers/get-friends-by-user-id';
import { fetchRedis } from '@/helpers/redis';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';

interface LayoutProps {
	children: ReactNode;
}

interface SidebarOption {
	id: number;
	name: string;
	href: string;
	Icon: Icon;
}

const sidebarOptions: SidebarOption[] = [
	{
		id: 1,
		name: 'Add friend',
		href: '/dashboard/add',
		Icon: 'UserPlus'
	}
];

const Layout = async ({ children }: LayoutProps) => {
	const session = await getServerSession(authOptions);

	if (!session) notFound();

	const friends = await getFriendsByUserid(session.user.id);

	const unseenRequestCount = (
		(await fetchRedis(
			'smembers',
			`user:${session.user.id}:incoming_friend_requests`
		)) as User[]
	).length;

	return (
		<SkeletonTheme baseColor='#313131' highlightColor='#525252'>
			<div className='flex w-full h-screen'>
				<div className='flex h-full w-full max-w-xs grow flex-col gap-y-5 overflow-y-auto border-r border-gray-700 bg-black px-6'>
					<Link
						href='/dashboard'
						className='flex h-16 shrink-0 items-center'
					>
						<Icons.Logo className='h-8 w-auto text-amber-600' />
					</Link>
					{friends.length > 0 ? (
						<div className='text-xs font-semibold leading-6 text-gray-300'>
							Your Chats
						</div>
					) : null}

					<nav className='flex flex-1 flex-col'>
						<ul role='list' className='flex flex-1 flex-col gap-y-7'>
							<li>
								<SidebarChatList
									{...{ friends, sessionId: session.user.id }}
								/>
							</li>
							<li>
								<div className='text-xs font-semibold leading-6 text-gray-300'>
									Overview
								</div>
								<ul role='list' className='-mx-2 mt-2 space-y-1'>
									{sidebarOptions.map(option => {
										const Icon = Icons[option.Icon];
										return (
											<li key={option.id}>
												<Link
													href={option.href}
													className='flex text-gray-300 hover:text-indigo-200 hover:bg-indigo-500 gap-3 rounded-md p-2 text-sm leading-6 font-semibold group'
												>
													<span className='flex items-center justify-center h-6 w-6 text-gray-300 border-gray-700  group-hover:border-indigo-600 group-hover:text-white shrink-0 rounded-lg text-[0.625rem] font-medium bg-green-400'>
														<Icon className='h-4 w-4' />
													</span>
													<span className='truncate'>
														{option.name}
													</span>
												</Link>
											</li>
										);
									})}
									<li>
										<FriendRequestSidebarOptions
											{...{
												sessionId: session.user.id,
												initialUnseenRequestCount: unseenRequestCount
											}}
										/>
									</li>
								</ul>
							</li>
							<li className='flex items-center -mx-6 mt-auto'>
								<div className='flex flex-1 items-center gap-x-4 px-6 text-sm font-semibold leading-6 text-gray-900'>
									<div className='relative h-8 w-8'>
										<Image
											referrerPolicy='no-referrer'
											src={session.user.image || ''}
											alt='Your profile picture'
											fill
											className='rounded-full'
										/>
									</div>
									<span className='sr-only'>Your Profile</span>
									<div className='flex flex-col'>
										<span
											aria-hidden='true'
											className='text-zinc-300'
										>
											{session.user.name}
										</span>
										<span
											className='text-xs text-zinc-300'
											aria-hidden='true'
										>
											{session.user.email}
										</span>
									</div>
								</div>

								<SignOutButton className='h-full aspect-square' />
							</li>
						</ul>
					</nav>
				</div>
				<aside className='max-h-screen container py-16 md:py-12 w-full'>
					{children}
				</aside>
			</div>
		</SkeletonTheme>
	);
};

export default Layout;
