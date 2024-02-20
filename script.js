document.addEventListener("DOMContentLoaded", function() {
    // Function to extract the desired name from the URL
    function extractNameFromURL(path) {

        if (typeof path !== 'string') {
            console.error('Invalid URL or file path:', path);
            return '';
        }

        // Removes file path and extract filename
        let fileName = path.split('/').pop();
        // Removes file extension
        fileName = fileName.replace(/\.[^/.]+$/, "");
        // Removes "policy" (case-insensitive)
        fileName = fileName.replace(/policy/i, "");
        // Trims any leading/trailing spaces
        fileName = fileName.trim();
        // Capitalizes first letter
        fileName = fileName.charAt(0).toUpperCase() + fileName.slice(1);

        return fileName;
    }

    // Function to dynamically update the navigation menu of index.html
    function updateNavigationMenu() {
        // Make an HTTP GET request to fetch the JSON file
        fetch('policies.json')
        .then(response => {
            if (!response.ok) {
                throw new Error ('Failed to fetch JSON file \'policies.json\'.');
            }
            // if response is successful proceed parsing JSON data
            return response.json();
        })
        .then(data => {
            // Extracts file names from URLs
            let fileNames = data.map(path => extractNameFromURL(path));

            // Inserts policy links into the navigation menu
            const nav = document.querySelector('nav ul');
            const lastElement = nav.lastElementChild;

            for (let i = 0; i < fileNames.length; i++) {
                const policyName = fileNames[i];
                const relativePath = data[i];

                // Create list item with corresponding name and URL
                const listItem = document.createElement('li');
                listItem.innerHTML = `<a href="${relativePath}">${policyName}</a>`;
                lastElement.insertAdjacentElement('afterend', listItem);
            }
        })
        .catch(error => {
            console.error('Error fetching \'policies.json\':', error);
        });
    }

// Call the function to update the navigation menu
updateNavigationMenu();
});
