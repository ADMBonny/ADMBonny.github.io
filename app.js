
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


function handleScroll() {
    const apodSection = document.getElementById('apod');
    const marsRoverSection = document.getElementById('mars-rover-photos');
    const spaceNewsSection = document.getElementById('space-news');

    
    const scrollPosition = window.scrollY;

    
    if (scrollPosition < apodSection.offsetHeight) {
        
        fetchAPODForCurrentDate();
    } else if (scrollPosition < apodSection.offsetHeight + marsRoverSection.offsetHeight) {
       
    } else {
        
    }
}


function handleUserInteractions() {
    const randomButton = document.getElementById('random-button');
    const searchButton = document.getElementById('search-button');
    const exploreMarsButton = document.getElementById('explore-mars-button');
    const marsForm = document.getElementById('mars-form');

    randomButton.addEventListener('click', fetchAPODForCurrentDate);
    
    searchButton.addEventListener('click', () => {
        const selectedDate = document.getElementById('apod-date').value;
        fetchAPODForSpecificDate(selectedDate);
    });

    exploreMarsButton.addEventListener('click', () => {
        marsForm.style.display = 'block';
        const marsRoverPhotosSection = document.getElementById('mars-rover-photos');
        marsRoverPhotosSection.style.display = 'none';
    });
    
    marsForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const selectedDate = document.getElementById('mars-date').value;
        const selectedRover = document.getElementById('rover-selection').value;
        const selectedCamera = document.getElementById('camera-selection').value;

        fetchMarsRoverPhotos(selectedDate, selectedRover, selectedCamera);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('scroll', handleScroll);
    handleUserInteractions();

    
    fetchAPODForCurrentDate();
});
