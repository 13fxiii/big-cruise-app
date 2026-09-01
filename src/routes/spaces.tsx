import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/spaces")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
  component: () => null,
});
