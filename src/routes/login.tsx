import { createFileRoute } from "@tanstack/react-router";
import { LoginPage } from "@/components/cruise/LoginPage";

export const Route = createFileRoute("/login")({ component: LoginPage });
