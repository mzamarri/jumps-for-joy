export type BusinessHour = {
    day: string;
    hours: string;
};

export type EmailJsFormConfig = {
    serviceId: string;
    publicKey: string;
    internalTemplateId: string;
    autoReplyTemplateId: string;
};

export type EmailJsConfig = {
    contactForm: EmailJsFormConfig;
    bookingForm: EmailJsFormConfig;
};

export type BusinessConfig = {
    business: {
        name: string;
        shortName: string;
        phone: {
            display: string;
            href: string;
        };
        email: {
            display: string;
            href: string;
        };
        location: string;
        verse: string;
        social: {
            facebook: string;
            instagram: string;
        };
        hours: BusinessHour[];
    };
};

export type AppConfig = {
    booking: {
        deliveryFee: number;
    };
    emailjs: EmailJsConfig;
};

export const appConfig: AppConfig;
