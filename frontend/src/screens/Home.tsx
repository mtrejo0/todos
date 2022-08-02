import { Stack } from "@mui/material";
import TodoForm from "./AddTodos";
import ResponsiveAppBar from "./NavBar";
import TodosList from "./TodosList";

const Home = () => {
  return (
    <div>
      <ResponsiveAppBar></ResponsiveAppBar>
      <Stack spacing={8}>
        <TodoForm />
        <TodosList />
      </Stack>
    </div>
  );
};

export default Home;
