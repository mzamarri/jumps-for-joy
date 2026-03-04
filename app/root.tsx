import { useState } from 'react'
import { BookingProvider } from 'context/BookingContext'
import logo from '/logo.png'
import bhLogo from '/bouncehouse_logo.png'
import {
    NavLink,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration
} from "react-router"

export function Layout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Jump For Joy Inflatables</title>
                <Meta />
                <Links />
            </head>
            <body>
                { children }
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    )
}

// Need to change NavBar functionality with react-router to route properly
const navTabs = [
    {
        id: "home",
        path: "/",
        label: "Home",
    },
    {
        id: "rentals",
        path: "/rentals",
        label: "Rentals",
    },
    {
        id: "more",
        path: "/",
        label: "More",
    },
    {
        id: "cart",
        path: "/cart",
        label: "Cart",
    }
]
export default function Root() {
    return (
        <div className='bg-gray-100'>
            <BookingProvider>
                <div className="min-h-screen" style={{"--h-nav": "4rem"}}>
                    <NavBar/>
                    <Outlet/>
                </div>
            </BookingProvider>
            <Footer/>
        </div>
    );
}

function NavBar() {
    return (
        <header className='h-(--h-nav) sticky z-1 top-0 bg-brand-blue flex justify-between text-white'>
            <div className='flex items-center gap-4'>
                <img src={bhLogo} alt="Logo Image" className="h-full bg-blue"/>
                <h1 className='text-xl'>Jump For Joy Inflatables</h1>
            </div>
            <nav className=''>
                <ul className='h-full flex justify-end'>
                    {
                        navTabs.map(tab => {
                            return (
                                <NavLink 
                                    key={tab.id}
                                    to={tab.path}
                                    className={({ isActive }) => `h-full flex justify-center items-center px-6 ${
                                        isActive ? "bg-brand-blue-dark" : "bg-brand-blue"
                                    }`}
                                >
                                    {tab.label}
                                </NavLink>
                            )
                        })
                    }
                </ul>
            </nav>
        </header>
    )
}

function Footer() {
    return (
        <footer className='bg-brand-blue'>
            <div className='flex justify-center items-center h-100'>
                <h1 className='text-white p-4'>
                    Footer Goes Here
                </h1>
            </div>
        </footer>
    )
}
