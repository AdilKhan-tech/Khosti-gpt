import DashboardClient from "./DashboardClient";

export const metadata = {
  title: "Chat workspace",
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return <DashboardClient />;
}
