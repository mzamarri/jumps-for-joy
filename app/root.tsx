import { BookingProvider } from 'context/BookingContext'
import bhLogo from '/logo.png'
import {
    NavLink,
    Link,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration
} from "react-router"
import { ShoppingCart, Mail, Phone, MapPin, Clock3 } from 'lucide-react'
import Dropdown from 'components/ui_features/Dropdown'

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
        label: "More",
        tabs: [
            {
                id: "about",
                path: "/about",
                label: "About Us",
            },
            {
                id: "faq",
                path: "/faq",
                label: "FAQ",
            },
            {
                id: "contact",
                path: "/contact",
                label: "Contact",
            },
        ]
    },
    {
        id: "cart",
        path: "/cart",
        label: "Cart",
    }
]
export default function Root() {
    return (
        <div className='bg-background'>
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
        <header className='h-(--h-nav) sticky z-1 top-0 bg-primary text-primary-foreground flex justify-between shadow-lg'>
            <Link
                to="/"
                className='flex items-center cursor-pointer'
            >
                <img src={bhLogo} alt="Logo Image" className="h-full"/>
                <h1 className='text-xl font-bold'>Jump For Joy <span className="text-secondary font-semibold">Inflatables</span></h1>
            </Link>
            <nav className=''>
                <ul className='h-full flex justify-end px-4'>
                    {
                        navTabs.map(tab => {
                            return (
                                <li
                                    key={tab.id}
                                    className='flex items-center'
                                >
                                    {tab.hasOwnProperty("tabs") ?
                                        (
                                            <Dropdown 
                                                label='More' 
                                                align="right" 
                                                items={tab.tabs}
                                                buttonClassName="px-4"
                                                menuClassName="bg-primary"  
                                            /> 
                                        ) : (
                                            <NavLink 
                                                to={tab.path}
                                                className={({ isActive }) => `font-semibold transition-colors px-4 flex justify-center items-center gap-2 ${
                                                    tab.id === "cart" 
                                                        ? `bg-accent px-8 py-2 rounded-lg` 
                                                        : `h-full ${
                                                            isActive ? "text-secondary" : "text-primary-foreground/80 hover:text-primary-foreground"  
                                                        }`
                                                }`}
                                            >  
                                                {tab.id === "cart" && <ShoppingCart className="w-4 h-4" />}
                                                {tab.label}
                                            </NavLink>
                                        )
                                    }
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>
        </header>
    )
}

function Footer() {
    const businessHours = [
        { day: "Mon - Thu", hours: "9:00 AM - 8:00 PM" },
        { day: "Friday", hours: "9:00 AM - 9:00 PM" },
        { day: "Saturday", hours: "8:00 AM - 9:00 PM" },
        { day: "Sunday", hours: "9:00 AM - 6:00 PM" },
    ];

    const quickLinks = [
        { id: "footer-home", to: "/", label: "Home" },
        { id: "footer-rentals", to: "/rentals", label: "Rentals" },
        { id: "footer-about", to: "/about", label: "About Us" },
        { id: "footer-faq", to: "/faq", label: "FAQ" },
        { id: "footer-contact", to: "/contact", label: "Contact" },
        { id: "footer-cart", to: "/cart", label: "Cart" },
    ];

    return (
        <footer className='bg-primary text-primary-foreground mt-12'>
            <div className='px-24 py-12'>
                <div className='grid grid-cols-1 md:grid-cols-12 gap-8'>
                    <div className='md:col-span-5 space-y-4'>
                        <img src={bhLogo} alt="Jump For Joy Logo" className="h-20 w-auto" />
                        <div className='space-y-1'>
                            <h2 className='text-2xl font-bold'>Jump For Joy</h2>
                            <p className='text-secondary font-semibold'>Inflatables</p>
                        </div>
                        <p className='max-w-md text-primary-foreground/80 text-sm'>
                            Safe, clean, and reliable inflatable rentals for birthdays, schools,
                            churches, and community events. We deliver, set up, and pick up so you can focus on the fun.
                        </p>
                    </div>

                    <div className='md:col-span-3 space-y-3'>
                        <h3 className='font-bold text-lg'>Quick Links</h3>
                        <ul className='space-y-2 text-sm'>
                            {quickLinks.map(link => (
                                <li key={link.id}>
                                    <NavLink
                                        to={link.to}
                                        className="text-primary-foreground/80 hover:text-secondary transition-colors"
                                    >
                                        {link.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className='md:col-span-4 space-y-5'>
                        <div className='space-y-3'>
                            <h3 className='font-bold text-lg'>Contact</h3>
                            <ul className='space-y-2 text-sm text-primary-foreground/85'>
                                <li className='flex items-center gap-2'>
                                    <Phone className='w-4 h-4 text-secondary' />
                                    <span>(555) 555-0199</span>
                                </li>
                                <li className='flex items-center gap-2'>
                                    <Mail className='w-4 h-4 text-secondary' />
                                    <span>bookings@jumpforjoy.com</span>
                                </li>
                                <li className='flex items-center gap-2'>
                                    <MapPin className='w-4 h-4 text-secondary' />
                                    <span>Serving the greater local area</span>
                                </li>
                            </ul>
                        </div>

                        <div className='space-y-2'>
                            <h3 className='font-bold text-lg flex items-center gap-2'>
                                <Clock3 className='w-4 h-4 text-secondary' />
                                Business Hours
                            </h3>
                            <ul className='space-y-1 text-sm text-primary-foreground/85'>
                                {businessHours.map(item => (
                                    <li key={item.day} className='flex justify-between gap-4'>
                                        <span>{item.day}</span>
                                        <span>{item.hours}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className='border-t border-primary-foreground/25 mt-10 pt-4 text-xs text-primary-foreground/70'>
                    <p>&copy; {new Date().getFullYear()} Jump For Joy Inflatables. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
