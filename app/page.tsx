import TodoList from "@/components/TodoList";
import Navbar from "@/components/ui/navbar";

export default function Home() {
  return (
    <main className="flex justify-center items-center min-h-screen">
      <Navbar/>
      <TodoList />
    </main>
  );
}