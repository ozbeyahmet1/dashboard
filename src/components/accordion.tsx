import { ReactNode, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

type AccordionProps = {
  heading: string;
  body: ReactNode;
};

export const Accordion = ({ heading, body }: AccordionProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const border = !isOpen ? " rounded-md" : "border-b-0 rounded-tr-md rounded-tl-md rounded-bl-none rounded-br-none";
  return (
    <div className="w-full text-white ">
      <div
        className={`flex h-full w-full items-center justify-between border-2 border-white text-white ${border} cursor-pointer bg-opacity-10 bg-clip-padding  px-2 py-1 backdrop-blur-sm backdrop-filter lg:px-5 lg:py-3 `}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <p className="text-base">{heading}</p>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {isOpen && (
        <div className="w-full  rounded-bl-md rounded-br-md border-b-2 border-l-2 border-r-2 border-white bg-gray p-5 ">
          {body}
        </div>
      )}
    </div>
  );
};
