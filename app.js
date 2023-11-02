
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



