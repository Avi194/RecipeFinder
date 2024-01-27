const resultList = document.getElementById("searchResult");
const searchInput = document.getElementById("search");

function FindRecipe(){
    const apiKey = '6905b557ec1c431d83099fc3b87759dd';
    const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchInput.value}&apiKey=${apiKey}&number=10`;
    fetch(apiUrl)
    .then(response => response.json())
    .then (data =>{
        resultList.innerHTML = "";
        if (data.length === 0)
        {
            resultList.innerHTML = "<p>no recipes found <p>";
        }
        else
        {
            data.forEach(recipe => {
                const ListElement = document.createElement('li');
                const ytButton = document.createElement('button');
                var searchname = `${recipe.title}`;
                var youtubeSearch = searchname.replace(/\s+/g, '+');
                function youtube(){
                    window.open("https://www.youtube.com/results?search_query="+youtubeSearch,"_blank");
                }
                ytButton.type = "button";
                ytButton.addEventListener('click',youtube);
                ytButton.classList.add("onet");
                ytButton.innerHTML = "HOW TO MAKE";
                ListElement.innerHTML = `<strong>${recipe.title}</strong> - ${recipe.missedIngredientCount} missing ingredients`;
                resultList.appendChild(ListElement);
                ListElement.appendChild(ytButton);
            });
        }
    })
    .catch(error => {
        console.error('Error fetching recipes:', error);
        resultList.innerHTML = '<p>An error occurred while fetching recipes.</p>';
    });
}

function clearOne(){
    resultList.innerHTML = "";
    searchInput.value = "";
}