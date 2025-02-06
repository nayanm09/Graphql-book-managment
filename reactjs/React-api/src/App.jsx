import { useEffect, useState } from 'react';
import './App.css';
import { useQuery, gql, useMutation } from '@apollo/client';
import BookForm from './ud_components/BookForm';
import BookList from './ud_components/BookList';

// GraphQL Query
const GET_BOOKS = gql`
  {
    books {
      id
      title
      author
    }
  }
`;

// Add book mutation
const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!) {
    addBook(title: $title, author: $author) {
      id
      title
      author
    }
  }
`;

// Update book mutation
const UPDATE_BOOK = gql`
  mutation UpdateBook($id: ID!, $title: String!, $author: String!) {
    updateBook(id: $id, title: $title, author: $author) {
      id
      title
      author
    }
  }
`;

// Delete Book mutation
const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!){
    deleteBook(id: $id)
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_BOOKS);

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }], // Refresh book list after adding
  });

  const [updateBook] = useMutation(UPDATE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }], // Refresh book list after updating
  });

  const [deleteBook] = useMutation(DELETE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });

  // State variables
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [dataFlag, setDataFlag] = useState(null);

  useEffect(() => {
    // If no books are found, set dataFlag to false
    if (data && data.books && data.books.length === 0) {
      setDataFlag(false);
    } else {
      setDataFlag(true);
    }
  }, [data]);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  

  const HandleSubmit = async (e) => {
    e.preventDefault();

    // Update existing book
    if (editId) {
      await updateBook({
        variables: { id: editId, title, author },
      });

      setEditMode(false);
      setEditId(null);
      setTitle('');
      setAuthor('');
      return;
    }
    
    if (title !== '' && author !== '') {
      await addBook({ variables: { title, author } });
      setTitle('');
      setAuthor('');
    }
  };

  const HandleEdit = (book) => {
    setEditId(book.id);  // Set the ID for the book to edit
    setEditMode(true);    // Enable edit mode
    setTitle(book.title); // Pre-fill title
    setAuthor(book.author); // Pre-fill author
  };

  const HandleDelete = async (id) => {
    await deleteBook({variables: {id}})
  }

  return (
    <div className="App">
      <div className="container">
        <h2>Book-Store App with Graphql-API</h2>
        <BookForm HandleSubmit={HandleSubmit} setTitle={setTitle}
          setAuthor={setAuthor} title={title} author={author} editMode={editMode}>
        </BookForm>
        
        <BookList HandleEdit={HandleEdit} HandleDelete={HandleDelete} dataFlag={dataFlag} data={data}></BookList>
        
      </div>
    </div>
  );
}

export default App;
