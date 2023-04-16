![license badge](/client/public/license-MIT-License-yellow.svg)

  # Google Book Saver - GraphQL

  ## Description

This is an application that allows users to create an account and save books they want to read to their account. The application was refactored to us Appolo Server and GraphQL queries/mutations in the place of the previous restful API calls. There are some inefficiencies within the application after doing the refactoring that could still improve its function. These are: When a book is saved, the user list of books should update and not allow the same book to be saved again. When a book is deleted, the saved books list component should be updated to render the removal of the deleted book. Currently the page refreshes (window.location.reload) to render these changes.

  ## Table of Contents
  
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [Questions](#questions)
  
  ## Installation
  NOTE: The heroku deployment of this application is not operating as anticipated where the windows.location reload and assign commands are used, please reload to the homepage after saving or deleting a book from the profile.   <br><br>
  Please visit: https://stormy-sierra-88140.herokuapp.com/
  <br><br>
  Or to run locally on the integrated terminal run the sequence of comamands to start the application:<br><br>
  npm i<br>
  npm run develop<br><br>

  Open insomnia and test the routes shown below.
  
  ## Usage
  
Create a profile by signing up with a username, email, and password. After signup, search for books by inputting text into the search box and pressing submit search. This searches the google books API and returns the most relevant results. Save a book to your profile by pressing save book. To see the saved books in your profile, navigate to See your Books. Here you can delete books from your profile by pressing Delete this book!
  
  ## License

  This software is covered by the MIT License. Please refer to this link for further details: 
  [MIT License](https://opensource.org/licenses/MIT)
  
  ## Contributing

 Please refer to the Questions section for github repo and questions.
  
  ## Tests

  NA
  
  ## Questions

  Github: https://github.com/jaugsbu2

  Email: joshua.augsburger08@gmail.com

