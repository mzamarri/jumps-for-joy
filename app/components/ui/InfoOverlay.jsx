import { X } from "lucide-react";
import { motion } from "motion/react";

export default function InfoOverlay({ open, onClose, title, summary, details = [] }) {
    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-end justify-center p-3 sm:items-center sm:p-6"
            role="dialog"
            aria-modal="true"
        >
            <button
                type="button"
                aria-label="Close details"
                className="absolute inset-0 bg-black/45 backdrop-blur-[1px]"
                onClick={onClose}
            />

            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
                className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[1.75rem] border border-border bg-card text-foreground shadow-2xl sm:max-h-[85vh] sm:rounded-2xl"
            >
                <div className="sticky top-0 flex items-start justify-between gap-4 border-b border-border bg-card/95 px-4 py-4 backdrop-blur sm:px-6">
                    <div className="space-y-1">
                        <h2 className="text-xl font-bold text-primary sm:text-2xl">{title}</h2>
                        <p className="text-sm text-muted-foreground">{summary}</p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-9 h-9 shrink-0 aspect-square rounded-full border border-border bg-muted text-muted-foreground hover:bg-secondary/30 hover:text-secondary-foreground cursor-pointer transition-colors flex items-center justify-center"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <ul className="list-disc space-y-3 px-5 py-5 marker:text-primary sm:px-10">
                    {details.map((detail, idx) => (
                        <li key={idx} className="text-sm leading-relaxed text-muted-foreground pl-1">
                            {detail}
                        </li>
                    ))}
                </ul>
            </motion.div>
        </div>
    );
}
