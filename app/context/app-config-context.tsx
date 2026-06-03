import { createContext, useContext, type ReactNode } from "react";
import { appConfig, type AppConfig, type BusinessConfig } from "../config";

export type ResolvedAppConfig = AppConfig & BusinessConfig;

const fallbackBusinessConfig: BusinessConfig = {
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
};

const AppConfigContext = createContext<ResolvedAppConfig>({
    ...appConfig,
    ...fallbackBusinessConfig,
});

export function AppConfigProvider({
    config,
    children,
}: {
    config: ResolvedAppConfig;
    children: ReactNode;
}) {
    return (
        <AppConfigContext.Provider value={config}>
            {children}
        </AppConfigContext.Provider>
    );
}

export function useAppConfig() {
    return useContext(AppConfigContext);
}
