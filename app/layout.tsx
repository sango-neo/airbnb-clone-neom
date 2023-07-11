import './globals.css'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import Navbar from './components/navbar/Navbar';
import ClientOnly from './components/ClientOnly';
import Modal from './components/modals/Modal';
import RegisterModal from './components/modals/RegisterModal';
import { Toaster } from 'react-hot-toast';
import ToasterProvider from './providers/ToastProvider';
import LoginModal from './components/modals/LoginModal';
import getCurrentUser from './actions/getCurrentUser';
import { User } from '@prisma/client';
import RentModal from './components/modals/RentModal';
import SearchModal from './components/modals/SearchModal';

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AirBnB Clone',
  description: 'A dive into Next-13 Dev',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ClientOnly>
          <ToasterProvider />
          <SearchModal />
          <LoginModal />
          <RentModal />
          <RegisterModal />
          <Navbar currentUser={currentUser}  />
        </ClientOnly>
        <div className='pb-20 pt-28'>
          {children}
        </div>
      </body>
    </html>
  )
}
