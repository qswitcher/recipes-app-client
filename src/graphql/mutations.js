// eslint-disable
// this is an auto generated file. This will be overwritten

export const createRecipe = `mutation CreateRecipe($input: CreateRecipeInput!) {
  createRecipe(input: $input) {
    id
    title
    shortDescription
    longDescription
    thumbnail
    recipeYield
    servings
    cookTime
    ingredients
    instructions
    photo {
      bucket
      key
      region
    }
  }
}
`;
export const updateRecipe = `mutation UpdateRecipe($input: UpdateRecipeInput!) {
  updateRecipe(input: $input) {
    id
    title
    shortDescription
    longDescription
    thumbnail
    recipeYield
    servings
    cookTime
    ingredients
    instructions
    photo {
      bucket
      key
      region
    }
  }
}
`;
export const deleteRecipe = `mutation DeleteRecipe($input: DeleteRecipeInput!) {
  deleteRecipe(input: $input) {
    id
    title
    shortDescription
    longDescription
    thumbnail
    recipeYield
    servings
    cookTime
    ingredients
    instructions
    photo {
      bucket
      key
      region
    }
  }
}
`;
