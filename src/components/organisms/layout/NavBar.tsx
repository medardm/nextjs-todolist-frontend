'use client'

import Image from "next/image";
import logo from '@public/next.svg';
import {useReducer} from "react";
import {LoginForm} from "@/state-management/zustand/features/auth/components/LoginForm";
import {RegisterForm} from "@/state-management/zustand/features/auth/components/RegisterForm";
import {useAuthUser} from "@/state-management/zustand/features/auth/hooks/useAuth";
import {Modal} from "@/components/molecules/Modal";

export default function Navbar() {
  const [navOpen, toggleNav] = useReducer(navOpen => !navOpen, false);
  const [mobileMenuOpen1, toggleMobileMenu] = useReducer(mobileMenuOpen1 => !mobileMenuOpen1, false);

  const {user, logout} = useAuthUser();

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/*<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">*/}
          {/*  Mobile menu button*/}
          {/*  <button onClick={toggleMobileMenu} type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">*/}
          {/*    <span className="absolute -inset-0.5"></span>*/}
          {/*    <span className="sr-only">Open main menu</span>*/}
          {/*    Icon when menu is closed.*/}

          {/*    Menu open: "hidden", Menu closed: "block"*/}
          {/*    <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">*/}
          {/*      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />*/}
          {/*    </svg>*/}
          {/*    Icon when menu is open.*/}

          {/*    Menu open: "block", Menu closed: "hidden"*/}
          {/*    <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">*/}
          {/*      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />*/}
          {/*    </svg>*/}
          {/*  </button>*/}
          {/*</div>*/}
          <div className={`flex flex-1 items-center justify-start sm:items-stretch sm:justify-start`}>
            <div className="flex flex-shrink-0 items-center text-white">
              <Image
                src={logo}
                alt=''
                className='h-4 w-auto'
              />
              <h1 className="text-3xl font-bold">TodoList</h1>
            </div>

            {/*<div className="hidden sm:ml-6 sm:block">*/}
            {/*  <div className="flex space-x-4">*/}
            {/*    /!*Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white"*!/*/}
            {/*    <a href="#" className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">TodoLists</a>*/}
            {/*  </div>*/}
            {/*</div>*/}
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/*Profile dropdown*/}
            <div className="relative ml-3">
              <div className={`flex items-center justify-center text-white`}>
                {!user && <>
                    <Modal id='loginModal' buttonTxt='Login'>
                      <LoginForm/>
                    </Modal>
                    <Modal id='registerModal' buttonTxt='Register'>
                      <RegisterForm/>
                    </Modal>
                </>}

                {user && <button onClick={toggleNav} type="button"
                                 className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 items-center gap-2 p-1"
                                 id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <Image
                        src={"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                        alt=''
                        className='h-8 w-8 rounded-full'
                        width={100}
                        height={100}
                    />
                    <span>{ user.user.username }</span>
                </button>}
              </div>

              {/*Dropdown menu, show/hide based on menu state.

                Entering: "transition ease-out duration-100"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
                Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"*/}
              {user && <div
                  className={`${navOpen ? '' : 'hidden'} absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                  role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex={-1}>
                {/*Active: "bg-gray-100", Not Active: ""*/}
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1}
                     id="user-menu-item-0">Profile (TODO)</a>
                  <a href="#" onClick={() => {
                    toggleNav()
                    logout()
                  }} className="block px-4 py-2 text-sm text-gray-700" role="menuitem"
                     tabIndex={-1}
                     id="user-menu-item-2">Sign out</a>
              </div>}
            </div>
          </div>
        </div>
      </div>

      {/*Mobile menu, show/hide based on menu state.*/}
      {/*<div className={`${mobileMenuOpen1? '' : 'hidden'} sm:hidden`} id="mobile-menu">*/}
      {/*  <div className="space-y-1 px-2 pb-3 pt-2">*/}
      {/*    /!*Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white"*!/*/}
      {/*    <a href="#" className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">TodoList</a>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </nav>
  );
}
