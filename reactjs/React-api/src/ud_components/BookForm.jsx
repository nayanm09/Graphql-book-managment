import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";

function BookForm({HandleSubmit,title,setTitle,setAuthor,author,editMode}) {
    return (
        <>
            <form onSubmit={HandleSubmit}>
                <div className='input-container'>
                <div className='inputs'>
                    <Input
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter Book Title"
                    value={title}
                    required
                    />
                    <Input
                    type="text"
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Enter Book Author"
                    value={author}
                    required
                    />
                </div>
                <Button type="submit" className="add-button">{editMode ? 'Update' : 'Add'}</Button>
                </div>
            </form>
        </>
    )
}

export default BookForm