const express = require('express')
const router = express.Router()
const generateRecipe = require('../services/generate_recipe')

//home page here
router.get('/', function(req, res, next){
    res.render('enter_ingredients')
})

//gets info from the input of the user
router.post('/generate_recipe', function(req, res, next){
    let formData = req.body
    let userIngredients = formData.ingredients
    console.log('User entered:', userIngredients)

    //make a gemini request

    generateRecipe(userIngredients).then( recipeJSON => {
        return res.render('recipe_result', { userIngredients: userIngredients, recipeJSON: recipeJSON})
    }).catch(err => {
        return next(err)
    })
})

module.exports = router
