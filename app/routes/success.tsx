import { Link, useSearchParams } from "react-router";
import { ArrowRight, CalendarCheck, Home, Mail, ShoppingBag } from "lucide-react";
import Icon from "components/ui/icon";

const successContent = {
    booking: {
        eyebrow: "Request submitted",
        title: "We received your rental request",
        description:
            "Your request was sent successfully. We will review your request details and follow up to confirm what we can fulfill. Booking is official only after we complete that follow-up together.",
        nextSteps: [
            "We review availability, logistics, and request details to confirm what we can fulfill.",
            "Expect a phone call from us after review, or an email follow-up if we cannot reach you by phone.",
            "During follow-up, we confirm what can be met and finalize a clear agreement; then booking becomes official.",
        ],
        primaryLink: {
            to: "/rentals",
            label: "Browse Rentals",
            icon: ShoppingBag,
        },
    },
    contact: {
        eyebrow: "Message sent",
        title: "Thanks for reaching out",
        description:
            "Your message was sent successfully. We will review it and get back to you shortly.",
        nextSteps: [
            "We review your question or concern about our services.",
            "Watch for an email reply from our team shortly.",
            "If needed, we will follow up with simple next steps or clarifying questions.",
        ],
        primaryLink: {
            to: "/rentals",
            label: "View Rentals",
            icon: ShoppingBag,
        },
    },
};

export default function SuccessPage() {
    const [searchParams] = useSearchParams();
    const source = searchParams.get("source") === "contact" ? "contact" : "booking";
    const content = successContent[source];
    const PrimaryIcon = content.primaryLink.icon;

    return (
        <main className="bg-background">
            <section className="bg-primary px-4 py-16 text-center text-primary-foreground md:px-8 md:py-24">
                <div className="mx-auto max-w-3xl space-y-4">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                        <CalendarCheck className="h-8 w-8" aria-hidden="true" />
                    </div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
                        {content.eyebrow}
                    </p>
                    <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
                        {content.title}
                    </h1>
                    <p className="mx-auto max-w-2xl text-base leading-7 text-primary-foreground/85 md:text-lg">
                        {content.description}
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-5xl px-4 py-10 md:px-8 md:py-14">
                <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
                        <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                            What happens next
                        </h2>
                        <ol className="mt-6 space-y-4">
                            {content.nextSteps.map((step, index) => (
                                <li key={step} className="flex gap-4">
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                                        {index + 1}
                                    </span>
                                    <p className="pt-1 text-muted-foreground">{step}</p>
                                </li>
                            ))}
                        </ol>
                    </div>

                    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
                        <Icon
                            icon={Mail}
                            containerClassName="mb-4 h-12 w-12 rounded-xl bg-secondary/25"
                            iconClassName="h-6 w-6 text-primary"
                        />
                        <h2 className="text-2xl font-bold text-foreground">Need anything else?</h2>
                        <p className="mt-3 text-muted-foreground">
                            You can keep browsing, return home, or send another message if your plans change.
                        </p>
                        <div className="mt-6 space-y-3">
                            <Link
                                to={content.primaryLink.to}
                                className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
                            >
                                <PrimaryIcon className="h-5 w-5" aria-hidden="true" />
                                {content.primaryLink.label}
                                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </Link>
                            <Link
                                to="/"
                                className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-6 py-3 font-semibold text-foreground transition-colors hover:bg-muted"
                            >
                                <Home className="h-5 w-5" aria-hidden="true" />
                                Back Home
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
