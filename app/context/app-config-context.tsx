import { createContext, useContext, type ReactNode } from "react";
import { appConfig, type AppConfig } from "../config";

const AppConfigContext = createContext<AppConfig>(appConfig);

export function AppConfigProvider({
    config,
    children,
}: {
    config: AppConfig;
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
