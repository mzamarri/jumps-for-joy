import { Accordion } from "components/ui_features";

const faqs = [
    {
        id: "booking-lead-time",
        title: "How far in advance should I book?",
        content: "We recommend booking as early as possible, especially during weekends and peak season, to secure your preferred rentals and times."
    },
    {
        id: "weather-policy",
        title: "What happens if weather conditions are unsafe?",
        content: "Safety comes first. If weather creates unsafe setup or use conditions, we’ll work with you on available options and next steps."
    },
    {
        id: "setup-surface",
        title: "What kind of surfaces can you set up on?",
        content: "We can often set up on grass, concrete, or turf depending on equipment and anchoring requirements. Share your surface details during booking."
    },
    {
        id: "delivery-area",
        title: "Do you deliver outside the standard service area?",
        content: "In many cases yes. Additional distance or logistics fees may apply, and we can confirm availability based on your exact location."
    }
];

export default function FAQPage() {
    return (
        <div className="px-24 py-12 space-y-10">
            <div className="text-center space-y-3">
                <h1 className="text-6xl font-bold text-foreground">Frequently Asked <span className="text-primary">Questions</span></h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    Quick answers to common questions about rentals, delivery, setup, and booking.
                </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
                <Accordion sections={faqs} />
            </div>
        </div>
    );
}
