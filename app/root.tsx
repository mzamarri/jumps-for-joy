import { useMemo } from 'react'
import { CartProvider, useCart } from 'context/cart-context'
import { ToastProvider } from 'context/toast-context'
import {
    NavLink,
    Link,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData
} from "react-router"
import { ShoppingCart, Mail, Phone, MapPin, Clock3, Menu } from 'lucide-react'
import Dropdown from 'components/ui/dropdown'
import { apolloLoader } from './apollo';
import { appConfig, createAppConfig, type CmsBusinessInfo } from './config';
import { AppConfigProvider, useAppConfig } from './context/app-config-context';
import { useReadQuery, type QueryRef } from '@apollo/client/react';
import { graphql } from './lib/gql/client';
import type {
    HeroSlidesQuery,
    RentalCategoriesQuery,
    FeaturedRentalsQuery
} from './lib/gql/client/graphql';

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
                <title>{appConfig.business.name}</title>
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



export type RootOutletContext = {
    heroSlidesRef: QueryRef<HeroSlidesQuery>;
    rentalCategoriesRef: QueryRef<RentalCategoriesQuery>;
    featuredRentalsRef: QueryRef<FeaturedRentalsQuery>
    businessInformationRef: QueryRef<BusinessInformationQuery>;
};

type BusinessInformationQuery = {
    generalBusinessInformationCollection: {
        items: Array<CmsBusinessInfo | null>;
    } | null;
};

const HeroSlidesQueryDocument = graphql(`
    query HeroSlides {
        heroSlideCollection {
            items {
                ...HeroSlideFields
            }
        }
    }
`)

const RentalCategoriesQueryDocument = graphql(`
    query RentalCategories {
        rentalCategoryCollection(order: displayOrder_ASC, limit: 15) {
            items {
                ...RentalCategoryCardFields
                ...CategoryCatalog
            }
        }
    }
`)

const FeaturedRentalsQueryDocument = graphql(`
    query featuredRentals {
        rentalCategoryCollection(
            limit: 15, 
            where: {
                rentalItems: { 
                    featuredItem_exists: true 
                }
            }
        ) {
            items {
                ...FeaturedCards
            }
        }
    }
`)

const BusinessInformationQueryDocument = graphql(`
    query BusinessInformation {
        generalBusinessInformationCollection(limit: 1) {
            items {
                phoneNumber
                email
                location
                facebookLink
                instagramLink
            }
        }
    }
`);

export const clientLoader = apolloLoader()(({ preloadQuery }) => {
    const heroSlidesRef = preloadQuery(HeroSlidesQueryDocument);
    const rentalCategoriesRef = preloadQuery(RentalCategoriesQueryDocument);
    const featuredRentalsRef = preloadQuery(FeaturedRentalsQueryDocument);
    const businessInformationRef = preloadQuery(BusinessInformationQueryDocument);
    

    return { heroSlidesRef, rentalCategoriesRef, featuredRentalsRef, businessInformationRef } satisfies RootOutletContext;
});

export default function Root() {
    const loaderData = useLoaderData<typeof clientLoader>();
    const { data } = useReadQuery(loaderData.businessInformationRef);
    const resolvedAppConfig = useMemo(() => {
        const cmsBusinessInfo = data.generalBusinessInformationCollection?.items.find(Boolean);
        return createAppConfig(cmsBusinessInfo);
    }, [data]);

    console.log(resolvedAppConfig);
    
    return (
        <AppConfigProvider config={resolvedAppConfig}>
            <div className='bg-background'>
                <ToastProvider>
                    <CartProvider>
                        <div className="" style={{"--h-nav": "4rem"}}>
                            <NavBar/>
                            <Outlet context={loaderData}/>
                        </div>
                    </CartProvider>
                </ToastProvider>
                <Footer/>
            </div>
        </AppConfigProvider>
    );
}

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
                id: "location",
                path: "/location",
                label: "Location & Delivery",
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

const mobileNavItems = navTabs.flatMap(tab => {
    if ('tabs' in tab) return tab.tabs;
    if (tab.id === 'cart') return [];
    return [{ id: tab.id, path: tab.path, label: tab.label }];
});

