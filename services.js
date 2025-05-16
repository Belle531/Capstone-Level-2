const services = [
    {
        name: "Venue Rental",
        description: "Exclusive use of our venue for your event.",
        category: "venue",
        price: 5000,
    },
    {
        name: "Basic Decor Package",
        description: "Includes standard table settings, linens, and centerpieces.",
        category: "decor",
        price: 1000,
    },
    {
        name: "Premium Sound System",
        description: "High-quality audio equipment for your event.",
        category: "entertainment",
        price: 800,
    },
    {
        name: "Buffet Service",
        description: "Delicious buffet-style meal for your guests.",
        category: "catering",
        price: 40, // Price per person
    },
    {
        name: "Open Bar",
        description: "Unlimited drinks for your guests.",
        category: "catering",
        price: 30, // Price per person
    },
    {
        name: "Photography Services",
        description: "Professional photographers to capture your event.",
        category: "add-ons",
        price: 1500,
    },
    {
        name: "Videography Services",
        description: "Professional videographers to record your event.",
        category: "add-ons",
        price: 1800,
    },
    {
        name: "Custom Lighting",
        description: "Tailored lighting to match your event's theme.",
        category: "decor",
        price: 1200,
    },
    {
        name: "Live Band",
        description: "Live musical performance for your event.",
        category: "entertainment",
        price: 2500,
    },
    {
        name: "Plated Dinner",
        description: "Elegant, served dinner for your guests.",
        category: "catering",
        price: 60, // Price per person
    },
    {
        name: "Venue Setup",
        description: "Includes setting up tables, chairs, and stage.",
        category: "venue",
        price: 1200
    },
    {
        name: "Floral Arrangements",
        description: "Beautiful floral arrangements for tables and venue.",
        category: "decor",
        price: 800
    },
    {
        name: "DJ Services",
        description: "Professional DJ for music and emcee duties.",
        category: "entertainment",
        price: 1000
    },
    {
        name: "Wedding Cake",
        description: "Custom-designed wedding cake.",
        category: "catering",
        price: 500
    },
    {
        name: "Transportation Services",
        description: "Shuttle service for guests.",
        category: "add-ons",
        price: 700
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const categorySelect = document.getElementById("serviceCategory");
    const servicesTable = document.getElementById("servicesTable");
    const servicesTableBody = document.getElementById("servicesTableBody");

    function displayServices(filteredServices) {
        servicesTableBody.innerHTML = "";
        if (filteredServices.length === 0) {
            servicesTable.classList.add("hidden");
            return;
        }
        servicesTable.classList.remove("hidden");

        filteredServices.forEach((service) => {
            const row = document.createElement("tr");
            row.innerHTML = `
          <td>${service.name}</td>
          <td>${service.description}</td>
          <td>$${service.price}</td>
        `;
            servicesTableBody.appendChild(row);
        });
    }

    categorySelect.addEventListener("change", (event) => {
        const selectedCategory = event.target.value;
        if (selectedCategory === "none") {
            servicesTable.classList.add("hidden");
            servicesTableBody.innerHTML = ""; // Clear table content when "None" is selected
        }
        else if (selectedCategory === "all") {
            displayServices(services);
        } else {
            const filteredServices = services.filter(
                (service) => service.category === selectedCategory
            );
            displayServices(filteredServices);
        }
    });
});

// Meal Pairing functionality using APIs
document.addEventListener("DOMContentLoaded", () => {
    const mealSearchInput = document.getElementById("mealSearch");
    const mealSearchButton = document.getElementById("mealSearchButton");
    const mealResultsContainer = document.getElementById("mealResultsContainer");

    // Function to fetch wine pairing suggestions
    const fetchWinePairing = async (foodName) => {
        try {
            const wineApiUrl = `https://openfoodfacts.org/api/v0/food/?search=${foodName}&fields=name, সহযোগিতাকারী_বাইন`; //Bengali for wine
            const wineResponse = await fetch(wineApiUrl);
            const wineData = await wineResponse.json();

            if (wineData.products && wineData.products.length > 0 && wineData.products[0].হযোগিতাকারী_বাইন) {
                return wineData.products[0].হযোগিতাকারী_বাইন.split(',').map(wine => ({
                    name: wine.trim(),
                    type: "Wine"
                }));
            }
            return [];
        } catch (error) {
            console.error("Error fetching wine pairings:", error);
            return [];
        }
    };

    // Function to fetch meal suggestions and their pairings
    const fetchMealAndPairings = async (searchTerm) => {
        mealResultsContainer.innerHTML = `<p class="text-muted text-center">Loading suggestions...</p>`;
        mealResultsContainer.classList.remove("hidden");

        try {
            const mealApiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;
            const mealResponse = await fetch(mealApiUrl);
            const mealData = await mealResponse.json();

            if (mealData.meals) {
                mealResultsContainer.innerHTML = "";
                for (const meal of mealData.meals) {
                    const winePairings = await fetchWinePairing(meal.strMeal);

                    const card = document.createElement("div");
                    card.className = "col";
                    card.innerHTML = `
                        <div class="card h-100">
                            <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                            <div class="card-body">
                                <h5 class="card-title meal-card-title">${meal.strMeal}</h5>
                                <p class="card-text meal-card-details">Category: ${meal.strCategory}</p>
                                <p class="card-text meal-card-details">Cuisine: ${meal.strArea}</p>
                                <h6 class="mt-2 poppins-semibold">Pairing Suggestions:</h6>
                                ${winePairings.length > 0
                                    ? winePairings.map(pair => `<p class="card-text meal-card-details">- ${pair.name} (${pair.type})</p>`).join('')
                                    : '<p class="card-text meal-card-details">No specific wine pairings found.</p>'
                                }
                            </div>
                        </div>
                    `;
                    mealResultsContainer.appendChild(card);
                }
            } else {
                mealResultsContainer.innerHTML = `<p class="text-muted text-center">No meals found for "${searchTerm}". Please try another dish.</p>`;
            }
        } catch (error) {
            console.error("Error fetching meal data:", error);
            mealResultsContainer.innerHTML = `<p class="text-muted text-center">An error occurred while fetching data. Please try again later.</p>`;
        }
    };

    mealSearchButton.addEventListener("click", () => {
        const searchTerm = mealSearchInput.value.trim();
        fetchMealAndPairings(searchTerm);
    });
});
