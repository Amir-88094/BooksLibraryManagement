import type { BookModel } from "../layouts/models/BookModel";
import type { ReviewModel } from "../layouts/models/ReviewModel";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
interface BookResponse {
    content: BookModel[];
    page: {
        totalElements: number;
        totalPages: number;
    };
}

interface ReviewResponse {
    content: ReviewModel[];
    page: {
        totalElements: number;
        totalPages: number;
    }
}
export const bookService = {
    // All the services regarding the books
    async getBooks(pageNo: number, pageSize: number): Promise<BookResponse> {
        const response = await fetch(`${BASE_URL}/api/books/pageable?pageNo=${pageNo}&pageSize=${pageSize}`);
        if (!response.ok) {
            throw new Error("Failed to fetch books");
        }
        return await response.json();
    },
    async searchBookByTitle(title: string, pageNo: number, pageSize: number): Promise<BookResponse>{
       const params = new URLSearchParams({
        title,
        pageNo: String(pageNo),
        pageSize: String(pageSize),
       });
       const response = await fetch(`${BASE_URL}/api/books/search/title?${params}`);
       if(!response.ok){
        throw new Error("Failed to search books by title");
       }
       return await response.json();
    },
    async searchBookByCategory(category: string, pageNo: number, pageSize:number): Promise<BookResponse>{
        const params = new URLSearchParams({
            category,
            pageNo: String(pageNo),
            pageSize: String(pageSize),
        })
        const response = await fetch(`${BASE_URL}/api/books/search/category?${params}`);
        if(!response.ok){
            throw new Error("Failed to search books by category");
        }
        return await response.json();
    },
    async getBookById(id:string): Promise<BookModel>{
        const response = await fetch(`${BASE_URL}/api/books/${id}`);
        if(!response.ok){
            throw new Error("Failed to fetch book by ID");
        }
        return await response.json();
    },

    async getReviewsByBookId(bookId: string, pageNo: number = 0, pageSize: number = 3): Promise<ReviewResponse> {
        const response = await fetch(`${BASE_URL}/api/reviews/book/${bookId}?pageNo=${pageNo}&pageSize=${pageSize}`);
        if (!response.ok) {
            throw new Error("Failed to fetch reviews for this book");
        }
        return await response.json();
    }
}