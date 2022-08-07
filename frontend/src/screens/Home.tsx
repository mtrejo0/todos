import { Stack } from "@mui/material";
import TodoForm from "../components/todos/AddTodos";
import ResponsiveAppBar from "../components/NavBar";
import TodosList from "../components/todos/TodosList";

const Home = () => {
  return (
    <div>
      <ResponsiveAppBar></ResponsiveAppBar>
      <Stack spacing={4}>
        <TodoForm />
        <TodosList />
      </Stack>
    </div>
  );
};

export default Home;
