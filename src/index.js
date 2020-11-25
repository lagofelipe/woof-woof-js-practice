document.addEventListener("DOMContentLoaded", function(e){
 fetch('http://localhost:3000/pups')
 .then(function(response){
     return response.json()
 })
 .then(function(json){
     for (const dog of json)
     createDogName(dog)
 })
 })
 

function createDogName(dog){
const dogBar = document.querySelector('#dog-bar')
const dogSpan = document.createElement('span')
dogSpan.innerHTML = dog.name
dogSpan.classList.add(`good-${dog.isGoodDog}`)
dogBar.append(dogSpan)

dogSpan.addEventListener('click', function(e){
const dogInfo = document.querySelector('#dog-info')
dogInfo.innerHTML = null

createDogInfo(dog)
})
}

function createDogInfo(dog) {
    const dogInfo = document.querySelector('#dog-info')
    const img = document.createElement('img')
    img.setAttribute('src', dog.image)
    const h2 = document.createElement('h2')
    h2.innerHTML = dog.name
    
    const toogle = document.createElement('button')
    if(dog.isGoodDog == true){
       toogle.innerHTML = "Good Dog!"  
    } else {
        toogle.innerHTML = "Bad Dog!"
    }
   dogInfo.append(img, h2, toogle)

dogId = dog.id
buttonId = dog.id

toogle.addEventListener('click', function(e) {
    dog.isGoodDog = !dog.isGoodDog
    fetch(`http://localhost:3000/pups/${dog.id}`,{
  method: "PATCH",
  headers: {
    "Content-Type" : "application/json",
    "Accept": "application/json"
},
  body: JSON.stringify({
      isGoodDog: dog.isGoodDog
  })
})
.then(function(obj){
    if (dog.isGoodDog === true){
        toogle.innerHTML = "Good Dog!"
    } else {
        toogle.innerHTML = "Bad Dog!"
    }
    
})
})
}