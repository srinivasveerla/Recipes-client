import {
  CircularProgress,
  Container,
  Button,
  Typography,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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

interface QuantityState {
  [key: string]: boolean;
}

const RecipeDetail: React.FC = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [quantityState, setQuantityState] = useState<QuantityState>({});
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetch(`http://18.217.108.214:8000/api/recipes/${id}/`)
      .then((response) => response.json())
      .then((data) => {
        setRecipe(data);
        const initialState = data.quantities.reduce(
          (acc: QuantityState, quantity: Quantity) => {
            acc[quantity.ingredient.name] = false;
            return acc;
          },
          {}
        );
        setQuantityState(initialState);
      });
  }, [id]);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantityState({
      ...quantityState,
      [event.target.name]: event.target.checked,
    });
  };

  const [checkStepsAnyways, setCheckStepsAnyways] = useState(false);

  const allQuantitiesChecked =
    recipe && Object.values(quantityState).every(Boolean);

  if (!recipe) return <CircularProgress />;

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Button component={RouterLink} to="/" variant="outlined" sx={{ mb: 2 }}>
        Back to Recipes
      </Button>
      <Typography variant="h4" component="h1" gutterBottom>
        {recipe.name}
      </Typography>
      <Box sx={{ mb: 2 }}>
        <img
          src={recipe.display_picture}
          alt={recipe.name}
          style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
        />
      </Box>
      <Typography variant="subtitle1" gutterBottom>
        By {recipe.author.name} on {new Date(recipe.date).toLocaleDateString()}
      </Typography>
      <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
        {recipe.description}
      </Typography>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Ingredients
      </Typography>
      <FormGroup>
        {recipe.quantities.map((quantity, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={quantityState[quantity.ingredient.name]}
                onChange={handleQuantityChange}
                name={quantity.ingredient.name}
              />
            }
            label={`${quantity.ingredient.name} - ${quantity.quantity} ${quantity.measurement.unit}`}
          />
        ))}
      </FormGroup>

      {allQuantitiesChecked || checkStepsAnyways ? (
        <>
          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            Steps
          </Typography>
          <List>
            {recipe.steps.map((step) => (
              <ListItem key={step.step_number}>
                <ListItemText
                  primary={`${step.step_number}. ${step.description}`}
                />
              </ListItem>
            ))}
          </List>
        </>
      ) : (
        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Typography variant="body1" sx={{ mt: 4, fontStyle: "italic" }}>
            Check all ingredients to view recipe steps.
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              setCheckStepsAnyways(true);
            }}
          >
            Check recipe steps anyways
          </Button>
        </Box>
      )}
    </Container>
  );
};
export default RecipeDetail;
