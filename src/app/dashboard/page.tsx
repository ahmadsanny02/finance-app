import { Metadata } from "next"
import { BalanceCards } from "./_components/balance-cards"

export const metadata: Metadata = {
    title: "Finance App | Dashboard",
    description: "Your personal financial dashboard."
}

export default function DashboardPage() {
    return (
        <div className="p-2 space-y-4">
            <section className="" id="header">
                <h1 className="text-4xl font-bold text-primary">Dashboard</h1>
                <p className="">Get insight into your spending, track your expenses, and manage your finance.</p>
            </section>
            <section className="" id="content">
                <BalanceCards />
            </section>
        </div>
    )
}