type IconProps = {
    icon: React.ComponentType<{ className?: string }> | string | number
    containerClassName?: string
    iconClassName?: string
}

export default function Icon({
    icon,
    containerClassName,
    iconClassName,
}: IconProps) {
    const IconComponent = typeof icon === 'string' || typeof icon === 'number' ? null : icon

    return (
        <div className={`w-8 h-8 bg-muted flex items-center justify-center text-muted-foreground ${containerClassName ?? ''}`.trim()}>
            {typeof icon === 'string' || typeof icon === 'number' ? (
                <span className={`inline-flex items-center justify-center text-sm font-bold ${iconClassName ?? ''}`.trim()}>
                    {icon}
                </span>
            ) : (
                <IconComponent className={`w-4 h-4 ${iconClassName ?? ''}`.trim()} />
            )}
        </div>
    )
}
