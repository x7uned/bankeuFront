import { Outfit } from "next/font/google";

import ContactsContainer from "./components/contacts";
import CardsContainer from "./components/cards";
import BalanceContainer from "./components/balance";
import TransactionsContainer from "./components/transactions";

const mont = Outfit({ subsets: ["latin"], variable: "--mont" });

export interface Contact {
  name: string;
  avatar: string;
}

export interface Transaction {
  title: string;
  text: string;
  logo: string;
  date: string;
  cost: number;
}

export interface StatsContainerProps {
  contacts: Contact[];
  cards: string[];
  selected_card: number;
  owner_id: number;
}

export interface Card {
  id: number;
  owner_id: number;
  card_name: string;
  card_number: number;
  balance_value: string;
  transactions: Transaction[];
  created_at: Date;
  card_design: string;
}

interface Props {
  data?: StatsContainerProps;
  card?: Card;
}

export default function StatsContainer({ data = { contacts: [], cards: [], selected_card: 0, owner_id: 0 }, card = {} as Card }: Props) {
  return (
    <main className="flex bg-white w-full min-h-screen pl-24">
      <aside className={`row-span-4 w-1/3 ${mont.className}`}>
        <CardsContainer data={card} />
      </aside>
      <article className={`w-3/4 flex flex-col gap-16 ${mont.className}`}>
        <BalanceContainer data={card} />
        <ContactsContainer contacts={data.contacts} />
        <TransactionsContainer transactions={card?.transactions || []} />
      </article>
    </main>
  );
}
