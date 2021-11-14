import express, { Response, Request} from 'express'
import { query } from 'express-validator';
import axios from 'axios';
import { validateRequest } from '../../middlewares/validate-request';

const router = express.Router()

router.get(
    '/search',
    [
        query('searchBy')
            .isIn(['all', 'category', 'title', 'author', 'publisher'])
            .withMessage('invalid searchBy text'),
        query('searchText')
            .isLength({min: 1})
            .withMessage('searchText is required'),
        query('page')
            .default(0)
            .isInt({min: 0})
    ],
    validateRequest,
    async (req: Request, res: Response) => {

        const { searchBy, searchText, page } = req.query

        const startIndex = Number(page) * 10

        let q = ""
        if (searchBy === 'all') {
            q = searchText as string
        } else if (searchBy === 'category') {
            q = `subject:${searchText}`
        } else if (searchBy === 'title') {
            q = `intitle:${searchText}`
        } else if (searchBy === 'author') {
            q = `inauthor:${searchText}`
        } else if (searchBy === 'publisher') {
            q = `inpublisher:${searchText}`
        }

        let params = {
            q: q,
            filter: 'paid-ebooks',
            startIndex: startIndex,
            key: process.env.GOOGLE_BOOKS_API_KEY
        }

        let response = (await axios.get('https://www.googleapis.com/books/v1/volumes', { params: params })).data

        let books = (response.items || []).map((item: any) => {

            return {
                id: item.id,
                title: item.volumeInfo.title,
                authors: item.volumeInfo.authors,
                publisher: item.volumeInfo.publisher,
                publishedDate: item.volumeInfo.publishedDate,
                description: item.volumeInfo.description,
                pageCount: item.volumeInfo.pageCount,
                categories: item.volumeInfo.categories,
                imageLinks: item.volumeInfo.imageLinks,
                listPrice: item.saleInfo.listPrice,
                retailPrice: item.saleInfo.retailPrice
            }

        })

        res.send({ 
            totalItems: response.totalItems,
            books: books
        })

})


export { router as searchBooksRouter }