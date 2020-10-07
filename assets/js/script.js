var key = "1";

function searchResults(ingredientSearch){
  var queryURL = "https://www.themealdb.com/api/json/v1/1/filter.php?i=" + ingredientSearch;
  $.ajax({
      url: queryURL,
      method: "GET"
  }).then(function(response){
      console.log(JSON.stringify(response));
      for(var i=0; i < 6; i++){

          var carddiv= $("<div>");
          carddiv.addClass("card-div");
          $(".cards").append(carddiv);

          var mainchoice = response.meals[i].strMeal;
          console.log(mainchoice);
          var cardheader = $("<h1>")
          cardheader.text(mainchoice)
          carddiv.append(cardheader);

          var recipeValue = response.meals[i].strMealThumb ;
          console.log(recipeValue);

          var choiceImg = response.meals[i].idMeal;
          console.log(choiceImg); 
          var cardImg = $("<img>")
          cardImg.attr("src", choiceImg)
          carddiv.append(cardImg);     
      }
  });
}

var recipeBookArr = [];
var recipeBookArrStorage = localStorage.getItem("recipeBookArrStorage")
if (recipeBookArrStorage !== null){
  recipeBookArr = JSON.parse(recipeBookArrStorage)
}

function addRecipe(){
  var recipeName = $(this).val()
  var recipeValue = $(this).val()
  var recipeAddToArray = (recipeName, recipeValue)
  recipeBookArr.push(recipeAddToArray);
  localStorage.setItem("recipeBookArrStorage", JSON.stringify(recipeBookArr))
  $(".recipe-book").empty();
  createRecipeBook()
}

function createRecipeBook(){
  if (recipeBookArr){
    for (var i=0; i<recipeBookArr.length; i++){
      var newRecipeButton = $("<button>");
      newRecipeButton.text(recipeBookArr[i])
      $(".recipe-book").append(newRecipeButton)
    }
  }
}

$("#submit").on("click", function(e){
  e.preventDefault();
  var ingredientSearch = $("#search").val()
  searchResults(ingredientSearch)
})