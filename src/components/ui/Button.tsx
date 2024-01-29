import { Loader2 } from 'lucide-react';
import { ButtonHTMLAttributes } from 'react';

export interface ButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	isLoading?: boolean;
	variant?: 'default' | 'ghost';
	size?: 'default' | 'sm' | 'lg';
}

const getButtonClassNames = (
	variant: 'default' | 'ghost',
	size: 'default' | 'sm' | 'lg'
) => {
	const baseClasses =
		'inline-flex items-center justify-center rounded-md text-sm font-medium transition-color focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

	const variantClasses =
		variant === 'default'
			? 'bg-slate-700 text-white hover:bg-slate-600'
			: 'bg-transparent hover:text-slate-900 hover:bg-slate-200';

	const sizeClasses =
		size === 'default'
			? 'h-10 py-2 px-4'
			: size === 'sm'
			? 'h-9 px-2'
			: 'h-11 px-8';

	return `${baseClasses} ${variantClasses} ${sizeClasses}`;
};

const Button = ({
	className,
	children,
	variant = 'default',
	isLoading,
	size = 'default',
	...props
}: ButtonProps) => {
	const buttonClassNames = getButtonClassNames(variant, size);

	return (
		<button
			{...props}
			className={`${buttonClassNames} ${className}`}
			disabled={isLoading}
		>
			{isLoading ? (
				<Loader2 className='mr-2 h-4 w-4 animate-spin' />
			) : null}
			{children}
		</button>
	);
};

export default Button;

// import { VariantProps, cva } from 'class-variance-authority';
// import { Loader2 } from 'lucide-react';
// import { ButtonHTMLAttributes } from 'react';

// export interface ButtonProps
// 	extends ButtonHTMLAttributes<HTMLButtonElement>,
// 		VariantProps<typeof buttonVariants> {
// 	isLoading?: boolean;
// }

// const buttonVariants = cva(
// 	'active:scale-95 inline-flex items-center jusitfy-center rounded-md text-sm font-medium transition-color focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabeld:pointer-events-none',
// 	{
// 		variants: {
// 			variant: {
// 				default: 'bg-slate-900 text-white hover:bg-slate-800',
// 				ghost:
// 					'bg-transparent hover:text-slate-900 hover:bg-slate-200 '
// 			},
// 			size: {
// 				default: 'h-10 py-2 px-4',
// 				sm: 'h-9 px-2',
// 				lg: 'h-11 px-8'
// 			}
// 		},
// 		defaultVariants: {
// 			variant: 'default',
// 			size: 'default'
// 		}
// 	}
// );

// const Button = ({
// 	className,
// 	children,
// 	variant,
// 	isLoading,
// 	size,
// 	...props
// }: ButtonProps) => {
// 	return (
// 		<button {...props} className='' disabled={isLoading}>
// 			{isLoading ? (
// 				<Loader2 className='mr-2 h-4 w-4 animate-spin' />
// 			) : null}
// 			{children}
// 		</button>
// 	);
// };

// export default Button;
