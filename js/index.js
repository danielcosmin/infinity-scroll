const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let readyBoolean = false
let imagesLoaded = 0
let totalImages = 0

let photosArray = []

// Unsplash API
let count = 5
const apiKEY = 'W3MK9Tm4vMGSjyRUxitZ0pzkTXJMCUPha8UxOD2pUgs'
let apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKEY}&count=${count}`

// Check if all images were loaded
function imageLoaded(){
    //console.log('image loaded')
    imagesLoaded++
    console.log(imagesLoaded)
    if(imagesLoaded === totalImages) {
        readyBoolean = true
        loader.hidden = true
        count = 30
        //console.log('ready = ', readyBoolean)
    }
}

// Helper Function to Set Attributes on DOM elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Create element for links and photos , Add to DOM
function displayPhotos(){
    imagesLoaded = 0
    totalImages = photosArray.length
    console.log('total images = ', totalImages)
    //Run function for each object in photosArray
    photosArray.forEach((photo)=>{
        //Creating <a> to link  unsplash
        const item = document.createElement('a')  
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        })
        //Create <img> for photo
        const img = document.createElement('img')
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded)
        //Put <img> inside <a>, then put both inside imageContainer element
        item.appendChild(img)
        imageContainer.appendChild(item)
    })
}

// Get photos from Unslapsh APi
async function getPhotos(){
    try {
        const response = await fetch(apiURL)
        photosArray = await response.json()
        //console.log(photosArray)
        displayPhotos()
    } catch (error) {
        // Catch error
    }
}

// Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', ()=>{
    //console.log('scrolled')
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && readyBoolean) {
        readyBoolean = false
        getPhotos()
        // console.log('load more imgs')
    }
})

// on load
getPhotos() 