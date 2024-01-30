'use client';

import Button from '@/components/ui/Button';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface SigninProps {}

const Signin = ({}: SigninProps) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const loginWithGoogle = async () => {
		setIsLoading(true);
		try {
			await signIn('google');
		} catch (error) {
			// display error message to user
			toast.error('Something went wrong with your login.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<div className='flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8'>
				<div className='w-full flex flex-col items-center max-w-md space-y-8'>
					<div className='flex flex-col items-center gap-8'>
						<svg
							height='800px'
							width='800px'
							version='1.1'
							id='Layer_1'
							xmlns='http://www.w3.org/2000/svg'
							xmlnsXlink='http://www.w3.org/1999/xlink'
							viewBox='0 0 511.999 511.999'
							xmlSpace='preserve'
							className='w-28 h-28'
						>
							<path
								style={{ fill: '#CEE8FA' }}
								d='M497.847,428.814V219.932H241.394v208.882h130.583c15.255,30.395,47.302,47.583,79.916,44.968
	c-0.848-1.681-1.664-3.39-2.408-5.152c-5.49-13.027-7.36-26.671-6.073-39.817h54.435V428.814z'
							/>
							<g>
								<path
									style={{ fill: '#2D527C' }}
									d='M445.372,488.197c-33.645,0-64.185-17.122-81.671-45.229H241.394
		c-7.816,0-14.154-6.337-14.154-14.154V219.932c0-7.817,6.338-14.154,14.154-14.
154h256.452c7.816,0,14.154,6.337,14.154,14.154
		v208.882c0,7.817-6.338,14.154-14.154,14.154h-40.373c0.643,6.908,2.342,13.728,5.056,20.168c0.532,1.262,1.168,2.62,2.001,4.273
		c2.123,4.208,2.013,9.197-0.296,13.306c-2.308,4.11-6.511,6.801-11.208,7.177C450.49,488.095,447.916,488.197,445.372,488.197z
		 M255.548,414.661h116.431c5.353,0,10.249,3.02,12.651,7.804c9.449,18.826,26.673,31.836,46.742,35.996
		c-2.352-10.152-3.06-20.659-2.044-31.025c0.709-7.248,6.804-12.775,14.086-12.775h40.28V234.085H255.548V414.661z'
								/>
								<path
									style={{ fill: '#2D527C' }}
									d='M54.74,394.847c-15.798,0-31.704-3.371-46.575-10.318c-4.27-1.994-7.268-5.983-7.994-10.639
		c-0.729-4.657,0.91-9.37,4.368-12.571c1.632-1.51,2.926-2.781,4.072-3.997c21.707-23.035,28.248-55.764,17.071-85.413
		c-0.375-0.995-0.633-2.018-0.776-3.052c-8.41-21.065-12.672-43.326-12.672-66.229c0-98.604,80.222-178.826,178.826-178.826
		c67.998,0,129.241,37.758,159.829,98.539c3.513,6.982,0.702,15.491-6.281,19.006c-6.979,3.512-15.493,0.703-19.006-6.281
		c-25.75-51.168-77.304-82.956-134.543-82.956c-82.997,0-150.518,67.523-150.518,150.518c0,20.37,3.997,40.123,11.879,58.709
		c0.585,1.377,0.94,2.819,1.069,4.274c11.51,34.024,5.936,70.652-14.618,99.388c26.448,5.223,54.465-2.838,74.069-22.422
		c4.172-4.17,10.492-5.315,15.865-2.87c15.394,7.003,31.764,11.322,48.657,12.833c7.786,0.696,13.532,7.574,12.835,15.36
		c-0.696,7.786-7.565,13.541-15.36,12.835c-16.932-1.516-33.427-5.404-49.158-11.579C105.632,385.999,80.331,394.847,54.74,394.847z
		'
								/>
							</g>
						</svg>

						<h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-300'>
							Sign in to your account
						</h2>
					</div>
					<Button
						isLoading={isLoading}
						type='button'
						className='max-w-sm mx-auto w-full'
						onClick={loginWithGoogle}
					>
						{isLoading ? null : (
							<svg
								className='mr-2 h-4 w-4'
								aria-hidden='true'
								focusable='false'
								data-prefix='fab'
								data-icon='github'
								role='img'
								viewBox='0 0 24 24'
							>
								<path
									d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
									fill='#4285F4'
								/>
								<path
									d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
									fill='#34A853'
								/>
								<path
									d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
									fill='#FBBC05'
								/>
								<path
									d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
									fill='#EA4335'
								/>
								<path d='M1 1h22v22H1z' fill='none' />
							</svg>
						)}
						Google
					</Button>
				</div>
			</div>
		</>
	);
};

export default Signin;
