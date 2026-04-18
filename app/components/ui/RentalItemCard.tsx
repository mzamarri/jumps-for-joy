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
            className="group flex h-full flex-col overflow-hidden rounded-xl cursor-pointer border border-border bg-card shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary md:rounded-2xl"
        >
            <div className="h-32 bg-muted md:h-56 lg:h-64">
                {item.image ? (
                    <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-[1.03] md:p-5"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                        No image available
                    </div>
                )}
            </div>
            <div className="flex flex-1 flex-col space-y-2 p-3 md:space-y-3 md:p-5">
                <div className="flex flex-1 flex-col gap-2 justify-between md:flex-row md:items-start md:justify-between md:gap-4">
                    <div className="space-y-2">
                        <div className="flex justify-between gap-4">
                            <h2 className="flex-1 text-sm font-bold leading-5 text-foreground md:text-lg md:leading-6">{item.name}</h2>
                            <span className="shrink-0 text-sm font-bold text-primary md:text-lg">${item.cost}</span>
                        </div>
                        <p className="text-xs leading-5 text-muted-foreground md:text-sm">{item.summary}</p>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={handleAddToCart}
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-accent py-2 text-sm font-semibold text-accent-foreground transition-colors hover:cursor-pointer hover:bg-accent/90 md:gap-2 md:py-2.5 md:text-base"
                >
                    <ShoppingCart className="h-3.5 w-3.5 md:h-4 md:w-4" />
                    Add to Cart
                </button>
            </div>
        </article>
    );
}
