import {
  Container,
  Typography,
  TextField,
  Box,
  IconButton,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Delete";
const RecipeCreate: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    author_name: "",
    author_email: "",
    display_picture: "",
    steps: [""],
    ingredients: [{ name: "", quantity: "", measurement: "" }],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStepChange = (index: number, value: string) => {
    const newSteps = [...formData.steps];
    newSteps[index] = value;
    setFormData({ ...formData, steps: newSteps });
  };

  const handleIngredientChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const addStep = () => {
    setFormData({ ...formData, steps: [...formData.steps, ""] });
  };

  const removeStep = (index: number) => {
    const newSteps = formData.steps.filter((_, i) => i !== index);
    setFormData({ ...formData, steps: newSteps });
  };

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [
        ...formData.ingredients,
        { name: "", quantity: "", measurement: "" },
      ],
    });
  };

  const removeIngredient = (index: number) => {
    const newIngredients = formData.ingredients.filter((_, i) => i !== index);
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://18.217.108.214:8000/api/recipes/create/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            date: new Date().toISOString(),
          }),
        }
      );
      if (response.ok) {
        navigate("/");
      } else {
        console.error("Failed to create recipe");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Create New Recipe
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Recipe Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={3}
          required
        />
        <TextField
          fullWidth
          label="Author Name"
          name="author_name"
          value={formData.author_name}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Author Email"
          name="author_email"
          type="email"
          value={formData.author_email}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Display Picture URL"
          name="display_picture"
          value={formData.display_picture}
          onChange={handleChange}
          margin="normal"
          required
        />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Steps
        </Typography>
        {formData.steps.map((step, index) => (
          <Box
            key={index}
            sx={{ display: "flex", alignItems: "center", mb: 2 }}
          >
            <TextField
              fullWidth
              label={`Step ${index + 1}`}
              value={step}
              onChange={(e) => handleStepChange(index, e.target.value)}
              margin="normal"
              required
            />
            <IconButton onClick={() => removeStep(index)}>
              <RemoveIcon />
            </IconButton>
          </Box>
        ))}
        <Button onClick={addStep} startIcon={<AddIcon />}>
          Add Step
        </Button>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Ingredients
        </Typography>
        {formData.ingredients.map((ingredient, index) => (
          <Box
            key={index}
            sx={{ display: "flex", alignItems: "center", mb: 2 }}
          >
            <TextField
              label="Ingredient Name"
              value={ingredient.name}
              onChange={(e) =>
                handleIngredientChange(index, "name", e.target.value)
              }
              margin="normal"
              required
              sx={{ mr: 1 }}
            />
            <TextField
              label="Quantity"
              value={ingredient.quantity}
              onChange={(e) =>
                handleIngredientChange(index, "quantity", e.target.value)
              }
              margin="normal"
              required
              sx={{ mr: 1 }}
            />
            <TextField
              label="Measurement"
              value={ingredient.measurement}
              onChange={(e) =>
                handleIngredientChange(index, "measurement", e.target.value)
              }
              margin="normal"
              required
            />
            <IconButton onClick={() => removeIngredient(index)}>
              <RemoveIcon />
            </IconButton>
          </Box>
        ))}
        <Button onClick={addIngredient} startIcon={<AddIcon />}>
          Add Ingredient
        </Button>
        <Box sx={{ mt: 3 }}>
          <Button type="submit" variant="contained" color="primary">
            Create Recipe
          </Button>
        </Box>
      </form>
    </Container>
  );
};
export default RecipeCreate;
