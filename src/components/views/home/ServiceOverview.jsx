import { Carousel, Accordion } from 'components/ui_features'

const exampleData = [
    {
        id : 0,
        title: "Title 0",
        description: "Description 0"
    },
    {
        id: 1,
        title: "Title 1",
        description: "Description 1"
    },
    {
        id: 2,
        title: "Title 2",
        description: "Description 2"
    },
    {
        id: 3,
        title: "Title 3",
        description: "Description 3"
    },
    {
        id: 4,
        title: "Title 4",
        description: "Description 4"
    },
    {
        id: 5,
        title: "Title 5",
        description: "Description 5"
    },
    {
        id: 6,
        title: "Title 6",
        description: "Description 6"
    },
    {
        id: 7,
        title: "Title 7",
        description: "Description 7"
    },
    {
        id: 8,
        title: "Title 8",
        description: "Description 8"
    },
]

export default function ServiceOverview() {
    return (
        <div className="service-overview w-full h-full flex">
            <div className='service-info w-1/2 text-center px-4'>
                <h1 className='text-5xl mt-8'>More Than Just Bounce Houses</h1>
                <p className='text-xl my-2'>
                    Bounce houses are at the heart of our rental services, offering 
                    a fun and engaging centerpiece for parties and events of all kinds. 
                    Alongside our inflatable rentals, we provide a selection of event 
                    essentials such as tables, chairs, and additional equipment to help 
                    hosts create a complete and well-organized setup. By offering multiple 
                    rental options in one place, we make planning easier and reduce the 
                    need to coordinate with multiple vendors.
                </p>
                <p className='text-xl my-2'>
                    Whether you’re hosting a small backyard celebration or a larger 
                    gathering, our services are designed to adapt to different spaces, 
                    guest counts, and event layouts. Below, you’ll find a selection of 
                    featured rentals that highlight the variety of services and equipment 
                    we offer.

                </p>
            </div>
            <div className='faq w-1/2'>
                <div className='accordian-container w-full h-min flex justify-center translate-y-50'>
                    <Accordion/>
                </div>
            </div>
        </div>
    )
}
