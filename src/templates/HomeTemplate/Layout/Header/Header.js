import React from "react";
import { NavLink } from "react-router-dom";
import { history } from "../../../../App";

export default function Header(props) {
	return (
		<header className=' p-4 bg-black bg-opacity-50 text-white fixed z-40 w-full'>
			<div className='container mx-auto flex justify-between h-16 '>
				<NavLink
					rel='noopener noreferrer'
					to='/'
					aria-label='Back to homepage'
					className='flex items-center p-2'>
					<img
						src='https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png'
						alt='cyberlearn.vn'
					/>
				</NavLink>
				<ul className='items-stretch hidden space-x-3 lg:flex'>
					<li className='flex'>
						<NavLink
							rel='noopener noreferrer'
							to='/home'
							className='flex items-center px-4 -mb-1 border-b-2 border-transparent text-white '
							activeClassName='border-b-2 border-white'>
							Trang chủ
						</NavLink>
					</li>
					<li className='flex'>
						<NavLink
							rel='noopener noreferrer'
							to='/contact'
							className='flex items-center px-4 -mb-1 border-b-2 border-transparent text-white'
							activeClassName='border-b-2 border-white'>
							Liên hệ
						</NavLink>
					</li>
					<li className='flex'>
						<NavLink
							rel='noopener noreferrer'
							to='/news'
							className='flex items-center px-4 -mb-1 border-b-2 border-transparent  text-white'
							activeClassName='border-b-2 border-white'>
							Tin tức
						</NavLink>
					</li>
				</ul>
				<div className='items-center flex-shrink-0 hidden lg:flex'>
					<button
						className='self-center px-8 py-3 rounded hover:text-violet-400 mr-2 duration-300'
						onClick={() => {
							history.push("/login");
						}}>
						Đăng nhập
					</button>
					<button
						className='self-center px-8 py-3 font-semibold rounded border-transparent dark:bg-violet-400 hover:bg-transparent border-2 hover:border-violet-400 duration-300'
						onClick={() => {
							history.push("/register");
						}}>
						Đăng ký
					</button>
				</div>
				<button className='p-4 lg:hidden'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
						className='w-6 h-6 dark:text-coolGray-100'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M4 6h16M4 12h16M4 18h16'
						/>
					</svg>
				</button>
			</div>
		</header>
	);
}
