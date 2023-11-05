document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '6tUUP5PEkz9G5ui55sAZ4lHhuDg5e4ekmVjl0HYQ';

    
    const currentApodContainer = document.getElementById('current-apod-content');
    const getCurrentApodButton = document.getElementById('get-current-apod-button');
    const apodContainer = document.getElementById('apod-content');
    const apodDateInput = document.getElementById('apod-date-input');
    const getApodButton = document.getElementById('get-apod-button');
    
    const marsRoverContainer = document.getElementById('mars-rover-section');
    const roverSelect = document.getElementById('rover-select');
    const cameraSelect = document.getElementById('camera-select');
    const getImagesButton = document.getElementById('get-images-button');
    const dateInput = document.getElementById('date-input');
    const calendarIcon = document.getElementById('calendar-icon'); 

    

    getApodButton.addEventListener('click', () => {
        const selectedDate = apodDateInput.value;
        fetchAPODData(selectedDate, apodContainer);
    });

    
    const fetchAPODData = async (selectedDate, container) => {
        try {
            const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${selectedDate}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch APOD data: ${response.status}`);
            }
            const data = await response.json();
    
            container.innerHTML = `
                <h2>${data.title}</h2>
                <img src="${data.url}" alt="${data.title}">
                <p>${data.explanation}</p>
            `;
        } catch (error) {
            console.error(error);
            container.innerHTML = 'Error fetching APOD data. Please try again later.';
        }
    };

    getImagesButton.addEventListener('click', () => {
        const selectedRover = roverSelect.value;
        const selectedCamera = cameraSelect.value;
        const selectedDate = dateInput.value;

        fetchMarsRoverData(selectedRover, selectedCamera, selectedDate);
    });

    
    const fetchMarsRoverData = async (rover, camera, date) => {
        try {
            const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?camera=${camera}&earth_date=${date}&api_key=${apiKey}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch Mars Rover data: ${response.status}`);
            }
            const data = await response.json();
    
            
            const images = data.photos.slice(0, 4);
            let marsRoverHTML = '';
            images.forEach((photo) => {
                marsRoverHTML += `
                <div>
                    <img src="${photo.img_src}" alt="Mars Rover Photo">
                    <p>Date: ${photo.earth_date}</p>
                </div>
                `;
            });
    
            marsRoverContainer.innerHTML = marsRoverHTML;
        } catch (error) {
            console.error(error);
            marsRoverContainer.innerHTML = 'Error fetching Mars Rover data. Please try again later.';
        }
    };
  
    
    fetchAPODData(new Date().toISOString().split('T')[0], currentApodContainer);
});
