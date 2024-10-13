document.addEventListener('DOMContentLoaded', function() {
    fetchPlanetsData();
});

function fetchPlanetsData() {
    const apiKey = 'ZbmyHLwqTAgej82KaZYZCsM2I2FXd1VoPFLVQIm3'; // API anahtarını buraya yazın
    fetch(`https://api.le-systeme-solaire.net/rest/bodies/?apiKey=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        const planets = data.bodies.filter(body => body.isPlanet);
        displayPlanets(planets);
    })
    .catch(error => {
        console.log('Error fetching data:', error);
    });
}

function displayPlanets(planets) {
    const planetsSection = document.getElementById('planets-section');

    planets.forEach(planet => {
        const planetCard = document.createElement('div');
        planetCard.classList.add('planet-card');

        const planetImage = document.createElement('img');
        planetImage.src = getPlanetImageUrl(planet.englishName);
        planetImage.alt = planet.englishName;
        planetImage.classList.add('planet-image');

        const cardContent = document.createElement('div');
        cardContent.classList.add('planet-card-content');

        const name = document.createElement('h3');
        name.textContent = planet.englishName;

        const detailsList = document.createElement('ul');
        detailsList.innerHTML = `
            <li><strong>Diameter:</strong> ${planet.meanRadius * 2} km</li>
            <li><strong>Mass:</strong> ${planet.mass.massValue} ${planet.mass.massExponent} kg</li>
            <li><strong>Gravity:</strong> ${planet.gravity} m/s²</li>
            <li><strong>Orbital Period:</strong> ${planet.sideralOrbit} days</li>
            <li><strong>Rotation Period:</strong> ${planet.sideralRotation} hours</li>
            <li><strong>Distance from Sun:</strong> ${planet.semimajorAxis ? planet.semimajorAxis + ' AU' : 'Unknown'}</li>
            <li><strong>Perihelion:</strong> ${planet.perihelion ? planet.perihelion + ' AU' : 'Unknown'}</li>
            <li><strong>Aphelion:</strong> ${planet.aphelion ? planet.aphelion + ' AU' : 'Unknown'}</li>
            <li><strong>Average Temperature:</strong> ${planet.avgTemperature ? planet.avgTemperature + ' °C' : 'Unknown'}</li>
            <li><strong>Number of Moons:</strong> ${planet.moons ? planet.moons.length : 'Unknown'}</li>
            <li><strong>Discoverer:</strong> ${planet.discoverer ? planet.discoverer : 'Unknown'}</li>
            <li><strong>Discovery Date:</strong> ${planet.discoveryDate ? planet.discoveryDate : 'Unknown'}</li>
        `;

        cardContent.appendChild(name);
        cardContent.appendChild(detailsList);

        planetCard.appendChild(planetImage);
        planetCard.appendChild(cardContent);

        planetsSection.appendChild(planetCard);
    });
}

function getPlanetImageUrl(planetName) {
    const planetImages = {
        'Mercury': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Mercury_in_color_-_Prockter07-edit1.jpg/600px-Mercury_in_color_-_Prockter07-edit1.jpg',
        'Venus': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Venus-real_color.jpg/600px-Venus-real_color.jpg',
        'Earth': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/600px-The_Earth_seen_from_Apollo_17.jpg',
        'Mars': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/600px-OSIRIS_Mars_true_color.jpg',
        'Jupiter': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg/600px-Jupiter_and_its_shrunken_Great_Red_Spot.jpg',
        'Saturn': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_during_Equinox.jpg/600px-Saturn_during_Equinox.jpg',
        'Uranus': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Uranus2.jpg/600px-Uranus2.jpg',
        'Neptune': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg/600px-Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg'
    };

    return planetImages[planetName] || 'https://via.placeholder.com/300x200.png?text=Planet+Image+Not+Available';
}