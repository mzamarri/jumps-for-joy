import { createContext, useContext, useMemo, useRef, useState } from "react";
import CheckCircle2 from "lucide-react/dist/esm/icons/circle-check.js";
import X from "lucide-react/dist/esm/icons/x.js";

type Toast = {
    id: number;
    message: string;
};

type ToastContextValue = {
    showToast: (message: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const timeoutMap = useRef(new Map<number, ReturnType<typeof setTimeout>>());

    const dismissToast = (id: number) => {
        const timeout = timeoutMap.current.get(id);
        if (timeout) {
            clearTimeout(timeout);
            timeoutMap.current.delete(id);
        }
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    const value = useMemo(
        () => ({
            showToast(message: string) {
                const id = Date.now() + Math.floor(Math.random() * 1000);
                setToasts(prev => [...prev, { id, message }]);

                const timeout = setTimeout(() => {
                    dismissToast(id);
                }, 3200);

                timeoutMap.current.set(id, timeout);
            },
        }),
        [],
    );

    return (
        <ToastContext value={value}>
            {children}
            <div className="pointer-events-none fixed right-5 bottom-5 z-50 h-52 w-full max-w-sm">
                {[...toasts].slice(-3).reverse().map((toast, index) => (
                    <div
                        key={toast.id}
                        className="pointer-events-auto absolute right-0 w-full flex items-start gap-3 rounded-2xl border border-primary/15 bg-card px-4 py-3 text-card-foreground shadow-[0_18px_50px_-24px_rgba(25,74,170,0.45)] transition-all duration-300"
                        style={{
                            bottom: `${index * 14}px`,
                            transform: `scale(${1 - index * 0.04})`,
                            opacity: 1 - index * 0.18,
                            zIndex: 30 - index,
                        }}
                    >
                        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary/30 text-primary">
                            <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <p className="flex-1 text-sm font-semibold leading-6">{toast.message}</p>
                        <button
                            type="button"
                            onClick={() => dismissToast(toast.id)}
                            className="cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
                            aria-label="Dismiss notification"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext>
    );
}

export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error("useToast must be used within a ToastProvider");
    return ctx;
}
