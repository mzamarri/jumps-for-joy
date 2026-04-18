import { useEffect, useId } from "react";
import { X } from "lucide-react";

export default function InfoOverlay({ open, onClose, title, summary, details = [] }) {
    const titleId = useId();
    const summaryId = useId();

    useEffect(() => {
        if (!open) return;

        const previousOverflow = document.body.style.overflow;
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleEscape);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleEscape);
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <button
                type="button"
                aria-label="Close details"
                className="absolute inset-0 bg-slate-950/55"
                onClick={onClose}
            />

            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={summary ? summaryId : undefined}
                className="relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-card text-foreground shadow-2xl"
            >
                <div className="flex items-start justify-between gap-4 border-b border-border px-4 py-4 sm:px-6">
                    <div className="min-w-0 space-y-2">
                        <h2 id={titleId} className="text-xl font-bold leading-tight sm:text-2xl">
                            {title}
                        </h2>
                        {summary ? (
                            <p id={summaryId} className="text-sm leading-6 text-muted-foreground sm:text-base">
                                {summary}
                            </p>
                        ) : null}
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:cursor-pointer hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <div className="overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
                    {details.length > 0 ? (
                        <ol className="space-y-3">
                            {details.map((detail, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                                        {idx + 1}
                                    </span>
                                    <p className="pt-0.5 text-sm leading-6 text-muted-foreground sm:text-base">
                                        {detail}
                                    </p>
                                </li>
                            ))}
                        </ol>
                    ) : (
                        <p className="text-sm leading-6 text-muted-foreground sm:text-base">
                            No additional details are available for this section right now.
                        </p>
                    )}
                </div>
            </section>
        </div>
    );
}
