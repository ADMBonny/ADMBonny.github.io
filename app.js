

const apiKey = '6tUUP5PEkz9G5ui55sAZ4lHhuDg5e4ekmVjl0HYQ';


function fetchAPODForCurrentDate() {
    const apodUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

    fetch(apodUrl)
        .then((response) => response.json())
        .then((data) => {
            
            const apodSection = document.getElementById('apod');
            const apodImage = document.getElementById('apod-image');
            const apodInfo = document.getElementById('apod-info');
            
            apodImage.src = data.url;
            apodImage.alt = data.title;

            apodInfo.innerHTML = `
                <h3>${data.title}</h3>
                <p>Date: ${data.date}</p>
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
            const apodImage = document.getElementById('apod-image');
            const apodInfo = document.getElementById('apod-info');
            
            apodImage.src = data.url;
            apodImage.alt = data.title;

            apodInfo.innerHTML = `
                <h3>${data.title}</h3>
                <p>Date: ${data.date}</p>
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
                    <div class="rover-photo">
                        <img src="${photo.img_src}" alt="Mars Rover Photo">
                        <p>Camera Name: ${photo.camera.full_name}</p>
                        <p>Earth Date: ${photo.earth_date}</p>
                    </div>
                `;
            });
        })
        .catch((error) => console.error('Error fetching Mars Rover photos:', error));
}


function handleScroll() {
    const apodSection = document.getElementById('apod');
    const marsRoverSection = document.getElementById('mars-rover');
    const spaceNewsSection = document.getElementById('space-news');

    
    const scrollPosition = window.scrollY;

    
    if (scrollPosition < apodSection.offsetHeight) {
        
        fetchAPODForCurrentDate();
    } else if (scrollPosition < apodSection.offsetHeight + marsRoverSection.offsetHeight) {
        
        fetchMarsRoverPhotos();
    } else {
       
    }
}

function handleUserInteractions() {
    const randomButton = document.getElementById('random-button');
    const searchButton = document.getElementById('search-button');

    randomButton.addEventListener('click', fetchAPODForCurrentDate);

    searchButton.addEventListener('click', () => {
        const selectedDate = document.getElementById('apod-date').value;
        fetchAPODForSpecificDate(selectedDate);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('scroll', handleScroll);
    handleUserInteractions();

    
    fetchAPODForCurrentDate();
    fetchMarsRoverPhotos();
});
