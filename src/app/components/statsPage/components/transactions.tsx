import { BsCalendarWeek } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { Transaction } from "../statsContainer";
import { format, parseISO } from 'date-fns';

const Transactions = ({ transactions }: { transactions: Transaction[] }) => {
    function formatDate(dateString: string) {
      const date = parseISO(dateString);
      const formattedDate = format(date, 'EEEE dd MMMM yyyy');
      const formattedTime = format(date, 'HH:mm');
      return {
          date: formattedDate,
          time: formattedTime
      };
    }

    if (transactions.length === 0) {
      return <div className="flex flex-row gap-6"></div>;
    }

    return (
      <div className="flex flex-col gap-6 w-full">
        {transactions.map((transaction, index) => (
          <div
            className={`flex gap-8 p-3 w-full items-center text-center flex-row ${
              transaction.cost < 0 ? 'text-red-500' : 'text-black'
            }`}
            key={index}
          >
            <p className="w-12 text-lg font-medium">{transaction.logo}</p>
            <div className="flex flex-col gap-3 w-1/3">
              <p className="text-black w-full text-start font-medium">{transaction.title}</p>
              <p className="text-gray-500 w-full text-start">{transaction.text}</p>
            </div>
            <div className="flex flex-col gap-3 w-1/4">
              <p className="text-black w-full text-start font-medium">{formatDate(transaction.date).date}</p>
              <p className="text-gray-500 w-full text-start">{formatDate(transaction.date).time}</p>
            </div>
            <p className="w-40 text-2xl text-end font-medium">{transaction.cost}$</p>
          </div>
        ))}
      </div>
    );
}

const TransactionsContainer = ({transactions}: {transactions: Transaction[]}) => {
    return (
        <div className="flex p-3 w-full flex-col gap-5 col-span-2">
        <div className="flex w-5/6 items-center justify-start">
            <p className="text-gray-500 w-4/6 text-xl">Transactions History</p>
            <p className="text-gray-500 w-1/6 text-base cursor-pointer">Select Date Range</p>
            <div className="flex w-1/6 items-center justify-end gap-10 text-gray-500">
            <BsCalendarWeek size={"24px"} />
            <button className="w-12 p-3 rounded-full bg-violet-600">
                <IoIosArrowForward size={"24px"} color="white" />
            </button>
            </div>
        </div>
        <div className="flex">
            <Transactions transactions={transactions} />
        </div>
        </div>
    );
};

export default TransactionsContainer;