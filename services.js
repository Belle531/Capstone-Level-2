document.addEventListener("DOMContentLoaded", () => {
    const categoryFilter = document.getElementById("serviceCategory");
    const servicesTable = document.getElementById("servicesTable");
    const servicesTableBody = document.getElementById("servicesTableBody");
    const mealSearchInput = document.getElementById("mealSearch");
    const mealSearchButton = document.getElementById("mealSearchButton");
    const mealResultsContainer = document.getElementById("mealResultsContainer");

    const services = [
        { name: "Grand Ballroom", description: "Elegant indoor space with chandeliers and dance floor", price: "$4,000", category: "venue" },
        { name: "Outdoor Garden Setup", description: "Beautiful garden setup with floral arrangements", price: "$2,500", category: "venue" },
        { name: "Classic White Theme", description: "White linens, floral centerpieces, and ambient lighting", price: "$800", category: "decor" },
        { name: "Live Jazz Band", description: "Live music for cocktail hour and dinner", price: "$1,200", category: "entertainment" },
        { name: "Buffet Catering", description: "Includes appetizers, entrees, and desserts", price: "$3,000", category: "catering" },
        { name: "Champagne Fountain", description: "Elegant champagne display and glasses", price: "$450", category: "add-ons" }
    ];

    // Filter services table by category
    categoryFilter.addEventListener("change", () => {
        const selectedCategory = categoryFilter.value;
        const filteredServices = selectedCategory === "all" ? services :
            selectedCategory === "none" ? [] :
            services.filter(service => service.category === selectedCategory);

        servicesTableBody.innerHTML = "";

        if (filteredServices.length > 0) {
            servicesTable.classList.remove("hidden");
            filteredServices.forEach(service => {
                const row = document.createElement("tr");
                row.innerHTML = `<td>${service.name}</td><td>${service.description}</td><td>${service.price}</td>`;
                servicesTableBody.appendChild(row);
            });
        } else {
            servicesTable.classList.add("hidden");
        }
    });

    // Trigger meal + wine pairing search
    mealSearchButton.addEventListener("click", () => {
        const query = mealSearchInput.value.trim().toLowerCase();
        if (!query) return;

        fetchMealAndWineSuggestions(query);
    });

    // Fetch meal data and display pairing cards
    async function fetchMealAndWineSuggestions(query) {
        const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            const meals = data.meals;

            mealResultsContainer.innerHTML = "";

            if (!meals) {
                mealResultsContainer.innerHTML = `<p class="text-danger">No meals found for "${query}".</p>`;
                mealResultsContainer.classList.remove("hidden");
                return;
            }

            meals.slice(0, 4).forEach(meal => {
                const wine = getWinePairing(meal.strCategory);
                const card = document.createElement("div");
                card.className = "col-12 col-md-8 col-lg-6";  // responsive grid columns
                card.innerHTML = `
                    <div class="card h-100 pairing-card shadow-sm">
                        <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                        <div class="card-body">
                            <h5 class="card-title">${meal.strMeal}</h5>
                            <p class="card-text"><strong>Recommended Wine:</strong> ${wine}</p>
                        </div>
                    </div>
                `;
                mealResultsContainer.appendChild(card);
            });

            mealResultsContainer.classList.remove("hidden");
        } catch (error) {
            mealResultsContainer.innerHTML = `<p class="text-danger">Error fetching meal pairings. Please try again later.</p>`;
            mealResultsContainer.classList.remove("hidden");
            console.error("Fetch error:", error);
        }
    }

    // Wine pairing logic based on meal category
    function getWinePairing(category) {
        switch (category?.toLowerCase()) {
            case "beef": return "Cabernet Sauvignon";
            case "chicken": return "Chardonnay";
            case "dessert": return "Moscato";
            case "seafood": return "Sauvignon Blanc";
            case "pasta": return "Chianti";
            case "vegetarian": return "Pinot Grigio";
            default: return "Merlot";
        }
    }
});
