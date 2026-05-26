import { useState, type FormEvent, type KeyboardEvent } from "react";
import { useNavigate } from "react-router";
import { Mail, Phone, Clock } from "lucide-react";
import Icon from 'components/ui/icon';
import { useAppConfig } from "context/app-config-context";
import { sendContactEmails } from "../lib/emailjs-client";
import {
    formatPhoneNumber,
    isValidEmail,
    isValidPhoneNumber,
    removePreviousPhoneDigit,
    PHONE_NUMBER_ERROR_MESSAGE,
} from "../lib/validation/form";
import { delay } from "../lib/time";

const initialContactForm = {
    name: "",
    phone: "",
    email: "",
    message: "",
};

export default function ContactPage() {
    const [form, setForm] = useState(initialContactForm);
    const [statusMessage, setStatusMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const config = useAppConfig();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
            setStatusMessage("Please enter your name, email, and message before submitting.");
            return;
        }

        if (!isValidEmail(form.email)) {
            setStatusMessage("Please enter a valid email address, like name@example.com.");
            return;
        }

        if (form.phone.trim() && !isValidPhoneNumber(form.phone)) {
            setStatusMessage(PHONE_NUMBER_ERROR_MESSAGE);
            return;
        }

        setIsSubmitting(true);
        setStatusMessage("");

        try {
            await sendContactEmails({
                name: form.name.trim(),
                email: form.email.trim(),
                phone: form.phone.trim() || "Not provided",
                message: form.message.trim(),
                submittedAt: new Intl.DateTimeFormat("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                }).format(new Date()),
            });

            await delay(config.booking.successRedirectDelayMs);
            console.log("Successfully sent");
            navigate("/success?source=contact");
        } catch {
            setStatusMessage("There was an error sending your message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFieldChange = (field: keyof typeof form, value: string) => {
        const nextValue = field === "phone" ? formatPhoneNumber(value) : value;

        setForm(prev => ({
            ...prev,
            [field]: nextValue,
        }));
    };

    const handlePhoneKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== "Backspace") {
            return;
        }

        const { selectionStart, selectionEnd } = event.currentTarget;

        if (selectionStart === null || selectionEnd === null) {
            return;
        }

        event.preventDefault();
        handleFieldChange("phone", removePreviousPhoneDigit(form.phone, selectionStart, selectionEnd));
    };

    return (
        <div className="">
            <div className="bg-primary px-4 py-16 text-center text-primary-foreground space-y-3 md:px-8 md:py-24">
                <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">Get in <span className="text-secondary">Touch</span></h1>
                <p className="mx-auto max-w-3xl text-base text-primary-foreground/80 md:text-lg">
                    Have questions about availability, delivery, or package options? Send us a message and we’ll get back to you promptly.
                </p>
            </div>

            <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 md:px-8 md:py-12 lg:flex-row">
                <div className="w-full space-y-4 rounded-2xl p-6 lg:max-w-md">
                    <h2 className="text-2xl font-semibold md:text-3xl">Contact Information</h2>
                    <p className="flex items-center gap-1 text-muted-foreground">
                        Reach out anytime. we typically reach out within the hour during business hours
                    </p>
                    <ul className="space-y-6">
                        <li className="flex items-center gap-4">
                            <Icon 
                                icon={Phone} 
                                containerClassName="bg-secondary/30 w-12 h-12 flex justify-center items-center rounded-lg" 
                                iconClassName="w-6 h-6 text-primary" 
                            />
                            <div className="">
                                <h1 className="text-lg font-semibold text-foreground">Phone</h1>
                                <a href={config.business.phone.href} className="text-muted-foreground">
                                    {config.business.phone.display}
                                </a>
                            </div>
                        </li>
                        <li className="flex items-start gap-4">
                            <Icon 
                                icon={Mail} 
                                containerClassName="w-12 h-12 bg-secondary/20 flex justify-center items-center rounded-lg" 
                                iconClassName="w-6 h-6 text-secondary" 
                            />
                            <div className="">
                                <h1 className="text-lg font-semibold text-foreground">Email</h1>
                                <a href={config.business.email.href} className="wrap-break-word text-muted-foreground">
                                    {config.business.email.display}
                                </a>
                            </div>
                        </li>
                        <li className="flex items-start gap-4">
                            <Icon 
                                icon={Clock}
                                containerClassName="w-12 h-12 bg-secondary/30 flex justify-center items-center rounded-lg" 
                                iconClassName="w-6 h-6 text-accent" 
                            />
                            <div className="flex-1">
                                <h1 className="text-lg font-semibold text-foreground">Business Hours</h1>
                                <ol className="text-muted-foreground w-full">
                                    {config.business.hours.map(item => (
                                        <li key={item.day} className="flex items-start justify-between gap-4">
                                            <span>
                                                {item.day}
                                            </span>
                                            <span>
                                                {item.hours}
                                            </span>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </li>
                    </ul>
                </div>

                <div id="contact-form" className="max-w-2xl flex-1 rounded-2xl border border-border bg-card p-6 space-y-4">
                    <h2 className="text-2xl font-semibold md:text-3xl">Send Us a Message</h2>
                    <form className="space-y-4 text-sm" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1 text-sm">
                                <label htmlFor="name" className="font-semibold">
                                    Full Name *
                                </label>
                                <input 
                                    id="name"
                                    className="bg-background border border-border rounded-lg p-3" 
                                    type="text" 
                                    placeholder="Arthur Morgan" 
                                    value={form.name}
                                    onChange={event => handleFieldChange("name", event.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="phone" className="font-semibold">
                                    Phone
                                </label>
                                <input 
                                    id="phone"
                                    className="bg-background border border-border rounded-lg p-3" 
                                    type="tel" 
                                    placeholder="(555) 123-4567" 
                                    value={form.phone}
                                    onChange={event => handleFieldChange("phone", event.target.value)}
                                    onKeyDown={handlePhoneKeyDown}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="email" className="font-semibold text-sm">
                                Email *
                            </label>
                            <input 
                                id="email"
                                className="bg-background border border-border rounded-lg p-3" 
                                type="email" 
                                placeholder="arthur@example.com" 
                                value={form.email}
                                onChange={event => handleFieldChange("email", event.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="">
                                Message *
                            </label>
                            <textarea
                                id="message"
                                className="bg-background border border-border rounded-lg p-3 w-full" 
                                rows={10}
                                placeholder="Tell us about your event or ask any questions..." 
                                value={form.message}
                                onChange={event => handleFieldChange("message", event.target.value)}
                                required
                            />
                        </div>
                        {statusMessage ? (
                            <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-semibold text-destructive" role="alert">
                                {statusMessage}
                            </p>
                        ) : null}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold cursor-pointer hover:bg-accent/90 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
                        >
                            {isSubmitting ? "Sending..." : "Submit Inquiry"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
