import { Request, Response } from 'express';
import { z } from 'zod';
import { BookService } from '../services/book.service';
import { CreateBookDTO } from '../dtos/book.dto';
import { Book } from '../types/book.types';

let bookService: BookService = new BookService();


// export type Book = {
//     id: string;
//     title: string;
//     date?: string; // optional
// }

export class BookController{
    createBooks = (req: Request, res: Response) => {
        try{
            const validation = CreateBookDTO.safeParse(req.body);
            if(!validation.success){
                return res.status(400).json({errors: validation.error});
            }
            const {id, title} = validation.data // same as req.body not validated
            const newBook: Book = bookService.createBook({ id, title })
            return res.status(200).json(newBook);
        } catch(error: Error | any) {
            return res.status(400).json({ message: error.message });
        }
        // const {id, title} = req.body; // destructure
        // // const id = req.body.id;
        // if(!id){
        //     return res.status(400).json({message: "Book ID is required"});
        // }
        // if(!title){
        //     return res.status(400).json({message: "Book Title is required"});
        // }
        // const exist = books.find(book => book.id === id);
        // if(exist){
        //     return res.status(400).json({message: "Book with this ID already exists"});
        // }
        // const newBook: Book = {id, title};
        // // same as {id: id, title: title} // vairable and key name same
        // books.push(newBook);
    }

    getBooks = (req: Request, res: Response) => {
        let response = bookService.getAllBooks();
        res.status(200).json(response);
    }

    getOneBook = (req: Request, res: Response) => {
        
    }
}