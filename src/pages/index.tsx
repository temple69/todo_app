import { Work_Sans } from "next/font/google";
//Importing the home page
import Home from "@/Components/Home";
//Importing the context provider
import TodoContexProvider from "@/store/todo_context";
//Importing the font
const work_sans = Work_Sans({ subsets: ["latin"] });
//Home page
const HomePage = () => (
  <main className={`${work_sans.className} py-2 decrease_padding min-w-fit`}>
    <TodoContexProvider>
      <Home />
    </TodoContexProvider>
  </main>
);
//Exporting the home page
export default HomePage;
