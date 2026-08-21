import { BalanceCards } from "./balance-cards";
import WizardInput from "./wizard-input";

export default function DashboarContent() {
    return (
        <section className="space-y-4" id="content">
            <WizardInput />
            <BalanceCards />
        </section>
    )
}