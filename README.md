# Dynamic Navigation Elements Generator

This project is a demonstration of a serverless approach to dynamically generating navigation elements for policy pages on a website. It is designed to identify HTML policy files within the directory structure, extract their names and relative paths, and then display them as navigation elements on the index page.

## Note on Mock Files

Please note that the CSS, HTML, and TXT files included in this repository are mock files and may contain errors or be of poor quality. They are provided solely for illustrative purposes and are complementary to the JavaScript, JSON, and PowerShell scripts that power the functionality of this project.

## Usage

To use this project, simply clone the repository and open the `index.html` file in your preferred web browser. The index page will dynamically generate navigation elements based on the policy pages found within the directory structure.

## How It Works

1. The PowerShell script (`generatePolicyJSON.ps1`) scans the directory structure for HTML files containing 'policy' (case insensitive) in their filename.
2. It tracks the relative directory of each matching file and saves each one inside an array in the JSON file (`policies.json`).
3. An HTTP GET request is made in the JavaScript file (`script.js`) to fetch the JSON file.
4. The JavaScript extracts the name of each page from the relative links, removes 'policy' from the name, and merges it with the relative path.
5. The resulting navigation elements are then dynamically added to the navbar of the index page.

## About

This project was originally developed as a serverless solution for dynamically creating navigation elements for policy pages within a website's structure. It aims to showcase an alternative approach to solving this problem without relying on backend computing or a traditional server-based architecture.

## Future Development

This project can be further elaborated to scale seamlessly across larger websites or applications. Its serverless design eliminates the need for backend computing, making it efficient and cost-effective to implement and maintain.
