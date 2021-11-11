import mongoose from 'mongoose';

import { app } from './app';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  try {
    await mongoose.connect('mongodb+srv://desaitejas:online-book-order@online-book-order.717os.mongodb.net/online-book-order?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  const PORT = process.env.PORT || 3000

  app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
  });
};

start();
