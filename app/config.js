export const appConfig = {
    business: {
        name: "Jump For Joy Inflatables",
        shortName: "Jump For Joy",
        phone: {
            display: "(555) 555-0199",
            href: "tel:+15555550199",
        },
        email: {
            display: "bookings@jumpforjoy.com",
            href: "mailto:bookings@jumpforjoy.com",
        },
        location: "Chandler, AZ",
        verse: "1 Peter 1:8",
        social: {
            facebook: "",
            instagram: "",
        },
        hours: [
            { day: "Mon - Thu", hours: "9:00 AM - 8:00 PM" },
            { day: "Friday", hours: "9:00 AM - 9:00 PM" },
            { day: "Saturday", hours: "8:00 AM - 9:00 PM" },
            { day: "Sunday", hours: "9:00 AM - 6:00 PM" },
        ],
    },
    booking: {
        deliveryFee: 25,
        successRedirectDelayMs: 2000,
    },
    emailjs: {
        contactForm: {
            serviceId: "j4ji_service",
            publicKey: "DHPr4G8U2Kz9dLDPR",
            internalTemplateId: "contact_form",
            autoReplyTemplateId: "contact_form_auto_reply",
        }, 
        bookingForm: {
            serviceId: "j4ji_service",
            publicKey: "3jXEN5WozD83fzk5B",
            internalTemplateId: "booking_form",
            autoReplyTemplateId: "booking_auto_reply",
        }
    },
    contentful: {
        spaceId: "h6lueo8xvk4p",
        accessToken: "40P0KY3Ds-gGxxJIvM3RYX0k1Ja3h6AFFk_1Wn1cEo8",
    },
};

const trimString = value => typeof value === "string" ? value.trim() : "";

const createPhoneHref = phoneNumber => {
    const digits = phoneNumber.replace(/\D/g, "");
    return digits ? `tel:+1${digits.length === 10 ? digits : digits.replace(/^1/, "")}` : appConfig.business.phone.href;
};

const createEmailHref = email => email ? `mailto:${email}` : appConfig.business.email.href;

export function createAppConfig(cmsBusinessInfo) {
    const phoneNumber = trimString(cmsBusinessInfo?.phoneNumber);
    const email = trimString(cmsBusinessInfo?.email);
    const facebookLink = trimString(cmsBusinessInfo?.facebookLink);
    const instagramLink = trimString(cmsBusinessInfo?.instagramLink);

    return {
        ...appConfig,
        business: {
            ...appConfig.business,
            phone: phoneNumber
                ? {
                    display: phoneNumber,
                    href: createPhoneHref(phoneNumber),
                }
                : appConfig.business.phone,
            email: email
                ? {
                    display: email,
                    href: createEmailHref(email),
                }
                : appConfig.business.email,
            social: {
                ...appConfig.business.social,
                facebook: facebookLink || appConfig.business.social.facebook,
                instagram: instagramLink || appConfig.business.social.instagram,
            },
        },
    };
}
