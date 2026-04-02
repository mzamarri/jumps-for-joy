import { useState } from 'react'

const fallbackSections = [
    { id: "q1", title: "Question", content: "This text goes under" },
    { id: "q2", title: "Question", content: "This text goes under" },
    { id: "q3", title: "Question", content: "This text goes under" },
];

export default function Accordion({ sections = fallbackSections }) {
    return (
        <div className='w-full border border-border rounded-xl overflow-hidden'>
            {sections.map(section => (
                <Item key={section.id} section={section} />
            ))}
        </div>
    )
}

function Item({ section }) {
    const [isOpen, setisOpen] = useState(false);

    const handleClick = () => {
        console.log("Clicked")
        setisOpen(!isOpen);
    }

    return (
        <div className='cursor-pointer border-b border-border last:border-none bg-card'>
            <div onClick={handleClick} className='p-4 font-semibold text-foreground'>
                {section.title}
            </div>
            <div className={`point overflow-hidden ${isOpen ? 'h-auto' : 'h-0'}`}>
                <div className='border-t border-border p-4 text-sm text-muted-foreground'>
                    {section.content}
                </div>
            </div>
        </div>
    )
}
