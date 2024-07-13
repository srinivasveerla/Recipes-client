import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Box,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";

interface Author {
  name: string;
  email: string;
}

interface Step {
  step_number: number;
  description: string;
}

interface Ingredient {
  name: string;
}

interface Measurement {
  unit: string;
}

interface Quantity {
  ingredient: Ingredient;
  measurement: Measurement;
  quantity: string;
}

interface Recipe {
  id: number;
  name: string;
  date: string;
  description: string;
  author: Author;
  steps: Step[];
  quantities: Quantity[];
  display_picture: string;
}

const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    fetch("http://18.217.108.214:8000/api/recipes/")
      .then((response) => response.json())
      .then((data) => setRecipes(data));
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1">
          Recipes
        </Typography>
        <Button
          component={RouterLink}
          to="/create"
          variant="contained"
          startIcon={<AddIcon />}
        >
          Create Recipe
        </Button>
      </Box>
      <Grid container spacing={4}>
        {recipes.map((recipe) => (
          <Grid item key={recipe.id} xs={12} sm={6} md={4}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardMedia
                component="img"
                height="140"
                image={recipe.display_picture}
                alt={recipe.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {recipe.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  By {recipe.author.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {recipe.description}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2 }}>
                <Button
                  component={RouterLink}
                  to={`/recipe/${recipe.id}`}
                  variant="contained"
                  fullWidth
                >
                  View Details
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RecipeList;