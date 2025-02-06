import { Button } from '@/components/ui/button';

function BookList({dataFlag,HandleDelete,HandleEdit,data}) {
    return (
        <>
            <ul className="allBooks">
                {dataFlag ? (
                    data.books.map((book, index) => (
                    <li key={index} className="singleBook">
                        <span className="bookDetail">
                        {book.title} : written by {book.author}
                        </span>
                        <Button onClick={() => HandleEdit(book)}>Edit</Button>
                        <Button onClick={() => HandleDelete(book.id)}>Delete</Button>
                    </li>
                    )))
                    :
                    (<li>No Book Found !!!</li>)
                }
            </ul>
        </>
    )
}

export default BookList