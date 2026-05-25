import emailjs from "@emailjs/browser";

type TemplateParams = Record<string, unknown>;

type TemplateConfig = {
    internalTemplateId?: string;
    autoReplyTemplateId?: string;
};

const config = {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    fallbackTemplateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    contactInternalTemplateId:
        import.meta.env.VITE_EMAILJS_CONTACT_INTERNAL_TEMPLATE_ID
        ?? import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID,
    contactAutoReplyTemplateId: import.meta.env.VITE_EMAILJS_CONTACT_AUTO_REPLY_TEMPLATE_ID,
    cartInternalTemplateId:
        import.meta.env.VITE_EMAILJS_CART_INTERNAL_TEMPLATE_ID
        ?? import.meta.env.VITE_EMAILJS_CART_TEMPLATE_ID,
    cartAutoReplyTemplateId: import.meta.env.VITE_EMAILJS_CART_AUTO_REPLY_TEMPLATE_ID,
};

const getTemplateIds = ({ internalTemplateId, autoReplyTemplateId }: TemplateConfig) => {
    const templateIds = [
        internalTemplateId || config.fallbackTemplateId,
        autoReplyTemplateId,
    ].filter((templateId): templateId is string => Boolean(templateId));

    return [...new Set(templateIds)];
};

const sendConfiguredEmails = async (templateConfig: TemplateConfig, params: TemplateParams) => {
    if (!config.serviceId || !config.publicKey) {
        throw new Error("EmailJS service ID and public key are required.");
    }

    const templateIds = getTemplateIds(templateConfig);

    if (templateIds.length === 0) {
        throw new Error("At least one EmailJS template ID is required.");
    }

    await Promise.all(
        templateIds.map(templateId =>
            emailjs.send(config.serviceId, templateId, params, {
                publicKey: config.publicKey,
            })
        )
    );
};

export const sendContactEmails = (params: TemplateParams) =>
    sendConfiguredEmails(
        {
            internalTemplateId: config.contactInternalTemplateId,
            autoReplyTemplateId: config.contactAutoReplyTemplateId,
        },
        params
    );

export const sendCartRequestEmails = (params: TemplateParams) =>
    sendConfiguredEmails(
        {
            internalTemplateId: config.cartInternalTemplateId,
            autoReplyTemplateId: config.cartAutoReplyTemplateId,
        },
        params
    );
