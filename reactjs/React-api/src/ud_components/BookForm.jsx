import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import './BookForm.css';
function BookForm({ HandleSubmit, title, setTitle, setAuthor, author, editMode }) {
    return (
        <>
            <form onSubmit={HandleSubmit} className="form-container">
                <div className="inputs">
                    <Input
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter Book Title"
                        value={title}
                        required
                        className="input-field"
                    />
                    <Input
                        type="text"
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="Enter Book Author"
                        value={author}
                        required
                        className="input-field"
                    />
                </div>
                <Button type="submit" className="add-button">{editMode ? 'Update' : 'Add'}</Button>
            </form>
        </>
    );
}

export default BookForm;
