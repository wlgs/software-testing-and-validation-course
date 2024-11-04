"use server";
import { validateRequest } from "@/auth/validate-request";
import Link from "next/link";
import { LogoutButton } from "./(login)/login/components/logout-button";

export default async function Home() {
    const { user } = await validateRequest();
    return (
        <>
            <main className="container mt-[48px]">
                <h1>Home</h1>
            </main>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
        </>
    );
}
