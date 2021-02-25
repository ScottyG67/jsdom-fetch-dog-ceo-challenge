console.log('%c HI', 'color: firebrick')
document.addEventListener("DOMContentLoaded", () => {
    fetchDogPictures()
    fetchDogBreeds()
    document.getElementById("breed-dropdown").addEventListener('change', (event) => {
        document.querySelector('#dog-breeds').innerHTML = ''
        let firstLetter = event.target.value
            fetch('https://dog.ceo/api/breeds/list/all')
              .then( res => res.json())
              .then( json => otherParseBreedList(json,firstLetter))
    })

});

function fetchDogPictures(){
    fetch('https://dog.ceo/api/breeds/image/random/4')
      .then( res => res.json())
      .then( convertedJson => convertedJson.message.forEach(dog => {
          const dogImageDiv = document.getElementById("dog-image-container");
          const dogImage = document.createElement("img")
          dogImage.src = dog
          dogImage.alt = "Really Cute Dog"
          dogImageDiv.append(dogImage)
      })) 
  }

function fetchDogBreeds(){
    fetch('https://dog.ceo/api/breeds/list/all')
      .then( res => res.json())
      .then( json => parseBreedList(json))
}

function otherParseBreedList (dogBreedFetchJson,firstLetter) {
    const listOfBreeds = dogBreedFetchJson.message
    const parsedBreedList = []
    for(const breed in listOfBreeds ){
        if(firstLetterTest(breed,firstLetter)){
            if (listOfBreeds[breed].length >0){
                for(const subBreed of listOfBreeds[breed]) {
                    parsedBreedList.push(subBreed + " " + breed)
                }
            } else {
                parsedBreedList.push(breed)
            }
        }
    }
    addBreedsToDom(parsedBreedList)
}

function firstLetterTest(breed,firstLetter){
    if (firstLetter === breed[0]){
        return true
    } else {return false}
}

function parseBreedList (dogBreedFetchJson) {
    const listOfBreeds = dogBreedFetchJson.message
    const parsedBreedList = []
    for(const breed in listOfBreeds ){
            if (listOfBreeds[breed].length >0){
                for(const subBreed of listOfBreeds[breed]) {
                    parsedBreedList.push(subBreed + " " + breed)
                }
            } else {
                parsedBreedList.push(breed)
            }
    }
    addBreedsToDom(parsedBreedList)
}

function addBreedsToDom(breedListArray){
    let breedList = document.querySelector('#dog-breeds')
    breedListArray.forEach(breed => {
        let li = document.createElement('li')
            li.innerHTML = breed
            li.addEventListener('click',() => {
                li.style.color = getRandomColor()
            })
        breedList.append(li)
        
    })
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

