import React, { useState } from 'react';
import { TextField, Button, Box, Alert, Typography } from '@mui/material';
import axios from 'axios';

/* File for the Update Article form: */

interface InputFields {
    id?:string;
    title: string;
    summary: string;
    date: string;
    publisher: string;
    articleId?:string;
}


// To handle error handling and validation for form submissions:
// Check if all fields are filled before updating in database, otherwise display error messages:
function validateInputFields(inputValues){
    const errors: Partial<InputFields> = {}; // As errors may not contain error messages for all the fields defined in InputFields interface

    // Check if all fields are present:
    if (!inputValues.title){
        errors.title = 'Title of article is a required field';
    }
    if (!inputValues.summary){
        errors.summary = 'Summary of article is a required field';
    }
    if (!inputValues.date){
        errors.date = 'Date of article is a required field';
    }
    if (!inputValues.publisher){
        errors.publisher = 'Publisher of article is a required field';
    }

    return errors;
}

const Update = () => {
    // To handle the article_id inputted by user to uniquely identify the article they wish to edit:
    const [articleId, setArticleId] = useState<string>('');


    const [inputFields, setInputFields] = useState<InputFields>({
        title: '',
        summary: '',
        date: '',
        publisher: ''
    });

    // To handle errors and validation of input fields:
    const [errors, setErrors] = useState<Partial<InputFields>>({});

    // To store the success message after the article has been successfully updated in the backend:
    const [successMessage, setSuccessMessage] = useState('');

    // To handle error messages while updating article (in terms of if the article_id is correct or not exists or not):
    const [errorMsg, setErrorMsg] = useState('');

    // Fetch article details to autofill the form:
    const handleFetchArticle = () => {
        if (!articleId) {
            setErrorMsg('Please provide a valid Article ID.');
            setTimeout(() => setErrorMsg(''), 3000);
            return;
        }
    
        axios
            .get('http://localhost:5001/articles') // Fetch all articles from the mock API endpoint
            .then((response) => {
                const articles = response.data; // Extract the articles array
                const article = articles.find((item) => item.articleId === articleId); // Search for the matching ID
    
                if (article) {
                    // Autofill the fields
                    setInputFields({
                        id: article.id,
                        title: article.title,
                        summary: article.summary,
                        date: article.date,
                        publisher: article.publisher,
                        articleId: article.articleId
                    });

                    // Log the updated inputFields state
                    console.log('Updated input fields:', inputFields);
                    setErrorMsg(''); // Clear any error message
                } else {
                    setErrorMsg('Article not found. Please check the Article ID.');
                    setTimeout(() => setErrorMsg(''), 3000);
                }
            })
            .catch((error) => {
                console.error('Error fetching articles:', error);
                setErrorMsg('Failed to fetch articles. Please try again.');
                setTimeout(() => setErrorMsg(''), 3000);
            });
    };
    

    // To handle the input field changes:
    const handleInputFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setInputFields({
        ...inputFields,
        [name]: value
        });
    };


    const onHandleUpdate = (event: React.FormEvent) => {
        event.preventDefault();
        const validationErrors = validateInputFields(inputFields);
    
        if (Object.keys(validationErrors).length === 0) {
            // If the article exists, proceed with the update
            const updatedArticle = {
                ...inputFields
            };
            console.log('Payload:', updatedArticle);
            axios
            .put(`http://localhost:5001/articles/${updatedArticle.id}`, updatedArticle)
            .then((response) => {
                if (response.status === 200) {
                    setSuccessMessage('Article updated successfully!');
                    setTimeout(() => setSuccessMessage(''), 3000);
                    setInputFields({ title: '', summary: '', date: '', publisher: '' });
                    setArticleId('');
                }
            })
                .catch((error) => {
                    console.error('Update failed:', error);
                    setErrorMsg('Failed to update the article');
                    setTimeout(() => setErrorMsg(''), 3000);
                    
                });
        } else {
            setErrors(validationErrors);
            // Clear each error after 3 seconds
            Object.keys(validationErrors).forEach((key) => {
                setTimeout(() => {
                    setErrors((prevErrors) => {
                        const newErrors = { ...prevErrors };
                        delete newErrors[key];
                        return newErrors;
                    });
                }, 3000);
            });
        }
    };
    


    return (
        <div>
        <Typography variant="h5" sx={{ color: 'black', marginTop: 5, marginBottom: 3}}>Enter Article ID (other details will be pre-filled and can be edited to update the article): </Typography>
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
        <form>
            <TextField
            label="Article ID"
            value={articleId}
            onChange={(e) => setArticleId(e.target.value)}
            onBlur={handleFetchArticle}
            required
            fullWidth
            sx={{ 
                marginBottom: 2,
                '& .MuiFormLabel-root': {
                    fontSize: '1.2rem', 
                    fontWeight: 'bold', 
                  }}}
            />
            <TextField
            label="Title"
            name="title"
            value={inputFields.title}
            onChange={handleInputFieldChange}
            required
            fullWidth
            sx={{ 
                marginBottom: 2,
                '& .MuiFormLabel-root': {
                    fontSize: '1.2rem', 
                    fontWeight: 'bold', 
                  }}}
            />
            {errors.title && <Alert severity="error">{errors.title}</Alert>}
            <TextField
            label="Summary"
            name="summary"
            value={inputFields.summary}
            onChange={handleInputFieldChange}
            required
            multiline
            rows={4}
            fullWidth
            sx={{ 
                marginBottom: 2,
                '& .MuiFormLabel-root': {
                    fontSize: '1.2rem', 
                    fontWeight: 'bold', 
                  }}}
            />
            {errors.summary && <Alert severity="error">{errors.summary}</Alert>}
            <TextField
            label="Date"
            name="date"
            type="date"
            onChange={handleInputFieldChange}
            required
            fullWidth
            value={inputFields.date}
            sx={{ 
                marginBottom: 2,
                '& .MuiFormLabel-root': {
                    fontSize: '1.2rem', 
                    fontWeight: 'bold', 
                  },
                "& input": {
                    color: inputFields.date ? "black" : "#aaa",  // Grey if date is not set
                }}}
            InputLabelProps={{
                    shrink: true, 
                }}
    
            />
            {errors.date && <Alert severity="error">{errors.date}</Alert>}
            <TextField
            label="Publisher"
            name="publisher"
            value={inputFields.publisher}
            onChange={handleInputFieldChange}
            required
            fullWidth
            sx={{ 
                marginBottom: 2,
                '& .MuiFormLabel-root': {
                    fontSize: '1.2rem', 
                    fontWeight: 'bold', 
                  }}}
            />
            {errors.publisher && <Alert severity="error">{errors.publisher}</Alert>}

            <Box display="flex" justifyContent="flex-end" marginTop={2}>
            <Button variant="contained" color="primary" onClick={onHandleUpdate} size='large'>
                Update
            </Button>
            </Box>
        </form>
        </div>
    );
};

export default Update;
