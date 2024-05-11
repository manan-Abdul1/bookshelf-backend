require('dotenv').config();
const mongoose = require('mongoose');
const UserBook = require('./models/userBookSchema'); 
const Book = require('./models/bookSchema'); 

const mockBooks = [
    {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        publicationHouse: "J. B. Lippincott & Co.",
        publicationDate: "July 11, 1960",
        genre: "663e903cf9df8735b826153a",
        publicationYear: 1960,
        status:'Plan to Read',
        imageUrl:
            "https://c4.wallpaperflare.com/wallpaper/511/751/733/movie-to-kill-a-mockingbird-wallpaper-preview.jpg",
    },
    {
        title: "1984",
        author: "George Orwell",
        publicationHouse: "Secker & Warburg",
        publicationDate: "June 8, 1949",
        genre: "663e903cf9df8735b826153a",
        publicationYear: 1949,
        status:'Plan to Read',
        imageUrl: "https://wallpaperaccess.com/full/204497.jpg",
    },
    {
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        publicationHouse: "Little, Brown and Company",
        publicationDate: "July 16, 1951",
        genre: "663e903cf9df8735b826153a",
        status: "Reading",
        publicationYear: 1951,
        imageUrl:
            "https://c1.wallpaperflare.com/preview/538/645/254/book-focus-jerome-david-salinger-literature.jpg",
    },
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        publicationHouse: "George Allen & Unwin",
        publicationDate: "September 21, 1937",
        genre: "663e903cf9df8735b826153c",
        publicationYear: 1937,
        status:'Reading',
        imageUrl:
            "https://c4.wallpaperflare.com/wallpaper/368/146/434/the-lord-of-the-rings-rings-map-artwork-wallpaper-preview.jpg",
    },
    {
        title: "Harry Potter and the Philosopher's Stone",
        author: "J.K. Rowling",
        publicationHouse: "Bloomsbury",
        publicationDate: "June 26, 1997",
        genre: "663e903cf9df8735b826153c",
        publicationYear: 1997,
        status:'Reading',
        imageUrl: "https://wallpaper.dog/large/978497.jpg",
    },
    {
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        publicationHouse: "George Allen & Unwin",
        publicationDate: "July 29, 1954",
        genre: "663e903cf9df8735b826153d",
        publicationYear: 1954,
        status:'Reading',
        imageUrl:
            "https://c4.wallpaperflare.com/wallpaper/215/336/873/the-lord-of-the-rings-movies-wallpaper-preview.jpg",
    },
];
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('Error connecting to MongoDB:', error);
});

db.once('open', async () => {
    console.log('Connected to MongoDB');

    // Function to seed initial books
    const seedInitialBooks = async () => {
        try {
            const insertedBooks = await Book.insertMany(mockBooks);
            console.log('Initial books seeded successfully:', insertedBooks);
            return insertedBooks; // Return the inserted books
        } catch (error) {
            console.error('Error seeding initial books:', error);
        }
    };

    // Function to generate random userBooks for each book
// Function to generate random userBooks for each book
const generateUserBooks = async (userId, books) => {
    const statuses = ['Reading', 'Completed', 'PlanToRead'];

    // Generate a random book index
    const randomBookIndex = Math.floor(Math.random() * books.length);

    // Get a random book
    const randomBook = books[randomBookIndex];

    // Generate multiple userBooks for the selected random book
    for (let i = 0; i < 8; i++) {
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

        try {
            // Create the userBook with a random status
            const userBook = new UserBook({
                userId: userId,
                bookId: randomBook._id,
                status: randomStatus,
            });

            await userBook.save();
            console.log('UserBook created:', userBook);
        } catch (error) {
            console.error('Error creating userBook:', error);
        }
    }
};


    // Call the function to seed initial books
    const insertedBooks = await seedInitialBooks();

    // Call the function to generate userBooks for the specified userId and inserted books
    const userId = '663d35c57112c9870831088a';
    await generateUserBooks(userId, insertedBooks);

    // Disconnect from MongoDB after all operations are done
    mongoose.disconnect();
});