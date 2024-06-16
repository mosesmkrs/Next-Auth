"use client"
import * as React from "react";

// 1. import `NextUIProvider` component
import {NextUIProvider} from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";

export default function Providers({children}: {children: React.ReactNode}) {
    return (
        <SessionProvider>
    <NextUIProvider>{children}</NextUIProvider>
    </SessionProvider>
    );
}
