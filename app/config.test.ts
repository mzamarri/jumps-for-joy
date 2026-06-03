import { describe, expect, it } from "vitest";
import { appConfig } from "./config";

describe("appConfig", () => {
    it("contains booking defaults", () => {
        expect(appConfig.booking).toEqual({
            deliveryFee: 25,
        });
    });

    it("contains hardcoded emailjs values", () => {
        expect(appConfig.emailjs).toEqual({
            bookingForm: {
                serviceId: "j4ji_service",
                publicKey: "3jXEN5WozD83fzk5B",
                internalTemplateId: "booking_form",
                autoReplyTemplateId: "booking_auto_reply",
            },
            contactForm: {
                serviceId: "j4ji_service",
                publicKey: "DHPr4G8U2Kz9dLDPR",
                internalTemplateId: "contact_form",
                autoReplyTemplateId: "contact_form_auto_reply",
            },
        });
    });
});
