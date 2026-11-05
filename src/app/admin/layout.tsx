import AdminShell from "@/components/admin/AdminShell";
export const metadata = { title: "لوحة التحكم | I Smart Digit", robots: { index: false, follow: false } };
export default function Layout({ children }: { children: React.ReactNode }) { return <AdminShell>{children}</AdminShell>; }
