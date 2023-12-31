import { Inter } from 'next/font/google'
import './globals.css'
import spotify_white_logo from '../assets/images/spotify_white_logo.png'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <div className='flex justify-center items-center gap-4 mt-10 pb-24'>
          <img src={spotify_white_logo.src} alt="" width={100} height={100} />
          <h1 className='font-bold text-4xl relative'>Spotify Back-Office <span className='text-sm absolute top-0'>&copy;</span> </h1>
      </div>
        {children}
        </body>
    </html>
  )
}
