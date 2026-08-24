import emailjs from "@emailjs/browser";
import { appConfig } from "../config";
import type { FieldName } from "app/routes/cart/types";

type TemplateParams = Record<string, unknown>;

type FormEmailConfig = {
    serviceId: string;
    publicKey: string;
    internalTemplateId: string;
    autoReplyTemplateId: string;
};

export const emailFields = [
    "fullName",
    "fullAddress",
    "itemsSummary",
    "deliveryFee",
    "subTotal",
    "total",
    "phoneNumber",
    "email",
    "date",
    "time",
    "eventType",
    "surfaceType",
    "notes"
] as const;
export type EmailFieldName = typeof emailFields[number]

export type EmailFormat = Record<EmailFieldName, string>

const config = appConfig.emailjs;

const getTemplateIds = ({ internalTemplateId, autoReplyTemplateId }: FormEmailConfig) => {
    const templateIds = [
        internalTemplateId,
        autoReplyTemplateId,
    ].filter((templateId): templateId is string => Boolean(templateId));

    return [...new Set(templateIds)];
};

const sendConfiguredEmails = async (templateConfig: FormEmailConfig, params: TemplateParams) => {
    if (!templateConfig.serviceId || !templateConfig.publicKey) {
        throw new Error("EmailJS service ID and public key are required.");
    }

    const templateIds = getTemplateIds(templateConfig);

    if (templateIds.length === 0) {
        throw new Error("At least one EmailJS template ID is required.");
    }

    await Promise.all(
        templateIds.map(templateId =>
            emailjs.send(templateConfig.serviceId, templateId, params, {
                publicKey: templateConfig.publicKey,
            })
        )
    );
};

export const sendContactEmails = (params: TemplateParams) =>
    sendConfiguredEmails(config.contactForm, params);

export const sendBookingRequestEmails = (params: EmailFormat) =>
    sendConfiguredEmails(config.bookingForm, params);

export const createEmailFormat = () => {

}
