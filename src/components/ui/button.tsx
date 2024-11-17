// src/components/ui/button.tsx
import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'default' | 'ghost'
	size?: 'default' | 'icon'
	className?: string
}

export const Button: React.FC<ButtonProps> = ({
	variant = 'default',
	size = 'default',
	className = '',
	children,
	...props
}) => {
	const baseStyles = 'rounded-lg font-medium transition-colors'
	const variantStyles = {
		default: 'bg-blue-500 text-white hover:bg-blue-600',
		ghost: 'bg-transparent hover:bg-gray-700'
	}
	const sizeStyles = {
		default: 'px-4 py-2',
		icon: 'p-2'
	}

	return (
		<button
			className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
			{...props}
		>
			{children}
		</button>
	)
}