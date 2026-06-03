import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

type AccordionSection = {
    id: string;
    title: React.ReactNode;
    content: React.ReactNode;
};

const fallbackSections: AccordionSection[] = [
    { id: "q1", title: "Question", content: "This text goes under" },
    { id: "q2", title: "Question", content: "This text goes under" },
    { id: "q3", title: "Question", content: "This text goes under" },
];

export default function Accordion({ sections = fallbackSections }: { sections?: AccordionSection[] }) {
    return (
        <div className='w-full border border-border rounded-xl overflow-hidden'>
            {sections.map(section => (
                <Item key={section.id} section={section} />
            ))}
        </div>
    )
}

function Item({ section }: { section: AccordionSection }) {
    const [isOpen, setisOpen] = useState(false);

    const handleClick = () => {
        setisOpen(!isOpen);
    }

    return (
        <div className='border-b border-border last:border-none bg-card'>
            <button
                type="button"
                onClick={handleClick}
                aria-expanded={isOpen}
                className='flex w-full items-center justify-between gap-4 p-4 text-left font-semibold text-foreground hover:cursor-pointer sm:p-5'
            >
                <span>{section.title}</span>
                <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`.trim()} />
            </button>
            <div className={`point overflow-hidden ${isOpen ? 'h-auto' : 'h-0'}`}>
                <div className='border-t border-border p-4 text-sm leading-6 text-muted-foreground sm:p-5'>
                    {section.content}
                </div>
            </div>
        </div>
    )
}
