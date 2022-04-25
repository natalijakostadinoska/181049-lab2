import logo from '../../../../../181049-lab2/181049-lab2/Lab2/frontend/src/logo.svg';
import './App.css';
import React, {Component} from "react"
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom'
import ELibraryService from "../../../../../181049-lab2/181049-lab2/Lab2/frontend/src/repository/eLibraryRepository";
import Categories from '../Categories/categories';
import BookAdd from "../Books/BookAdd/bookAdd";
import BookEdit from "../Books/BookEdit/bookEdit";
import Header from '../Header/header';
import Books from "../Books/BookList/books";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            selectedBook: {},
            categories: [],
            authors: []

        }
    }

    render() {
        return (
            <Router>
                <Header/>
                <main>
                    <div className="container">
                        <Route path={"/categories"}
                               exact render={() => <Categories categories={this.state.categories}/>}/>
                        <Route path={"/books/add"} exact render={() =>
                            <BookAdd categories={this.state.categories}
                                     authors={this.state.authors}
                                     onAddBook={this.addBook}/>}/>
                        <Route path={"/books/edit/:id"} exact render={() =>
                            <BookEdit categories={this.state.categories}
                                      authors={this.state.authors}
                                      onEditBook={this.editBook}
                                      book={this.state.selectedBook}/>}/>
                        <Route path={["/books","/"]}
                               exact render={() =>
                            <Books books={this.state.books}
                                   onDelete={this.deleteBook}
                                   onEdit={this.getBook}
                                   onMark={this.markBook}
                            />}/>
                    </div>
                </main>
            </Router>
        )
    }

    loadBooks = () => {
        ELibraryService.fetchBooks()
            .then((data) => {
                this.setState({
                    books: data.data
                })
            });
    }
    loadCategories = () => {
        ELibraryService.fetchCategories()
            .then((data) => {
                this.setState({
                    categories: data.data
                })
            });
    }
    loadAuthors=()=>{
        ELibraryService.fetchAuthors()
            .then((data) => {
                this.setState({
                    authors: data.data
                })
            });
    }
    deleteBook = (id) => {
        ELibraryService.deleteBook(id)
            .then(() => {
                this.loadBooks();
            });
    }
    //ID AUTHOR
    addBook = (name, category, author, availableCopies) => {
        ELibraryService.addBook(name, category, author, availableCopies)
            .then(() => {
                this.loadBooks();
            });
    }

    componentDidMount() {
        this.loadCategories();
        this.loadAuthors();
        this.loadBooks();

    }

    getBook = (id) => {
        ELibraryService.getBook(id)
            .then((data) => {
                this.setState(
                    {
                        selectedBook: data.data
                    }
                )
            })
    }
    //ID AUTHOR
    editBook = (id, name, category, author, availableCopies) => {
        ELibraryService.editBook(id, name, category, author, availableCopies)
            .then(() => {
                this.loadBooks();
            })
    }
    markBook=(id)=>{
        ELibraryService.markBook(id)
            .then(() => {
                this.loadBooks();
            });
    }
}


export default App;
