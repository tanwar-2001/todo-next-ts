import AddTodo from "@/components/AddTodo";
import Navbar from "@/components/Navbar";
import Todos from "@/components/Todos";

export default function Home() {
  return (
    <main className="flex items-center flex-col justify-center mt-48">
      <h2 className="text-3xl">TODO NEXT + TS</h2>
      <Navbar />
      <AddTodo />
      <Todos />
    </main>
  );
}