function NavBar() {
    const { totalItems } = useCart();
    const config = useAppConfig();

    return (
        <header className='sticky *:h-(--h-nav) top-0 z-40 flex justify-between bg-primary text-primary-foreground shadow-lg sm:px-3 md:px-0'>
            <Link
                to="/"
                className='flex items-center gap-2 cursor-pointer min-w-0 px-2'
            >
                <img src="/logo.png" alt="Logo Image" className="h-8 w-8 md:h-10 md:w-10"/>
                <h1 className='text-sm font-bold leading-tight sm:text-base md:text-xl'>{config.business.shortName} <span className="text-secondary font-semibold">Inflatables</span></h1>
            </Link>
            <nav className='hidden md:block'>
                <ul className='h-full flex justify-end px-4 gap-8'>
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
                                                buttonClassName="h-auto"
                                                menuClassName="rounded-xl border border-primary-foreground/10 bg-primary"
                                            /> 
                                        ) : (
                                            <NavLink 
                                                to={tab.path}
                                                className={({ isActive }) => `relative font-semibold transition-colors flex justify-center items-center ${
                                                    tab.id === "cart" 
                                                        ? `bg-accent hover:bg-accent/90 px-8 py-2 rounded-lg gap-2` 
                                                        : ` ${
                                                            isActive ? "text-secondary" : "text-primary-foreground/80 hover:text-primary-foreground"  
                                                        }`
                                                }`}
                                            >  
                                                {tab.id === "cart" && (
                                                    <>
                                                        <ShoppingCart className="w-4 h-4" />
                                                        {totalItems > 0 && (
                                                            <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full bg-secondary text-secondary-foreground text-xs font-bold">
                                                                {totalItems > 99 ? "99+" : totalItems}
                                                            </span>
                                                        )}
                                                    </>
                                                )}
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
            <nav className='md:hidden flex items-center gap-2'>
                <NavLink
                    to="/cart"
                    className='relative flex items-center justify-center gap-2 h-10 w-10 sm:h-auto sm:w-auto sm:px-8 sm:py-2 rounded-lg bg-accent text-accent-foreground'
                    aria-label="Cart"
                >
                    <ShoppingCart className="w-5 h-5 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Cart</span>
                    {totalItems > 0 && (
                        <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 flex items-center justify-center rounded-full bg-secondary text-secondary-foreground text-[10px] font-bold">
                            {totalItems > 99 ? "99+" : totalItems}
                        </span>
                    )}
                </NavLink>
                <Dropdown
                    label={<Menu className="h-5 w-5" />}
                    items={mobileNavItems}
                    align="right"
                    showChevron={false}
                    buttonClassName="h-10 w-10 justify-center hover:bg-primary-foreground/15"
                    fullWidth
                    menuClassName="bg-primary border-t border-primary-foreground/15 shadow-2xl"
                />
            </nav>
        </header>
    )
}

function Footer() {
    const config = useAppConfig();
    const quickLinks = [
        { id: "footer-home", to: "/", label: "Home" },
        { id: "footer-rentals", to: "/rentals", label: "Rentals" },
        { id: "footer-about", to: "/about", label: "About Us" },
        { id: "footer-location", to: "/location", label: "Location" },
        { id: "footer-faq", to: "/faq", label: "FAQ" },
        { id: "footer-contact", to: "/contact", label: "Contact" },
        { id: "footer-cart", to: "/cart", label: "Cart" },
    ];

    return (
        <footer className='bg-primary text-primary-foreground'>
            <div className='p-4 sm:p-8'>
                <div className='grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-12 gap-8'>
                    <div className='sm:col-span-2 lg:col-span-5 lg:row-span-2 space-y-4'>
                        <img src="/logo.png" alt="Jump For Joy Logo" className="h-16 w-16" />
                        <h2 className='text-2xl font-bold'>{config.business.shortName} <span className="text-secondary">Inflatables</span>
                        </h2>
                        <p className='text-sm italic text-primary-foreground/75'>{config.business.verse}</p>
                        <p className='max-w-md text-primary-foreground/80 text-sm'>
                            Safe, clean, and reliable inflatable rentals for birthdays, schools,
                            churches, and community events. We deliver, set up, and pick up so you can focus on the fun.
                        </p>
                    </div>
                    <div className='sm:col-span-1 lg:col-span-3 lg:row-span-2 space-y-3'>
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
                    <div className='sm:col-span-1 lg:col-span-4 lg:row-span-1 space-y-3'>
                        <h3 className='font-bold text-lg'>Contact</h3>
                        <ul className='space-y-2 text-sm text-primary-foreground/85'>
                            <li className='flex items-center gap-2'>
                                <Phone className='w-4 h-4 text-secondary' />
                                <a href={config.business.phone.href}>{config.business.phone.display}</a>
                            </li>
                            <li className='flex items-center gap-2'>
                                <Mail className='w-4 h-4 text-secondary' />
                                <a href={config.business.email.href}>{config.business.email.display}</a>
                            </li>
                            <li className='flex items-center gap-2'>
                                <MapPin className='w-4 h-4 text-secondary' />
                                <span>{config.business.location}</span>
                            </li>
                        </ul>
                    </div>
                    <div className='sm:col-span-2 lg:col-span-4 lg:row-span-1 space-y-5'>
                        <div className='space-y-2'>
                            <h3 className='font-bold text-lg flex items-center gap-2'>
                                <Clock3 className='w-4 h-4 text-secondary' />
                                Business Hours
                            </h3>
                            <ul className='space-y-1 text-sm text-primary-foreground/85'>
                                {config.business.hours.map(item => (
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
                    <p className="flex justify-center">&copy; {new Date().getFullYear()} {config.business.name}. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
