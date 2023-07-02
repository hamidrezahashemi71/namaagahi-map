import './globals.css'

import localFont from 'next/font/local'
 
const sahel = localFont({
  src: [
    {
      path: '../public/font/Sahel-FD.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/font/Sahel-Bold-FD.ttf',
      weight: '600',
      style: 'bold',
    },
  ],
})
export const metadata = {
  title: 'لوکیشن بیلبوردهای نماآگهی',
  description: 'بیلبوردهای فعال نماآگهی',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir='rtl' className={sahel.className}>
      <body className={sahel.className}>{children}</body>
    </html>
  )
}
