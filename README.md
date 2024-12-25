# News-Article
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

## Getting Started:

#### Prerequisites:
Ensure **Node.js** & **npm** is installed on the system. 

#### Steps to run the application:
* Clone this repository and navigate to the **news-article-webapp** folder. 
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
* 
Once the user enters the Article ID, the application retrieves the corresponding article from the database, and the other fields are **automatically populated** with the article's existing information.

The user can then edit any field and submit the changes. Before updating the article:

The application validates that all fields are filled.
The updated details are saved to the database with the same Article ID, ensuring the article's identity remains unchanged.

### Page 2: Fetch / Display News Articles
Design a web page with a form to create or update news articles. The form should include the following fields for a news article:
* Article Title (text input)
* Article Summary (textarea)
* Article date (date input)
* Publisher Of Article (text input)

When the form is submitted:
* If all fields are filled, the article should be created or updated in the database.
* If any field is missing, show appropriate error messages and prevent submission.
* After successful submission, clear the form fields so that user can input next article
* Provide a navigation link to the fetch/display page.

### Page 2: Fetch / Display News Articles
Displays the total number of articles in the database at the top of the page.

Articles are displayed as cards, each showing:
* Publisher of article and Date of article
* Title of the article
* Summary of the article in a bullet-point format

Sample page design for guidance
![Display Page Design](https://github.com/chunyang-hs/news-article/blob/master/sample-display-page-design.png)

### Bonus (Optional):
You may also consider adding the following features if times permit:
* Include a refresh button to fetch the latest articles from the database.
* Add delete functionality to remove articles from the database.
* Implement pagination or infinite scrolling for fetching and displaying articles.
* Add search functionality to filter articles based on specific criteria.
* Use a state management library like Redux or MobX to manage the application's state.

## Final Notes
Feel free to adjust the requirements and scope of the assignment according to your preferences and time constraints. 
Remember to include clear instructions and any necessary information for running the application. 

Good luck with your assignment, and feel free to ask any questions if you need further assistance!
