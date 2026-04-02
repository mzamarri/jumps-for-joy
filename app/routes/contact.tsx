import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="px-24 py-12 space-y-10">
            <div className="text-center space-y-3">
                <h1 className="text-6xl font-bold text-foreground">Contact <span className="text-primary">Us</span></h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    Have questions about availability, delivery, or package options? Send us a message and we’ll get back to you promptly.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 space-y-4">
                    <h2 className="text-xl font-semibold text-primary">Business Contact</h2>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-primary" />
                            <span>(555) 555-0199</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-primary" />
                            <span>bookings@jumpforjoy.com</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span>Serving the greater local area</span>
                        </li>
                    </ul>
                </div>

                <div className="lg:col-span-3 bg-card border border-border rounded-2xl p-6 space-y-4">
                    <h2 className="text-xl font-semibold text-primary">Send a Message</h2>
                    <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input className="bg-background border border-border rounded-lg p-3" type="text" placeholder="First Name" />
                            <input className="bg-background border border-border rounded-lg p-3" type="text" placeholder="Last Name" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input className="bg-background border border-border rounded-lg p-3" type="email" placeholder="Email" />
                            <input className="bg-background border border-border rounded-lg p-3" type="tel" placeholder="Phone Number" />
                        </div>
                        <textarea className="bg-background border border-border rounded-lg p-3 w-full" rows={6} placeholder="Tell us about your event..." />
                        <button type="button" className="bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:bg-accent/90">
                            Submit Inquiry
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
