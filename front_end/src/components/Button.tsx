import clsx from 'clsx'
import { FC, ButtonHTMLAttributes } from 'react'

export const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  disabled,
  ...props
}) => {
  return (
    <>
      <div className="relative h-10 group w-36">
        <div
          className={clsx(
            'infinite absolute inset-0 h-[44px] w-[148px] -translate-x-[2px] -translate-y-[2px] rounded-full  bg-gradient bg-[length:500%_500%] bg-left-top blur transition ease-linear group-hover:animate-gradient-position group-active:scale-95 group-active:animate-gradient-position',
            disabled && 'bg-none'
          )}
        ></div>
        <div
          className={clsx(
            'infinite absolute inset-0 h-[42px] w-[146px] -translate-x-[1px] -translate-y-[1px] rounded-full bg-white bg-[length:500%_500%] bg-left-top opacity-100 transition ease-linear group-hover:animate-gradient-position group-hover:bg-gradient group-hover:blur-none group-active:scale-95 group-active:animate-gradient-position group-active:bg-gradient group-active:blur-none',
            disabled && 'bg-gray-400 group-hover:bg-none  group-active:bg-none'
          )}
        ></div>
        <button
          className={clsx(
            'relative flex h-[38px] w-[142px] translate-x-[1px] translate-y-[1px] items-center justify-center overflow-x-hidden rounded-full bg-black px-4 text-xs text-white transition disabled:cursor-not-allowed disabled:text-gray-500 group-active:scale-95 group-active:bg-transparent',
            className
          )}
          disabled={disabled}
          {...props}
        >
          {children}
        </button>
      </div>
    </>
  )
}
