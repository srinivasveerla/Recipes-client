import React, {  } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link as RouterLink,
  Routes,
} from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RecipeDetail from "./components/RecipeDetails";
import RecipeCreate from "./components/RecipeCreate";
import RecipeList from "./components/RecipeList";

const theme = createTheme();

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Recipe App
            </Typography>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/create" element={<RecipeCreate />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
