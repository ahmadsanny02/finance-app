"use client";

import { useQuery } from "@tanstack/react-query";
import { BalanceCards } from "./balance-cards";
import WizardInput from "./wizard-input";
import { getBalanceSummary } from "@/features/transaction/action";

export default function DashboarContent() {
    const { data, error, refetch } = useQuery({
        queryKey: ["balance"],
        queryFn: () => getBalanceSummary(),
    });
    return (
        <section className="space-y-4" id="content">
            <WizardInput refetch={refetch} />
            <BalanceCards data={data} error={error} />
        </section>
    );
}
