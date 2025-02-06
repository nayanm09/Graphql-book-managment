# Book Store App with GraphQL API

## Overview
This is a simple Book Store application built using React and GraphQL with Apollo Client. The application allows users to add, update, and delete books, utilizing a GraphQL backend for data management.

## Features
- Fetch and display books using GraphQL queries.
- Add new books to the list.
- Edit existing books.
- Delete books from the list.
- Conditional rendering: Displays "No Book Found !!!" if there are no books available.

## Technologies Used
- **React.js** - Frontend framework
- **GraphQL** - API query language
- **Apollo Client** - GraphQL state management
- **Node.js & Express** (Backend assumed for GraphQL API)
- **ShadCN UI Components** - For styling

## Installation and Setup

### Prerequisites
Make sure you have the following installed:
- Node.js (v14+ recommended)
- npm or yarn
- A running GraphQL backend API

### Steps to Run the Application
1. **Clone the Repository:**
   ```sh
   git clone <repository-url>
   cd book-store-app
   ```

2. **Install Dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Set Up Apollo Client:**
   Ensure that the Apollo Client in your project is connected to the correct GraphQL endpoint. Modify the `ApolloProvider` setup in `index.js` if necessary:
   ```js
   import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

   const client = new ApolloClient({
     uri: 'http://localhost:4000/graphql', // Update this URL if necessary
     cache: new InMemoryCache(),
   });
   ```

4. **Run the Application:**
   ```sh
   npm start
   # or
   yarn start
   ```

## GraphQL Queries & Mutations

### Get Books
```graphql
{
  books {
    id
    title
    author
  }
}
```

### Add Book
```graphql
mutation AddBook($title: String!, $author: String!) {
  addBook(title: $title, author: $author) {
    id
    title
    author
  }
}
```

### Update Book
```graphql
mutation UpdateBook($id: ID!, $title: String!, $author: String!) {
  updateBook(id: $id, title: $title, author: $author) {
    id
    title
    author
  }
}
```

### Delete Book
```graphql
mutation DeleteBook($id: ID!) {
  deleteBook(id: $id)
}
```

## File Structure
```
📁 book-store-app
│── 📂 src
│   ├── 📂 components
│   │   ├── ui
│   │   │   ├── Button.js
│   │   │   ├── Input.js
│   ├── App.js
│   ├── index.js
│   ├── App.css
│── 📄 package.json
│── 📄 README.md
```

## Possible Enhancements
- Implement authentication for secure data access.
- Add pagination for large book lists.
- Improve UI with better styling.
- Implement better error handling.

## License
This project is open-source and available for modification and redistribution under the MIT license.

