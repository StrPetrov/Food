const provide = () => {
    let searchBtn = document.querySelector('#search');
    let inputField = document.querySelector('#ingridient');
    let inputValue;
    const mealNameArray = [];
    const mealPhotoArray  = [];
    const mealIdArray = [];
    let errorMessage = document.querySelector('#error_message');
    let containerToRender = document.querySelector('.main_container_food_list');
    let i = 0;
    let y = 0;
    let z = 0;
    let readMoreButtons;
    let modal = document.querySelector('.modal');
    let modalClose = document.querySelector('.modal_close');
    let modalHeader = document.querySelector('.modal_header');
    let modalDesc = document.querySelector('.modal_desc');
    let modalPhoto = document.querySelector('.modal_photo');
    

    searchBtn.addEventListener('click', function(event) {
        containerToRender.innerHTML = '';
        z = 0;
        y = 0;
        event.preventDefault();
        inputValue = inputField.value;
        inputField.value = '';
        const foodApi = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputValue}`;

        fetch(foodApi)
        .then(res => res.json())
        .then(data => {
            if (data.meals === null) {
                errorMessage.style.visibility = 'visible';
            }
            else {
                errorMessage.style.visibility = 'hidden';
                data.meals.forEach(meal => {
                    mealNameArray.push(meal.strMeal);
                    mealPhotoArray.push(meal.strMealThumb);
                    mealIdArray.push(meal.idMeal);

                    for(; i < mealNameArray.length, i < mealPhotoArray.length; i++) {
                        containerToRender.insertAdjacentHTML('afterbegin',
                         `<div class="card">
                            <img src="${mealPhotoArray[i]}">
                            <p>${mealNameArray[i]}</p>
                            <button class="read_more_buttons">Read more</button>
                          </div>`)
                    }

                    readMoreButtons = document.querySelectorAll('.read_more_buttons');
                })

                mealIdArray.reverse();

                for (; z < readMoreButtons.length; z++) {
                        readMoreButtons[z].setAttribute('id', `${mealIdArray[z]}`);
                    } 

                for (; y < readMoreButtons.length; y++) {
                    readMoreButtons[y].addEventListener('click', function() {
                        const specificApi = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${this.id}`;
                        modal.style.display = 'block';
                        
                        fetch(specificApi)
                        .then(res => res.json())
                        .then (data => {
                            let modalName = data.meals[0].strMeal;
                            let modalCategory = data.meals[0].strCategory;
                            let modalRecipe = data.meals[0].strInstructions;
                            let modalPhotoSrc = data.meals[0].strMealThumb;
                            let modalYoutube = data.meals[0].strYoutube;

                            modalHeader.insertAdjacentHTML('afterbegin', `
                            <h1>${modalName}</h1>
                            <h3>${modalCategory}</h3>`)

                            modalPhoto.insertAdjacentHTML('afterbegin', `
                            <a href="${modalYoutube}" target="_blank"><img src="${modalPhotoSrc}"></a>`)

                            modalDesc.insertAdjacentHTML('afterbegin', `
                            <p>${modalRecipe}</p>`) 

                            modalClose.addEventListener('click', function() {
                                modal.style.display = 'none';
                                modalHeader.innerHTML = '';
                                modalPhoto.innerHTML = '';
                                modalDesc.innerHTML = '';
                            })
                        }) 
                    })
                }
            } 
        })
    })
}

let reload = () => {
    let reloadBtn = document.querySelector('#tryAgain');

    reloadBtn.addEventListener('click', function() {
        location.reload();
    })
}

provide();
reload();

