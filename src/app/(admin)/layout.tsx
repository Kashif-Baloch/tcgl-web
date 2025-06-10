import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin Dashboard - Car Finance Claims",
    description: "Admin dashboard for managing car finance claim submissions",
}

export default async function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
        </>
    );
}
