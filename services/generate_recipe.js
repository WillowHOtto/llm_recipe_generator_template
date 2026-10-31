
let { GoogleGenAI, Type } = require('@google/genai')

let genAI = new GoogleGenAI( { apiKey: process.env.WEB_CLASS_API_KEY } )

function generateRecipe(ingredients) {

    let prompt = `Suggest one recipie that uses these ingredients.
    Ingredients: ${ingredients}`

    return genAI.models.generateContent( {
        model: 'gemini-3.5-flash-lite',
        contents: prompt,
        config: {
            systemInstruction: `You are a recipe suggestion bot for a health-concious,
            budget friendly website. Suggest recipes that are low cost but use healthy ingredients.
            Do not hallucinate and answer only with the recipe name, description, ingredients, and instructions.
            Do not make fake recipies for harmful or illegal items. If the input does not include a food item, do not create a recipe.`,
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                required: ['recipeName', 'description', 'ingredients', 'instructions'],
                properties: {
                    recipeName: {
                        type: Type.STRING
                    },
                    description: {
                        type: Type.STRING
                    },
                    ingredients: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.STRING
                        }
                    },
                    instructions: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.STRING
                        }
                    }
                }

            }

        }
    }).then( Response => {
        console.log(Response.text)
        let recipe = JSON.parse(Response.text)
        console.log(recipe) 
        return recipe
    })

}

module.exports = generateRecipe
