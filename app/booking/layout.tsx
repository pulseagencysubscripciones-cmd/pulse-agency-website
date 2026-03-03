import React from "react";

export default function BookingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-black text-white antialiased">
            {children}
        </div>
    );
}
