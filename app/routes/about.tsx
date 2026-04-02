import { Users, BadgeCheck, HeartHandshake } from "lucide-react";

const values = [
    {
        id: "service",
        icon: HeartHandshake,
        title: "Service First",
        description: "We focus on making event planning easier through clear communication and dependable support."
    },
    {
        id: "quality",
        icon: BadgeCheck,
        title: "Quality & Safety",
        description: "Our equipment is cleaned, checked, and prepared with safety standards in mind before every rental."
    },
    {
        id: "community",
        icon: Users,
        title: "Community Focused",
        description: "We love helping local families, schools, and organizations create memorable experiences."
    }
];

export default function AboutPage() {
    return (
        <div className="px-24 py-12 space-y-10">
            <div className="text-center space-y-3">
                <h1 className="text-6xl font-bold text-foreground">About <span className="text-primary">Us</span></h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    Jump For Joy Inflatables was built to help families and event hosts create stress-free celebrations
                    with dependable rentals and friendly service.
                </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8">
                <h2 className="text-2xl font-semibold text-primary mb-3">Our Story</h2>
                <p className="text-muted-foreground leading-relaxed">
                    We started with a simple goal: provide clean, safe, and exciting inflatables backed by reliable delivery and setup.
                    Since then, we’ve supported birthdays, school functions, church events, and neighborhood celebrations across the area.
                    We understand how much goes into planning an event, so our process is designed to stay clear, helpful, and consistent
                    from booking to pickup.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {values.map(value => (
                    <div key={value.id} className="bg-card border border-border rounded-xl p-5 space-y-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <value.icon className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="font-semibold text-foreground">{value.title}</h3>
                        <p className="text-sm text-muted-foreground">{value.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
