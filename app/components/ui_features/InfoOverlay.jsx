import { X } from "lucide-react";
import { motion } from "motion/react";

export default function InfoOverlay({ open, onClose, title, summary, details = [] }) {
    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
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
                className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-border bg-card text-foreground shadow-2xl"
            >
                <div className="sticky top-0 bg-card/95 backdrop-blur border-b border-border px-6 py-4 flex items-start justify-between gap-4">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-bold text-primary">{title}</h2>
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

                <ul className="px-10 py-5 space-y-3 list-disc marker:text-primary">
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
