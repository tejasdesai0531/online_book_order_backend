import express from 'express'

import { searchBooksRouter } from './search-books';
import { bookDetailsRouter } from './book-details'


const router = express.Router();

router.use(searchBooksRouter)
router.use(bookDetailsRouter)


export { router as booksRouter }

