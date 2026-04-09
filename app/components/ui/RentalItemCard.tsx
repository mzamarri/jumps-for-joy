import { startTransition } from "react";
import type { MouseEvent, KeyboardEvent } from "react";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router";
import { useCart } from "context/CartContext";
import { useToast } from "context/ToastContext";
import type { RentalItemData } from "data/rentalItems";

type RentalItemCardProps = {
    categoryId: string;
    item: RentalItemData;
};

export default function RentalItemCard({ categoryId, item }: RentalItemCardProps) {
    const navigate = useNavigate();
    const { addItem } = useCart();
    const { showToast } = useToast();

    const handleNavigate = () => {
        startTransition(() => {
            navigate(`/rentals/${categoryId}/${item.id}`);
        });
    };

    const handleAddToCart = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        addItem({
            ...item,
            categoryId,
            quantity: 1,
        });
        showToast(`${item.name} successfully added`);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleNavigate();
        }
    };

    return (
        <article
            role="link"
            tabIndex={0}
            onClick={handleNavigate}
            onKeyDown={handleKeyDown}
            className="group overflow-hidden rounded-2xl border border-border bg-card shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary"
        >
            <div className="h-56 bg-muted sm:h-64">
                {item.image ? (
                    <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-contain p-5 transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                        No image available
                    </div>
                )}
            </div>
            <div className="space-y-3 p-4 sm:p-5">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                    <div className="space-y-1">
                        <h2 className="text-lg font-bold text-foreground">{item.name}</h2>
                        <p className="text-sm text-muted-foreground">{item.summary}</p>
                    </div>
                    <span className="shrink-0 text-lg font-bold text-primary">${item.cost}</span>
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-semibold text-foreground/70">
                    <span className="rounded-full bg-muted px-3 py-1">{item.dimensions}</span>
                    <span className="rounded-full bg-muted px-3 py-1">{item.maxCapacity}</span>
                </div>
                <button
                    type="button"
                    onClick={handleAddToCart}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-2.5 font-semibold text-accent-foreground transition-colors hover:cursor-pointer hover:bg-accent/90"
                >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                </button>
            </div>
        </article>
    );
}
