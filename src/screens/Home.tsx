import { Grid } from "@mui/material";
import { useEffect } from "react";
import Logout from "../components/auth/Logout";
import Center from "../components/utils/Center";
import TodoForm from "./AddTodos";
import ResponsiveAppBar from "./NavBar";
import TodosList from "./TodosList";

interface Props { }

const Home = ({ }: Props) => {
  useEffect(() => { }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <ResponsiveAppBar></ResponsiveAppBar>

      <TodoForm />
      <TodosList />
    </div>
  );
};

export default Home;
