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
    fullWidth?: boolean
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
    fullWidth = false,
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
        <div ref={containerRef} className={fullWidth ? '' : 'relative'}>
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
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`.trim()} />
                )}
            </button>

            {open && (
                <div
                    id={menuId}
                    role="menu"
                    className={[
                        'absolute top-full z-50 overflow-hidden shadow-2xl',
                        fullWidth
                            ? 'left-0 right-0 w-full'
                            : `mt-1 w-56 sm:w-64 ${align === 'right' ? 'right-0' : 'left-0'}`,
                        menuClassName,
                    ].join(' ')}
                >
                    <ul className={fullWidth ? '' : 'p-1'}>
                        {items.map(item => (
                            <li
                                key={item.id}
                                className={fullWidth ? 'border-b border-primary-foreground/15 last:border-none' : ''}
                            >
                                <NavLink
                                    to={item.path}
                                    role="menuitem"
                                    className={({ isActive }) => [
                                        'flex flex-col transition-colors font-semibold',
                                        fullWidth
                                            ? 'px-6 py-4 text-base'
                                            : 'rounded-lg px-4 py-3 text-sm sm:text-base',
                                        isActive
                                            ? 'text-secondary'
                                            : 'text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10',
                                        itemClassName,
                                    ].join(' ')}
                                    onClick={() => setOpen(false)}
                                >
                                    <span>{item.label}</span>
                                    {item.description && (
                                        <span className="mt-0.5 text-xs font-normal text-primary-foreground/50">
                                            {item.description}
                                        </span>
                                    )}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
