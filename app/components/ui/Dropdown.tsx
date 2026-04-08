import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { NavLink, useLocation } from 'react-router'
import { ChevronDown } from 'lucide-react'

type DropdownItem = {
    id: string
    label: ReactNode
    path: string
    description?: string
}

type DropdownProps = {
    label: ReactNode
    items: DropdownItem[]
    buttonClassName?: string
    activeButtonClassName?: string
    menuClassName?: string
    itemClassName?: string
    align?: 'left' | 'right'
    showChevron?: boolean
}

export default function Dropdown({
    label,
    items,
    buttonClassName = '',
    activeButtonClassName = 'text-secondary',
    menuClassName = '',
    itemClassName = '',
    align = 'left',
    showChevron = true,
}: DropdownProps) {
    const [open, setOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const menuId = useId()
    const location = useLocation()
    const hasActiveItem = items.some(item => {
        if (item.path === '/') {
            return location.pathname === '/'
        }

        return location.pathname === item.path || location.pathname.startsWith(`${item.path}/`)
    })

    useEffect(() => {
        function handlePointerDown(event: MouseEvent) {
            if (!containerRef.current?.contains(event.target as Node)) {
                setOpen(false)
            }
        }

        function handleEscape(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                setOpen(false)
            }
        }

        document.addEventListener('mousedown', handlePointerDown)
        document.addEventListener('keydown', handleEscape)

        return () => {
            document.removeEventListener('mousedown', handlePointerDown)
            document.removeEventListener('keydown', handleEscape)
        }
    }, [])

    return (
        <div ref={containerRef} className="sm:relative">
            <button
                type="button"
                aria-expanded={open}
                aria-controls={menuId}
                className={[
                    'inline-flex items-center gap-2 font-semibold transition-colors cursor-pointer',
                    hasActiveItem ? activeButtonClassName : 'text-primary-foreground/80 hover:text-primary-foreground',
                    buttonClassName,
                ].join(' ').trim()}
                onClick={() => setOpen(current => !current)}
            >
                <span>{label}</span>
                {showChevron && (
                    <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`.trim()} />
                )}
            </button>

            {open && (
                <div
                    id={menuId}
                    className={[
                        'absolute top-full w-screen z-20 min-w-56 overflow-hidden border border-border',
                        align === 'right' ? 'right-0' : 'left-0',
                        menuClassName,
                    ].join(' ')}
                >
                    <ul className="sm:p-1">
                        {items.map(item => (
                            <li 
                                key={item.id}
                                className='border-b border-primary-foreground/20 last:border-none'
                            >
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) => [
                                        'flex justify-center py-2 transition-colors font-semibold',
                                        isActive ? 'text-secondary' : 'text-primary-foreground/80 hover:text-primary-foreground',
                                        itemClassName,
                                    ].join(' ')}
                                    onClick={() => setOpen(false)}
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
