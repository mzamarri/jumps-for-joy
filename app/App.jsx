import { useState } from 'react'
import { Home, Rentals, Cart } from 'views'
import { BookingProvider } from 'context/BookingContext';
import logo from '/logo.png'
import bhLogo from '/bouncehouse_logo.png'

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
        <div className='bg-gray-100'>
            <BookingProvider>
                <div className="min-h-screen" style={{"--h-nav": "4rem"}}>
                    <NavBar tabs={navTabs} currentTab={currentTab} setCurrentTab={setCurrentTab}/>
                        {currentTab.view}
                </div>
            </BookingProvider>
            <Footer/>
        </div>
    )
} 

function NavBar({ tabs, currentTab, setCurrentTab  }) {
    return (
        <header class='h-(--h-nav) sticky z-1 top-0 bg-brand-blue flex justify-between text-white'>
            <div className='flex items-center gap-4'>
                <img src={bhLogo} alt="Logo Image" className="h-full bg-blue"/>
                <h1 className='text-xl'>Jump For Joy Inflatables</h1>
            </div>
            <nav class=''>
                <ul class='h-full flex justify-end'>
                    {
                        tabs.map(tab => {
                            return (
                                <li 
                                    className={`h-full flex justify-center items-center px-6 ${
                                        tab === currentTab ? "bg-brand-blue" : "hover:bg-brand-blue-dark"
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
        <footer className='bg-brand-blue'>
            <div className='flex justify-center items-center h-100'>
                <h1 className='text-white p-4'>
                    Footer Goes Here
                </h1>
            </div>
        </footer>
    )
}

export default App
