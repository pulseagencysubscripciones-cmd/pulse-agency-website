import { cn } from "./Button"
import React from "react"

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode
    containerClassName?: string
}

export function SectionWrapper({
    children,
    className,
    containerClassName,
    ...props
}: SectionWrapperProps) {
    return (
        <section className={cn("py-12 md:py-16", className)} {...props}>
            <div className={cn("container mx-auto px-6 md:px-8 max-w-7xl", containerClassName)}>
                {children}
            </div>
        </section>
    )
}
