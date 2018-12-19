import { API, graphqlOperation } from "aws-amplify";
import { getRecipe, listRecipes } from "../graphql/queries";

class ApiFacade {
    constructor() {
        this.cache = {
            recipes: {},
            pages: null
        };
    }

    getRecipe(id) {
        if (this.cache.recipes[id]) {
            return Promise.resolve(this.cache.recipes[id]);
        }

        return API.graphql(
            graphqlOperation(getRecipe, {
                id
            })
        ).then(response => {
            this.cache.recipes[id] = response.data.getRecipe;
            return response.data.getRecipe;
        });
    }

    listRecipes = () => {
        if (this.cache.pages) {
            return Promise.resolve(this.cache.pages);
        }

        return API.graphql(graphqlOperation(listRecipes))
            .then(response => {
                this.cache.pages = response.data.listRecipes.items;
                return this.cache.pages;
            })
            .catch(err => {
                console.err(err);
            });
    };
}

export default new ApiFacade();
