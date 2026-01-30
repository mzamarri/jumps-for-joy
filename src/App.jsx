import { useState } from 'react'
import { Home, Rentals, Cart } from 'views'
import { BookingProvider } from 'context/BookingContext';

// import './App.css'

const navTabs = [
    {
        id: "home",
        label: "Home",
        view: <Home/>
    },
    {
        id: "rentals",
        label: "Rentals",
        view: <Rentals/>
    },
    {
        id: "more",
        label: "More",
        view: "More View"
    },
    {
        id: "cart",
        label: "Cart",
        view: <Cart/>
    }
]

function App() {
    const [ currentTab, setCurrentTab ] = useState(navTabs[0]);

    return (
        <>
            <BookingProvider>
                <div className="min-h-screen" style={{"--h-nav": "4rem"}}>
                    <NavBar tabs={navTabs} currentTab={currentTab} setCurrentTab={setCurrentTab}/>
                        {currentTab.view}
                </div>
            </BookingProvider>
            <Footer/>
        </>
    )
} 

function NavBar({ tabs, currentTab, setCurrentTab  }) {
    return (
        <header class='sticky z-1 top-0 bg-sky-400 w-full'>
            <nav class='h-(--h-nav) text-white'>
                <ul class='h-full flex justify-end'>
                    {
                        tabs.map(tab => {
                            return (
                                <li 
                                    className={`h-full flex justify-center items-center px-6 ${
                                        tab === currentTab ? "bg-sky-800" : "hover:bg-sky-600"
                                    }`}
                                    key={tab.id}
                                    onClick={() => setCurrentTab(tab)}
                                >
                                    {tab.label}
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
    return (
        <footer className='bg-sky-400'>
            <div className='flex justify-center items-center h-100'>
                <h1 className='text-white p-4'>
                    Footer Goes Here
                </h1>
            </div>
        </footer>
    )
}

export default App
