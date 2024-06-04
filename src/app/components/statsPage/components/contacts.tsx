import { GoPlus } from "react-icons/go";
import Image from "next/image";
import shibo from '../../header/shibo.jpg';

interface Contact {
    name: string;
    avatar: string;
}

const Contacts = ({ contacts }: { contacts: Contact[] }) => {
    if (contacts.length === 0) {
        return <div className="flex flex-row gap-6"></div>;
    }

    return (
        <div className="flex flex-row gap-6">
            {contacts.map((contact, index) => (
                <div className="flex gap-3 w-14 items-center text-center flex-col" key={index}>
                    <Image
                        className="cursor-pointer rounded-full overflow-hidden"
                        width={100}
                        height={100}
                        src={shibo}
                        alt={contact.name}
                    />
                    <p className="text-gray-500 w-full truncate">{contact.name}</p>
                </div>
            ))}
        </div>
    );
};

const ContactsContainer = ({ contacts }: { contacts: Contact[] }) => {
    return (
        <div className={`flex p-3 w-full flex-col gap-5 col-span-2`}>
            <div className="flex w-5/6 items-center justify-between">
                <p className="text-gray-500 text-xl">Recent Contacts</p>
                <p className="text-violet-600 font-medium text-lg cursor-pointer">All Contacts</p>
            </div>
            <div className="flex gap-6 max-w-5xl items-start text-center flex-row overflow-hidden">
                <div className="flex gap-3 w-14 items-center text-center flex-col cursor-pointer">
                    <div className="flex items-center justify-center size-14 border-dashed border-2 border-violet-600 rounded-full">
                        <GoPlus size={"22px"} className="text-violet-600" />
                    </div>
                    <p className="text-gray-500">Add</p>
                </div>
                <Contacts contacts={contacts} />
            </div>
        </div>
    );
};

export default ContactsContainer;
