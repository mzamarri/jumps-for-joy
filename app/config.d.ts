export type BusinessHour = {
    day: string;
    hours: string;
};

export type AppConfig = {
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
    booking: {
        deliveryFee: number;
        successRedirectDelayMs: number;
    };
    emailjs: {
        contactForm: {
            serviceId: string;
            publicKey: string;
            internalTemplateId: string;
            autoReplyTemplateId: string;
        };
        bookingForm: {
            serviceId: string;
            publicKey: string;
            internalTemplateId: string;
            autoReplyTemplateId: string;
        };
    };
    contentful: {
        spaceId: string;
        accessToken: string;
    };
};

export const appConfig: AppConfig;

export type CmsBusinessInfo = {
    phoneNumber?: string | null;
    email?: string | null;
    facebookLink?: string | null;
    instagramLink?: string | null;
} | null | undefined;

export function createAppConfig(cmsBusinessInfo?: CmsBusinessInfo): AppConfig;
