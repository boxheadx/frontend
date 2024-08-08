import React, { useState } from 'react';
import { TextField, Button, Typography, Box, MenuItem, Chip } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { postToAPI } from '../utils/API';
import bg from '../assets/book.png';

const commonGenres = [
  'Fiction', 'Non-fiction', 'Science Fiction', 'Fantasy', 'Biography', 'History', 'Mystery', 'Romance'
];

const languages = [
  'English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Russian', 'Hindi'
];

const PostBook = () => {
  const [bookDetails, setBookDetails] = useState({
    title: '',
    description: '',
    language: '',
    publicationDate: null,
    isbn: '',
    genre: [],
    bookCover: null,
    customGenre: ''
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookDetails({ ...bookDetails, [name]: value });
  };

  const handleDateChange = (date) => {
    setBookDetails({ ...bookDetails, publicationDate: date });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setBookDetails({ ...bookDetails, bookCover: file });
  };

  const handleGenreChange = (event) => {
    const {
      target: { value },
    } = event;

    const selectedGenres = typeof value === 'string' ? value.split(',') : value;

    setBookDetails((prevDetails) => ({
      ...prevDetails,
      genre: [...new Set([...prevDetails.genre, ...selectedGenres])]
    }));
  };

  const handleCustomGenreSubmit = () => {
    if (bookDetails.customGenre && !bookDetails.genre.includes(bookDetails.customGenre)) {
      setBookDetails((prevDetails) => ({
        ...prevDetails,
        genre: [...prevDetails.genre, bookDetails.customGenre],
        customGenre: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess(false);
    setError(null);

    const data = new FormData();
    data.append('title', bookDetails.title);
    data.append('language', bookDetails.language);
    data.append('description', bookDetails.description);
    bookDetails.genre.forEach((genre)=>{
      data.append('genres', genre);
    });
    data.append('isbn', bookDetails.isbn);
    data.append('publication_date', bookDetails.publicationDate ? bookDetails.publicationDate.toDate().toISOString() : '');
    if (bookDetails.bookCover) {
      data.append('book_cover', bookDetails.bookCover);
    }

    try {
      await postToAPI('/author/addbook', data);
      setSuccess(true);
    } catch (err) {
      console.log(err);
      if (err.msg) {
        setError(err.msg);
      } else {
        setError(err);
      }
      window.scrollTo({top: 0})
    }
  };

  return (
    <div style={{display: 'flex', backgroundImage: `url(${bg})`, backgroundSize: '30%'}}>
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        backgroundColor: '#f9f9f9',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        maxWidth: '600px',
        margin: '70px',
        flex: 2
      }}
    >
      <Typography variant="h4" component="h1" sx={{ marginBottom: '16px', fontWeight: 'bold' }}>
        Post Your Book
      </Typography>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="book-cover"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="book-cover">
        <Button
          variant="contained"
          component="span"
          sx={{
            backgroundColor: '#000',
            color: '#fff',
            '&:hover': { backgroundColor: '#333' },
            marginBottom: '16px'
          }}
        >
          Upload Book Cover
        </Button>
        <Typography variant="body2" sx={{ marginTop: '8px' }}>
          {bookDetails.bookCover ? 'Cover image selected' : 'No cover image selected'}
        </Typography>
      </label>
      <Box
        sx={{
          width: '150px',
          height: '225px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#f0f0f0',
          backgroundImage: bookDetails.bookCover ? `url(${URL.createObjectURL(bookDetails.bookCover)})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#888',
          fontSize: '16px',
          fontWeight: 'bold',
          marginBottom: '16px'
        }}
      >
        {!bookDetails.bookCover && <p style={{ textAlign: 'center' }}>'Book Cover Preview'</p>}
      </Box>
      <TextField
        label="Title"
        name="title"
        variant="outlined"
        fullWidth
        value={bookDetails.title}
        onChange={handleInputChange}
        sx={{ marginBottom: '16px' }}
      />
      <TextField
        label="Description"
        name="description"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={bookDetails.description}
        onChange={handleInputChange}
        sx={{ marginBottom: '16px' }}
      />
      <TextField
        label="Language"
        name="language"
        variant="outlined"
        select
        fullWidth
        value={bookDetails.language}
        onChange={handleInputChange}
        sx={{ marginBottom: '16px' }}
      >
        {languages.map((lang) => (
          <MenuItem key={lang} value={lang}>
            {lang}
          </MenuItem>
        ))}
      </TextField>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Publication Date"
          value={bookDetails.publicationDate}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} fullWidth sx={{ marginBottom: '16px' }} />}
        />
      </LocalizationProvider>
      <TextField
        label="ISBN"
        name="isbn"
        variant="outlined"
        fullWidth
        value={bookDetails.isbn}
        onChange={handleInputChange}
        sx={{ marginBottom: '16px' }}
      />
      <TextField
        label="Select Genres"
        name="genre"
        variant="outlined"
        select
        fullWidth
        multiple
        value={bookDetails.genre}
        onChange={handleGenreChange}
        sx={{ marginBottom: '16px' }}
      >
        {commonGenres.map((genre) => (
          <MenuItem key={genre} value={genre}>
            {genre}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Add Custom Genre"
        name="customGenre"
        variant="outlined"
        fullWidth
        value={bookDetails.customGenre}
        onChange={handleInputChange}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleCustomGenreSubmit();
          }
        }}
        sx={{ marginBottom: '16px' }}
      />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {bookDetails.genre.map((genre) => (
          <Chip
            key={genre}
            label={genre}
            sx={{
              backgroundColor: '#000',
              color: '#fff',
              '& .MuiChip-deleteIcon': {
                color: '#fff',
              },
            }}
            onDelete={() => {
              setBookDetails((prevDetails) => ({
                ...prevDetails,
                genre: prevDetails.genre.filter((g) => g !== genre),
              }));
            }}
          />
        ))}
      </Box>
      <Button
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: '#000',
          color: '#fff',
          '&:hover': { backgroundColor: '#333' },
          alignSelf: 'flex-end'
        }}
      >
        Submit
      </Button>
    </Box>
    {error && <div style={{ color: 'white', backgroundColor: 'red', padding: '30px', border: '1px solid red', borderRadius: '20px',marginTop: '70px', marginLeft: '100px', flex: 1, marginRight: '30px', height: '60px', textAlign: 'center', paddingBottom: '40px' }}><p>{error}</p></div>}
    {success && <div style={{ color: 'white', backgroundColor: 'green', padding: '30px', border: '1px solid green', borderRadius: '20px', marginTop: '30px', marginLeft: '30px', height: '60px', textAlign: 'center'}}>Book has been posted!</div>}
    </div>
  );
};

export default PostBook;
