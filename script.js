// some constants
const container = document.getElementById('image-container');
const loader =  document.getElementById('loader');

let ready = false;
let totalImage = 0;
let imageLoaded = 0;
let photosArray = [];

// unsplash API
const count = 30;
const apiKey = '5t5qfpZYHZBvu6QDXzICY7S1LqhBmNzq4D7EMsPSqF8';
const apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Add helper function to improve the code
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}


// Image Loaded Function That Check If all images are Loaded
function imageLoader() {
    
    imageLoaded++;
    if(imageLoaded === totalImage){
        ready = true;
        loader.hidden = true;
    }

}

// display photos
function displayPhotos() {
    imageLoaded = 0;
    totalImage = photosArray.length;
    
    // loop inside each object inside the photos array
    photosArray.forEach(photo => {
        
        // create a tag with it's attributes then the img attribute
        const a = document.createElement('a');
        // set two attributes for this Element
        // a.setAttribute('href', photo.links.html);
        // a.setAttribute('target', '_blank');
        setAttributes(a, {
            href: photo.links.html,
            target: '_blank',
        });

        
        // Create <img> for Photos
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        

        // Check when the page is loaded
        img.addEventListener('load', imageLoader);
        
        // Put <img> inside <a>, Then Put both inside the <image-container div>
        a.appendChild(img);
        container.appendChild(a);
    })
}


// Setup async function for fetching the photos from unsplash
const getPhotos = async () => {
    try {
        const response = await fetch(apiURL);
        photosArray = await response.json();

        // call the magic 
        displayPhotos();

    } catch (error) {   
        console.log(`The Error is:- ${error}`);
    }
}


// check to see if scrolling near bottom of page, then load more images
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
});


getPhotos();
// console.log(photosArray)