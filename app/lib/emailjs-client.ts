import emailjs from "@emailjs/browser";
import { appConfig } from "../config";

type TemplateParams = Record<string, unknown>;

type FormEmailConfig = {
    serviceId: string;
    publicKey: string;
    internalTemplateId: string;
    autoReplyTemplateId: string;
};

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

export const sendBookingRequestEmails = (params: TemplateParams) =>
    sendConfiguredEmails(config.bookingForm, params);
