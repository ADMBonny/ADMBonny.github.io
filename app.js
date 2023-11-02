

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


function fetchMarsRoverPhotos(selectedDate, selectedRover, selectedCamera) {
    
    const marsRoverUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${selectedRover}/photos?earth_date=${selectedDate}&camera=${selectedCamera}&api_key=${apiKey}`;

    fetch(marsRoverUrl)
        .then((response) => response.json())
        .then((data) => {
            
            const marsRoverSection = document.getElementById('mars-rover-photos');
            marsRoverSection.innerHTML = '<h2>Mars Rover Photos</h2>';
            
            
            for (let i = 0; i < 2 && i < data.photos.length; i++) {
                const photo = data.photos[i];
                const roverPhoto = document.createElement('div');
                roverPhoto.className = 'rover-photo';
                
                roverPhoto.innerHTML = `
                    <img src="${photo.img_src}" alt="Mars Rover Photo">
                `;

                marsRoverSection.appendChild(roverPhoto);
            }
        })
        .catch((error) => console.error('Error fetching Mars Rover photos:', error));
}




function handleUserInteractions() {
    const randomButton = document.getElementById('random-button');
    const exploreMarsButton = document.getElementById('explore-mars-button');
    const previousAPODButton = document.getElementById('previous-apod-button');
    const apodForm = document.getElementById('apod-form');

    randomButton.addEventListener('click', fetchAPODForCurrentDate);

    exploreMarsButton.addEventListener('click', () => {
        const marsForm = document.getElementById('mars-form');
        marsForm.style.display = 'block';
        const marsRoverPhotosSection = document.getElementById('mars-rover-photos');
        marsRoverPhotosSection.style.display = 'none';
    });

    previousAPODButton.addEventListener('click', () => {
        const apodForm = document.getElementById('apod-form');
        apodForm.style.display = 'block';
        const marsForm = document.getElementById('mars-form');
        marsForm.style.display = 'none';
    });

    apodForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const selectedDate = document.getElementById('apod-date').value;
        fetchAPODForSpecificDate(selectedDate);
    });

    
    function handleScroll() {
        const apodSection = document.getElementById('apod');
        const marsRoverSection = document.getElementById('mars-rover-photos');
        const spaceNewsSection = document.getElementById('space-news');
    }

    
    window.addEventListener('scroll', handleScroll);
}


document.addEventListener('DOMContentLoaded', handleUserInteractions);


fetchAPODForCurrentDate();
