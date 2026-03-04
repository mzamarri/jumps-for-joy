import { Carousel, Accordion } from 'components/ui_features'
import fullLogo from '/full-logo.png'

export default function ServiceOverview() {
    return (
        <div className="service-overview px-24 py-12 flex space-x-8">
            <div className='flex-2'>
                <img src={fullLogo} alt='Logo' className='border-brand-red rounded-lg object-cover object-top' />
            </div>
            <div className='flex-3 flex justify-center items-center'>
                <div className='text-center space-y-'>
                    <div className='space-y-4 flex flex-col py-8'>
                        <h1 className='text-6xl font-bold text-brand-blue-dar  rounded-lg'>
                            More Than Just Bounce Houses
                        </h1>
                        <h2 className='text-3xl font-semibold text-brand-red'>
                            Your Prefered Choice for a Full Party Experience
                        </h2>
                        <p className=''>
                            Bounce houses are at the heart of our rental services, offering 
                            a fun and engaging centerpiece for parties and events of all kinds. 
                            Alongside our inflatable rentals, we provide a selection of event 
                            essentials such as tables, chairs, and additional equipment to help 
                            hosts create a complete and well-organized setup. By offering multiple 
                            rental options in one place, we make planning easier and reduce the 
                            need to coordinate with multiple vendors. Whether you’re hosting a small 
                            backyard celebration or a larger gathering, our services are designed to 
                            adapt to different spaces, guest counts, and event layouts.
                        </p>
                    </div>
                    <div className='flex flex-col items-center space-y-4'>
                        <p className=''>
                            Want inspiration for your next event? Check out our social media to 
                            see real setups, creative ideas, and the fun we help create for our 
                            customers!
                        </p>
                        <div className='h-24 w-1/3 bg-gray-500'/>
                    </div>
                </div>
            </div>
        </div>
    )
}
