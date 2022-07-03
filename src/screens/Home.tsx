import { useEffect } from "react";
import Logout from "../components/auth/Logout";
import Center from "../components/utils/Center";
import TodoForm from "./AddTodos";
import TodosList from "./TodosList";

interface Props { }

const Home = ({ }: Props) => {
  useEffect(() => { }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Center>
      <Logout />
      <TodoForm />
      <TodosList />
    </Center>
  );
};

export default Home;
