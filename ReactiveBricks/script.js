document.addEventListener("DOMContentLoaded", function() {
    // Function to check if a string contains a substring (case-insensitive)
    function containsSubstring(str, substr) {
        return str.toLowerCase().includes(substr.toLowerCase());
    }
    
    // Function to extract the desired name from the URL
    function extractNameFromURL(url) {

        if (typeof url !== 'string') {
            console.error('Invalid URL:', url);
            return '';
        }

        // Removes file path and extract filename
        let fileName = url.split('/').pop();
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
        const directoryPath = './pages/Policies';

        // Reads the contents of the directory
        fetch(directoryPath)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(data, 'text/html');
            const links = Array.from(htmlDoc.querySelectorAll('a[href$=".html"]'));

            // Extracts file names from URLs
            let fileNames = links.map(link => link.getAttribute('href')).filter(href => containsSubstring(href, 'Policy'));

            fileNames = fileNames.map(url => extractNameFromURL(url));

            // Extracts relative URL
            const urls = links.map(link => link.getAttribute('href')).filter(href => containsSubstring(href, 'Policy'));

            // Inserts policy links into the navigation menu
            const nav = document.querySelector('nav ul');
            const productsLink = nav.lastElementChild;

            for (let i = 0; i < fileNames.length; i++) {
                const name = fileNames[i];
                const url = urls[i];

                // Create list item with corresponding name and URL
                const listItem = document.createElement('li');
                listItem.innerHTML = `<a href="${url}">${name}</a>`;
                nav.insertBefore(listItem, productsLink);
            }
        })
        .catch(error => {
            console.error('Error reading directory:', error);
        });
    }


// Call the function to update the navigation menu
updateNavigationMenu();
});
