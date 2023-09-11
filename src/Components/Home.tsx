import Todos from "@/Components/Todos";
import { MdAdd } from "react-icons/md";
import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";
import CalendarComponent from "./Calendar";
import SingleTodoPage from "@/pages/single_todo/[todoId]";
import EditPage from "@/pages/edit_task/[editId]";
import AddTaskPage from "@/pages/add_task";
import Modal from "./ModalLayout/Modal";
import useTodoContext from "@/hooks/useTodoContext";
import { FaMicrophone } from "react-icons/fa";
import Pagination from "./Pagination";

const Home = () => {
  const router = useRouter();
  const { modalState, openModalHandler, todos,filteredTodosDate} =
    useTodoContext();
  const renderTods = filteredTodosDate.length === 0 ? todos : filteredTodosDate;


  const PageHandler = () => {
    openModalHandler();
    router.push("/add_task");
  };
  let dynamicComponent = (
    <div className="showOnTablet">
      <CalendarComponent />;
    </div>
  );
  if (router.pathname === "/add_task") {
    dynamicComponent = (
      <Modal>
        <AddTaskPage />
      </Modal>
    );
  } else if (router.pathname === "/single_todo/[todoId]") {
    dynamicComponent = (
      <Modal>
        <SingleTodoPage />;
      </Modal>
    );
  } else if (router.pathname === "/edit_task/[editId]") {
    dynamicComponent = (
      <Modal>
        <EditPage />
      </Modal>
    );
  }
  return (
    <>
      <section className="grid_layout py-7">
        <article>
          <h1 className="text-[#101828] font-semibold font_size">
            Good morning!{" "}
          </h1>
          <p className="text-[#475467] text-base py-2">
            You got some task to do
          </p>
        </article>
        <article className="w-full">
          <button
            className="text-center bg-[#3F5BF6] py-2 px-4 border-solid border-[#3F5BF6] rounded-lg float-right hidden sm:block"
            onClick={PageHandler}
          >
            <MdAdd className="inline-block text-2xl" />
            <span className="inline-block  px-2 font-semibold">
              Create New Task
            </span>
          </button>
        </article>
      </section>
      <section className="grid_layout">
        <Todos todos={renderTods} />
        <div className="border_left">{dynamicComponent}</div>
      
        <div>
          <button className="bg-[#F9FAFB] border border-solid border-[#D0D5DD] rounded-lg shadow_custom  text-[#475467] decrease_padding block showOnMobile w-full ">
            <article className="flex justify-between w-full py-2">
              <h4 className="text-base">Input Task</h4>
              <span>
                <FaMicrophone size={24} color={"#3F5BF6"} />
              </span>
            </article>
          </button>
        </div>
      </section>
    </>
  );
};

export default Home;
