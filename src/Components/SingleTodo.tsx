import { GrClose } from "react-icons/gr";
import { AiOutlineCalendar, AiOutlineClockCircle } from "react-icons/ai";
import Link from "next/link";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { singleTodoType } from "@/types/task_types";
import useTodoContext from "@/hooks/useTodoContext";
import { convertTo12HourFormat } from "@/utils/helperFunctions";

const SingleTodo = ({
  id,
  title,
  start_time,
  end_time,
  date,
}: singleTodoType) => {
  const { closeModalHandler } = useTodoContext();
  return (
    <div className="rounded-lg bg-white border border-solid border-[#D0D5DD] custom_shadow  overRide  px-[1.5rem] height_vh ">
      <article className=" flex my-4 justify-end">
        <button onClick={() => closeModalHandler()}>
          <GrClose />
        </button>
      </article>
      <h2 className=" font-bold text-lg text-[#272727] my-4">
        {title ? title : "Go to market"}
      </h2>
      <article className="font-medium text-base text-[#272727]">
        <h3 className="flex gap-2 items-center my-2">
          <AiOutlineCalendar size={20} color="#3F5BF6" />

          <span>{date ? date : "today"}</span>
        </h3>
        <p className="flex gap-2 items-center">
          <AiOutlineClockCircle size={20} color="#3F5BF6" />
          <span>
            {start_time ? convertTo12HourFormat(start_time) : "10am"}-{" "}
            {end_time ? convertTo12HourFormat(end_time) : "11am"}
          </span>
        </p>
      </article>

      <form>
        <fieldset className="flex justify-between font-semibold gap-4 my-8">
          <button
            className={`bg-white py-2 px-4 rounded-lg text-[#344054] border border-solid border-[#D0D5DD] custom_shadow  w-full text-base ${inter.className}`}
          >
            Delete
          </button>
          <Link
            passHref
            href={`/edit_task/${id}`}
            className="bg-[#3F5BF6] text-white py-2 px-4 rounded-lg custom_shadow  w-full  text-center text-sm"
          >
            Edit
          </Link>
        </fieldset>
      </form>
    </div>
  );
};

export default SingleTodo;
