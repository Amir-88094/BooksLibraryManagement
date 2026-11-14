import { useCallback, useEffect, useState } from "react";
import type { BookModel } from "../models/BookModel";
import { bookService } from "../../services/bookService";
import { SearchBook } from "./components/SearchBook";
import { SpinnerLoading } from "../../components/SpinnerLoading";
import { Pagination } from "../../components/Pagination";

export const SearchBooksPage = () => {
  const BOOKS_PER_PAGE = 5;
  const CATEGORIES = [
    {label: "All", value: "All"},
    {label: "Front End", value: "FE"},
    {label: "Back End", value: "BE"},
    {label: "Data", value: "Data"},
    {label: "DevOps", value: "DevOps"},
  ] as const;
  const [books, setBooks] = useState<BookModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [httpError, setHttpError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const[totalBooks, setTotalBooks] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
// search by title
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // search by category
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
   const fetchBooks = async () => {
    try {
      const pageNo = currentPage -1;
     let data;
     if(searchTerm){
      data = await bookService.searchBookByTitle(searchTerm, pageNo, BOOKS_PER_PAGE);
     }else if(selectedCategory != "All"){
      data = await bookService.searchBookByCategory(selectedCategory, pageNo, BOOKS_PER_PAGE);
     }else{
      data = await bookService.getBooks(pageNo, BOOKS_PER_PAGE);
     }
     setBooks(data.content);
     setTotalBooks(data.page.totalElements);
     setTotalPages(data.page.totalPages);
     window.scrollTo(0, 0);
    } catch (error) {
      console.error("Error fetching books:", error);
      setIsLoading(false);
      setHttpError((error as Error).message);
    }finally {
      setIsLoading(false);
    }
   }
   fetchBooks();
  }, [currentPage, searchTerm,selectedCategory]);

  const handleSearch = useCallback(() => {
    setCurrentPage(1);
    setSelectedCategory("All");
    setSearchTerm(searchInput);
  }, [searchInput])

  const handleInputKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter"){
      handleSearch();
    }
       
  },[handleSearch]);

  const handleCategorySelect = useCallback((value: string) => {
    setCurrentPage(1);
    setSelectedCategory(value);
    setSearchTerm("");
    setSearchInput("");
  }, [setCurrentPage])

  if(isLoading){
   return <SpinnerLoading />;
  }
  if(httpError){
    return <div> {httpError}</div>
  }
  const indexOfFirstBook = (currentPage - 1) * BOOKS_PER_PAGE;
  const firstItem = totalBooks === 0 ? 0 : indexOfFirstBook + 1;
  const lastItem = Math.min(currentPage * BOOKS_PER_PAGE, totalBooks);
  return (
    <>
      <div className="container">
        <div>
          <div className="row mt-5">
            <div className="col-6">
              <div className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-labelledby="Search"
                  value = {searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                />
                <button onClick={handleSearch} className="btn btn-outline-success">Search</button>
              </div>
            </div>

            <div className="col-4">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                {selectedCategory}
                </button>

                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
               {CATEGORIES.map((cat) => {
                 return <li key = {cat.value} onClick = {() => handleCategorySelect(cat.value)}>
                    <a className="dropdown-item" href="#">
                      {cat.label}
                    </a>
                  </li>
               })}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <h5>Number of results: ({totalBooks})</h5>
          </div>
          <p>{firstItem} to {lastItem} of {totalBooks} items:</p>

          {books.length > 0 ? (
            books.map((book) => <SearchBook key={book.id} book={book} />)
          ) : (
            <p role="status">No books found.</p>
          )}
          {totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages = {totalPages} paginate = {setCurrentPage} />
          )}
        </div>
      </div>
    </>
  );
};
