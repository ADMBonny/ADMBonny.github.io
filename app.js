
const apiKey = '6tUUP5PEkz9G5ui55sAZ4lHhuDg5e4ekmVjl0HYQ';



function fetchAPODForCurrentDate() {
    const apodUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

    fetch(apodUrl)
        .then((response) => response.json())
        .then((data) => {
            
            const apodSection = document.getElementById('apod');
            apodSection.innerHTML = `
                <h2>${data.title}</h2>
                <img src="${data.url}" alt="${data.title}">
                <p>${data.explanation}</p>
            `;
        })
        .catch((error) => console.error('Error fetching APOD:', error));
}



function fetchAPODForSpecificDate(selectedDate) {
    const apodUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${selectedDate}`;

    fetch(apodUrl)
        .then((response) => response.json())
        .then((data) => {
            
            const apodSection = document.getElementById('apod');
            apodSection.innerHTML = `
                <h2>${data.title}</h2>
                <img src="${data.url}" alt="${data.title}">
                <p>${data.explanation}</p>
            `;
        })
        .catch((error) => console.error('Error fetching APOD:', error));
}


function fetchMarsRoverPhotos() {
    const marsRoverUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${apiKey}`;

    fetch(marsRoverUrl)
        .then((response) => response.json())
        .then((data) => {
            
            const marsRoverSection = document.getElementById('mars-rover');
            marsRoverSection.innerHTML = '<h2>Mars Rover Photos</h2>';
            data.photos.forEach((photo) => {
                marsRoverSection.innerHTML += `
                    <img src="${photo.img_src}" alt="Mars Rover Photo">
                `;
            });
        })
        .catch((error) => console.error('Error fetching Mars Rover photos:', error));
}

