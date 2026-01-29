import React from "react";
import ShopNavbar from "@/components/ShopNavbar";


export default function ShopLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <ShopNavbar />
            <main className="shop-main">
                {children}
            </main>

        </>
    );
}
