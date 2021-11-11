import express, { Response, Request} from 'express'
import { checkSchema, query } from 'express-validator';
import axios from 'axios';
import { validateRequest } from '../../middlewares/validate-request';

const router = express.Router()

interface Book {
    id: string,
    title: string,
    authors: [string],
    publisher: string,
    publishedDate: string,
    description: string,
    pageCount: number,
    categories: [string],
    imageLinks: {
        smallThumbnail: string,
        thumbnail: string
    },
    listPrice: {
        amount: number,
        currencyCode: string
    },
    retailPrice: {
        amount: number,
        currencyCode: string
    }
}

router.get('/:id',
    async (req: Request, res: Response) => {

        const id = req.params.id

        let params = {
            key: process.env.GOOGLE_BOOKS_API_KEY
        }

        let response = (await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`, { params: params })).data

        let book: Book = {
            id: response.id,
            title: response.volumeInfo.title,
            authors: response.volumeInfo.authors,
            publisher: response.volumeInfo.publisher,
            publishedDate: response.volumeInfo.publishedDate,
            description: response.volumeInfo.description,
            pageCount: response.volumeInfo.pageCount,
            categories: response.volumeInfo.categories,
            imageLinks: response.volumeInfo.imageLinks,
            listPrice: response.saleInfo.listPrice,
            retailPrice: response.saleInfo.retailPrice
        }

        res.send(book)

})


export { router as bookDetailsRouter }