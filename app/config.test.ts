import { describe, expect, it } from "vitest";
import { appConfig, createAppConfig } from "./config";

describe("createAppConfig", () => {
    it("uses default app config when CMS business info is missing", () => {
        expect(createAppConfig(undefined)).toEqual(appConfig);
    });

    it("overrides public business contact values from CMS", () => {
        const config = createAppConfig({
            phoneNumber: "(480) 555-1212",
            email: "hello@example.com",
            facebookLink: "https://facebook.com/jumpforjoy",
            instagramLink: "https://instagram.com/jumpforjoy",
        });

        expect(config.business.phone).toEqual({
            display: "(480) 555-1212",
            href: "tel:+14805551212",
        });
        expect(config.business.email).toEqual({
            display: "hello@example.com",
            href: "mailto:hello@example.com",
        });
        expect(config.business.social).toEqual({
            facebook: "https://facebook.com/jumpforjoy",
            instagram: "https://instagram.com/jumpforjoy",
        });
        expect(config.booking).toBe(appConfig.booking);
        expect(config.emailjs).toBe(appConfig.emailjs);
    });
});
