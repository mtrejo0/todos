import { Box } from "@mui/material";
import ResponsiveAppBar from "../components/NavBar";
import TodosList from "../components/todos/TodosList";

const Home = () => {
  return (
    <div>
      <ResponsiveAppBar></ResponsiveAppBar>
      <Box sx={{ marginTop: "32px" }}>
        <TodosList />
      </Box>
    </div>
  );
};

export default Home;
