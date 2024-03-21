import React from 'react'
import {Avatar,Button,Dropdown, Navbar,TextInput} from 'flowbite-react';
import {Link, useLocation } from 'react-router-dom';
import {AiOutlineSearch} from 'react-icons/ai';
import {FaMoon, FaSun} from 'react-icons/fa';
import {useSelector,useDispatch} from 'react-redux';
import {toggleTheme} from '../redux/theme/themeSlice';

export default function Header() {
    const path = useLocation().pathname;
    const dispatch = useDispatch();
    const {currentUser} = useSelector((state) => state.user);
    const {theme} = useSelector((state) => state.theme);
  return (
    <Navbar className='border-b-2 bg-gray-800'>
        <Link to = '/' 
              className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
            <span 
              className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white '
            >Tech</span>
            <span className='text-red-600 font-bold'>Trekker</span>
        </Link>
            <TextInput
            type = 'text'
            placeholder = "search"
            rightIcon = {AiOutlineSearch}
            className='hidden lg:inline'
        />
        <Button className='w-12 h-10 lg:hidden' color="gray" pill>
            <AiOutlineSearch/>
        </Button>

        <div className="flex gap-3 md:order-2">
                <Button className='w-12 h-10 hidden sm:inline' color='gray'
                     onClick={() => dispatch(toggleTheme())} >
                        {theme ==='light' ? <FaSun/> :  <FaMoon/>}
                </Button>
                {currentUser ? (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                        <Avatar alt='user' img={currentUser.profilePicture} rounded />
                        }
                    >
                        <Dropdown.Header>
                        <span className='block text-sm'>@{currentUser.username}</span>
                        <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
                        </Dropdown.Header>
                        <Link to={'/dashboard?tab=profile'}>
                        <Dropdown.Item className='hover:bg-red-500 font-bold'>Profile</Dropdown.Item>
                        </Link>
                        <Dropdown.Divider />
                        <Dropdown.Item className='hover:bg-red-500 font-bold'>Sign out</Dropdown.Item>
                    </Dropdown>
                 ) : (
                    <Link to='/sign-in'>
                        <Button outline gradientDuoTone="purpleToPink">
                            Sign In
                        </Button>
                    </Link>
                )}
                <Navbar.Toggle className='text-red-600'/>
        </div>
        <Navbar.Collapse >
                    <Navbar.Link active={path === "/"} as={'div'}>
                        <Link to = "/" className='text-white text-xl hover:text-red-600'>Home</Link>
                    </Navbar.Link>

                    <Navbar.Link active={path === "/about"} as={'div'}>
                        <Link to = "/about" className='text-white text-xl hover:text-red-600'>About</Link>
                    </Navbar.Link>

                    <Navbar.Link active={path === "/projects"} as={'div'}>
                        <Link to = "/projects" className='text-white text-xl hover:text-red-600'>Projects</Link>
                    </Navbar.Link>
        </Navbar.Collapse>
    </Navbar>
  )
}
