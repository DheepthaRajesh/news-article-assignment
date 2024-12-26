# ArticleHub
A news article web application. 

Welcome to your one-stop platform for creating, updating, and viewing articles effortlessly.
Easily add new articles with a title, summary, date, and publisher, each uniquely identified by an auto-generated article ID for seamless updates.
Browse an elegantly designed and well-organized list of all your articles on the next page.

## Features
This web application is intuitive and user friendly & fulfills all the requirements of the assignment:

* Built with React and TypeScript.
* Styled using Material-UI for an elegant and user-friendly interface.
* Implements navigation with React Router.
* Uses Axios to make HTTP requests to a mock API server.
* Backend uses a mock API server powered by a JSON Server, with REST API calls (GET, POST, PUT).
* Includes robust error handling and validation for form submissions.
* Adheres to best practices, ensuring clean and maintainable code.

### Workflow Demonstration:

To provide a clear understanding of the frontend workflow, a detailed screen recording has been included in this repository. This recording showcases the entire functionality and navigation of the application, highlighting how users can seamlessly interact with various features, including navigating between pages, and creating, updating, and viewing articles.

## Getting Started:

#### Prerequisites:
Ensure **Node.js** & **npm** is installed on the system. 

#### Steps to run the application:
* Clone this repository and navigate to the **news-article-webapp** folder.
* Run **rm -rf node_modules package-lock.json** to clean up dependencies. 
* Install dependencies using **npm install**. 
* Start the frontend using **npm start** and the frontend will run on http://localhost:3000. 
* Run the mock API backend using **npm run mock-api** and the backend server will run on http://localhost:5001 (The port can be reconfigured under scripts in package.json)


## Application Logic:

### Page 1: Create or Update News articles
On the home page, the application displays the title of the app and a brief description. Below this, two buttons allow the user to navigate to the desired functionality:

**Create Article**: Opens a form to create a new article.

**Update Article**: Opens a form to update an existing article.
Depending on which button the user selects, the corresponding form is dynamically rendered.

**Create Article Logic:**

When the user selects Create Article, the following fields appear in the form:

Article ID: A unique, auto-generated identifier for each article (non-editable).
Article Title: Editable text input.
Article Summary: Editable textarea.
Article Date: Editable date input.
Publisher: Editable text input.
The application validates the form:

Ensures all fields are filled; otherwise, an error message is displayed.
Checks if an article with the same Title, Date, and Publisher already exists in the database. If a matching article is found, the app displays an alert showing the existing article's ID and suggests switching to Update Article.
If no matching article exists, the new article is saved in the database with a unique Article ID, and the form is cleared for the next entry.

**Update Article Logic:**

When the user selects Update Article, the following fields appear in the form:

Article ID: Input field where the user provides the unique identifier of the article they want to edit.

Other Fields:
* Article Title
* Article Summary
* Article Date
* Publisher
  
Once the user enters the Article ID, the application retrieves the corresponding article from the database, and the other fields are **automatically populated** with the article's existing information.

The user can then edit any field and submit the changes. Before updating the article:

The application validates that all fields are filled.
The updated details are saved to the database with the same Article ID, ensuring the article's identity remains unchanged.



### Page 2: Fetch / Display News Articles
Displays the total number of articles in the database at the top of the page.

Articles are displayed as cards, each showing:
* Publisher of article and Date of article
* Title of the article
* Summary of the article in a bullet-point format

#### Go To Update Article button:
The application includes a "Go To Update Article" button located at the top-left corner of the page. This button provides easy navigation back to the first page of the application, where users can update articles. Upon clicking this button, users are directed to the page with the Update Article button, enabling them to seamlessly access the article update form and make modifications as needed.

