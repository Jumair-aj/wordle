'use client'

import '@styles/globals.css'

export const metadata = {
    title: 'Wordle',
    description: 'Play & Learn Words'
}

export default function RootLayout({ children }) {

    return (
        <html lang='en'>

            <body>
                <main>
                    {children}
                </main>
            </body>
        </html>
    )
}
