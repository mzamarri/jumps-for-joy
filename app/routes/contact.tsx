import { useState } from "react";
import type { FormEvent, ChangeEvent, InputEvent, MouseEvent, KeyboardEvent } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router";
import type { ClientActionFunctionArgs } from "react-router";
import { Mail, Phone, Link, ExternalLink } from "lucide-react";
import IG from "../assets/instagram.svg";
import FB from "../assets/facebook.svg"
import Icon from 'components/ui/icon';
import { useAppConfig } from "context/app-config-context";
import { sendContactEmails } from "../lib/emailjs-client";
import { createValidator, requiredString, type NormalizationPattern } from "lib/validation-helpers";
import * as z from "zod";
import { formatPhoneNumber, normalizeValue } from "lib/utils";
import { handlePhoneKeyDown } from "lib/event-handlers";

const contactFields = [
    "name",
    "phoneNumber",
    "email",
    "message"
] as const;

type ContactFieldName = typeof contactFields[number]

type ContactFields = Record<ContactFieldName, string>

type PartialFields = Partial<ContactFields>

const normalizeFields: NormalizationPattern<PartialFields> = {
    name: /[^a-zA-Z '\-]/g,
    phoneNumber:/\D+/g,
    email: /\s+/g
}

const contactSchema: z.ZodType<Record<ContactFieldName, string>> = z.object({
    name: requiredString("Name"),
    email: requiredString("Email")
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter valid email, like name@example.com."),
    phoneNumber: z
        .string("Phone Number is required.")
        .refine(
            value => value === "" || /^\(\d{3}\) \d{3}-\d{4}$/.test(value),
            "Must be 10 digits or leave blank."
        ),
    message: requiredString("Message")
});

const v = createValidator(contactSchema, normalizeFields);

export async function clientAction({ request }: ClientActionFunctionArgs) {
    const formData = await request.formData();
    const name = String(formData.get("name") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    try {
        await sendContactEmails({
            name,
            email,
            phone: phone || "Not provided",
            message,
            submittedAt: new Intl.DateTimeFormat("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
            }).format(new Date()),
        });
        console.log("Successfully sent");
    } catch {
        return { error: "There was an error sending your message. Please try again." };
    }

    return redirect("/success?source=contact");
}

export default function ContactPage() {
    const [ contactFields, setContactFields ] = useState<PartialFields>({});
    const [ errors, setErrors ] = useState<PartialFields>(v.validate(contactFields));
    const [ canSubmit, setCanSubmit ] = useState(true);
    const config = useAppConfig();
    // console.log("errors: ", errors);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        if (Object.keys(errors).length !== 0) {
            console.log("error");
            event.preventDefault();
            setCanSubmit(false);
            return;
        }

        console.log("success");
    };

    const formatField = (fieldName: ContactFieldName, normalizedValue: string): string => {
        if (fieldName === "phoneNumber") {
            return formatPhoneNumber(normalizedValue);
        }

        return normalizedValue;
    }

    const handleFieldChange = (fieldName: ContactFieldName, nextValue: string) => {
        const regex = normalizeFields[fieldName];
        const normalizedValue = regex ? normalizeValue(regex, nextValue) : nextValue;
        const newContactData = {
            ...contactFields,
            [fieldName]: formatField(fieldName, normalizedValue)
        };
        const newErrors = v.validate(newContactData);

        if (Object.keys(newErrors).length === 0) {
            setCanSubmit(true);
        }

        setContactFields(newContactData);
        setErrors(newErrors);
    };

    return (
        <div className="">
            <div className="bg-primary px-4 py-16 text-center text-primary-foreground space-y-3 md:px-8 md:py-24">
                <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">Get in <span className="text-secondary">Touch</span></h1>
                <p className="mx-auto max-w-3xl text-base text-primary-foreground/80 md:text-lg">
                    Have questions about availability, delivery, or package options? Send us a message and we’ll get back to you promptly.
                </p>
            </div>

            <div className="
                max-w-6xl mx-auto
                px-4 py-8 md:px-8 md:py-12 
                flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8
            ">
                <div className="max-w-3xl w-full space-y-4 px-4 lg:px-0 lg:py-8 lg:max-w-md">
                    <h2 className="text-2xl font-semibold md:text-3xl">Contact Information</h2>
                    <p className="flex items-center gap-1 text-muted-foreground">
                        Reach out anytime. we typically reach out within the hour.
                    </p>
                    <ul className="space-y-6">
                        <li className="
                            grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3 sm:gap-y-0
                        ">
                            <Icon 
                                icon={Phone} 
                                containerClassName="sm:row-span-2 bg-secondary/30 w-12 h-12 flex justify-center items-center rounded-lg" 
                                iconClassName="w-6 h-6 text-primary" 
                            />
                            <h1 className="text-lg font-semibold text-foreground">Phone</h1>
                            <a 
                                href={config.business.phone.href}
                                className="col-span-2 sm:col-span-1 text-muted-foreground"
                            >
                                {config.business.phone.display}
                            </a>
                        </li>
                        <li className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3 sm:gap-y-0">
                            <Icon 
                                icon={Mail} 
                                containerClassName="sm:row-span-2 w-12 h-12 bg-secondary/30 flex justify-center items-center rounded-lg" 
                                iconClassName="w-6 h-6 text-secondary" 
                            />
                            <h1 className="text-lg font-semibold text-foreground">Email</h1>
                            <a href={config.business.email.href} className="col-span-2 sm:col-span-1 text-muted-foreground">
                                {config.business.email.display}
                            </a>
                        </li>
                        <li className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3">
                            <Icon 
                                icon={Link}
                                containerClassName="w-12 h-12 bg-secondary/30 flex justify-center items-center rounded-lg" 
                                iconClassName="w-6 h-6 text-accent" 
                            />
                            <h1 className="text-lg font-semibold text-foreground">Social Media</h1>
                            <p className="text-muted-foreground col-span-2">
                                Reach out on social media with any questions, and check out our past events for a little inspiration!
                            </p>
                            <ul className='flex flex-col sm:flex-row lg:flex-col gap-4 col-span-2'>
                                <li className='
                                    p-4 text-sm cursor-pointer rounded-lg
                                    bg-card hover:bg-muted
                                    border border-border hover:boreder-ring
                                    flex-1 flex items-center gap-3
                                '>
                                    <img src={FB} alt="Facebook" className='w-8 h-8'/>
                                    <span>Add us on Facebook</span>
                                    <ExternalLink className="ml-auto w-4 h-4"/>
                                </li>
                                <li className='
                                    group p-4 cursor-pointer text-sm rounded-lg
                                    bg-card hover:bg-muted
                                    border border-border hover:boreder-ring
                                    flex-1 flex items-center gap-3
                                '>
                                    <img src={IG} alt="Instagram" className='w-8 h-8'/>
                                    <span>Follow us on Instagram</span>
                                    <ExternalLink className="ml-auto w-4 h-4"/>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>

                <div className="w-full lg:py-0">
                    <div id="contact-form" className="
                        max-w-xl w-full mx-auto rounded-2xl
                        border border-border bg-card p-6 lg:p-8 space-y-4
                    ">
                        <h2 className="text-2xl font-semibold md:text-3xl">Send Us A Message</h2>
                    <Form method="post" className="space-y-4 text-sm" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1 text-sm">
                                    <label htmlFor="name" className="font-semibold">
                                        Full Name *
                                    </label>
                                    <input 
                                        id="name"
                                        name="name"
                                        className="bg-background border border-border rounded-lg p-3" 
                                        type="text" 
                                        placeholder="Arthur Morgan"
                                        value={contactFields.name}
                                        onChange={e => handleFieldChange("name", e.target.value)}
                                    />
                                    <p className={`
                                        h-3 text-sm text-destructive
                                        ${
                                            canSubmit ? "opacity-0" : "opacity-100"
                                        }
                                    `}>
                                        {errors["name"] || ""}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="phone" className="font-semibold">
                                        Phone
                                    </label>
                                    <input 
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        className="bg-background border border-border rounded-lg p-3" 
                                        type="tel"
                                        placeholder="(555) 123-4567"
                                        value={contactFields.phoneNumber}
                                        onChange={e => handleFieldChange("phoneNumber", e.target.value)}
                                        onKeyDown={handlePhoneKeyDown}
                                    />
                                    <p className={`
                                        h-3 text-sm text-destructive
                                        ${canSubmit ? "opacity-0" : "opacity-100"}
                                    `}>
                                        {errors["phoneNumber"] || ""}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="email" className="font-semibold text-sm">
                                    Email *
                                </label>
                                <input 
                                    id="email"
                                    name="email"
                                    className="bg-background border border-border rounded-lg p-3" 
                                    placeholder="arthur@example.com"
                                    value={contactFields.email}
                                    onChange={e => handleFieldChange("email", e.target.value)}
                                />
                                <p className={`
                                    h-3 text-sm text-destructive
                                    ${canSubmit ? "opacity-0" : "opacity-100"}
                                `}>
                                    {errors["email"] || ""}
                                </p>
                            </div>
                            <div>
                                <label htmlFor="message" className="">
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    className="bg-background border border-border rounded-lg p-3 w-full" 
                                    rows={10}
                                    placeholder="Tell us about your event or ask any questions..."
                                    value={contactFields.message}
                                    onChange={e => handleFieldChange("message", e.target.value)}
                                />
                                <p className={`
                                    h-3 text-sm text-destructive
                                    ${canSubmit ? "opacity-0" : "opacity-100"}
                                `}>
                                    {errors["message"] || ""}
                                </p>
                            </div>
                            {/* {statusMessage ? (
                                <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-semibold text-destructive" role="alert">
                                    {statusMessage}
                                </p>
                            ) : null} */}
                            <button
                                type="submit"
                                disabled={!canSubmit}
                                className={`
                                    w-full bg-accent text-accent-foreground px-6 py-3 rounded-lg 
                                    font-semibold cursor-pointer hover:bg-accent/90 
                                    disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground
                                `}
                            >
                                Submit Inquiry
                            </button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}
