

const apiKey = '6tUUP5PEkz9G5ui55sAZ4lHhuDg5e4ekmVjl0HYQ'; 


function fetchAPODForCurrentDate() {
    const apodUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

    fetch(apodUrl)
        .then((response) => response.json())
        .then((data) => {
            const apodImage = document.getElementById('apod-image');
            const apodInfo = document.getElementById('apod-info');

            apodImage.src = data.url;
            apodImage.alt = data.title;
            apodInfo.textContent = data.explanation;
        })
        .catch((error) => {
            console.error('Error fetching APOD data:', error);
        });
}


function handleUserInteractions() {
    const randomButton = document.getElementById('random-button');
    const exploreMarsButton = document.getElementById('explore-mars-button');
    const previousAPODButton = document.getElementById('previous-apod-button');
    const apodForm = document.getElementById('apod-form');
    const marsForm = document.getElementById('mars-form');

    randomButton.addEventListener('click', fetchAPODForCurrentDate);

    exploreMarsButton.addEventListener('click', () => {
        apodForm.style.display = 'none';
        marsForm.style.display = 'block';
    });

    previousAPODButton.addEventListener('click', () => {
        apodForm.style.display = 'block';
        marsForm.style.display = 'none';
    });

    apodForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const selectedDate = document.getElementById('apod-date').value;
        fetchAPODForSpecificDate(selectedDate);
    });

    
    const searchMarsButton = document.getElementById('search-mars-button');
    searchMarsButton.addEventListener('click', () => {
        const marsDateInput = document.getElementById('mars-date').value;
        const selectedRover = document.querySelector('input[name="rover"]:checked').value;
        const selectedCamera = document.querySelector('input[name="camera"]:checked').value;
        const marsRoverApiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${selectedRover}/photos?earth_date=${marsDateInput}&camera=${selectedCamera}&api_key=${apiKey}`;

        fetch(marsRoverApiUrl)
            .then((response) => response.json())
            .then((data) => {
                const marsPhotosSection = document.getElementById('mars-rover-photos');
                marsPhotosSection.innerHTML = '';

                data.photos.forEach((photo) => {
                    const img = document.createElement('img');
                    img.src = photo.img_src;
                    marsPhotosSection.appendChild(img);
                });
            })
            .catch((error) => {
                console.error('Error fetching Mars photos:', error);
            });
    });

    
    function handleScroll() {
        const apodSection = document.getElementById('apod');
        const marsRoverSection = document.getElementById('mars-rover-photos');
        const spaceNewsSection = document.getElementById('space-news');

        const scrollPosition = window.scrollY;

        if (scrollPosition < apodSection.offsetHeight) {
            fetchAPODForCurrentDate();
        } else if (scrollPosition < apodSection.offsetHeight + marsRoverSection.offsetHeight) {
            const moreMarsRoverButton = document.getElementById('more-mars-rover-button');
    
            moreMarsRoverButton.addEventListener('click', () => {
                const marsRoverApiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${marsRoverApiKey}`;
                
                fetch(marsRoverApiUrl)
                    .then((response) => response.json())
                    .then((data) => {
                        const marsRoverPhotosSection = document.getElementById('mars-rover-photos');
                        
                        data.photos.forEach((photo) => {
                            const img = document.createElement('img');
                            img.src = photo.img_src;
                            marsRoverPhotosSection.appendChild(img);
                        });
                    })
                    .catch((error) => {
                        console.error('Error fetching more Mars Rover photos:', error);
                    });
            });
        
        } else {
            // Add code to update Space News content if needed
        }
    }

    window.addEventListener('scroll', handleScroll);
}

document.addEventListener('DOMContentLoaded', handleUserInteractions);

fetchAPODForCurrentDate();
console.log(exploreMars);
