import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Alert, Typography } from '@mui/material';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

/* File for the Create Article form: */

//As part of best principles, we use an interface to store the format of the input fields (which is useful for defining state of input fields and for error handling):
interface InputFields {
    title: string;
    summary: string;
    date: string;
    publisher: string;
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

const Create = () => {
  const [inputFields, setInputFields] = useState<InputFields>({
    title: '',
    summary: '',
    date: '',
    publisher: ''
  });

  // To handle errors and validation of input fields:
  const [errors, setErrors] = useState<Partial<InputFields>>({});

  // To store the success message after the article has been successfully created in the backend:
  const [successMessage, setSuccessMessage] = useState('');

  // To handle error messages while creating article (in terms of if the article exists or not in the database):
  const [errorMsg, setErrorMsg] = useState('');

  // To store the uniquely generated article_id:
  const [articleId, setArticleId] = useState('');

  
  // Generate a unique article_ID using the uuidv4 library to display to users before they input fields:
  // Slice the unique id to generate a smaller article_ID
  useEffect(() => {
    setArticleId(uuidv4().slice(0,8));
  }, []);

  // To handle the input field changes:
  const handleInputFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Destructure name and value from the event object and store it accordingly:
    const { name, value } = event.target;

    // Update the state for the changed input values:
    setInputFields({
      ...inputFields,
      [name]: value
    });

  };

  // Based on the title, date and publisher fields inputted by user, check if it already exists in database:

  const checkArticleExists = async (): Promise<{ articleId: string } | null> => {
    try {
      const response = await axios.get('http://localhost:5001/articles', {
        params: {
          title: inputFields.title,
          date: inputFields.date,
          publisher: inputFields.publisher
        }
      });
      
      if (response.data.length > 0) {
        return { articleId: response.data[0].articleId }; // Return the existing article ID if found
      } else {
        return null; // Return null if no article found
      }
    } catch (error) {
      console.error('Error checking article existence:', error);
      return null; // Return null if an error occurs
    }
  };
  


  // To handle when user presses 'Create' button:
  const onHandleCreate = async(event: React.FormEvent) => {
    event.preventDefault(); // To prevent the form from reloading after submit is clicked and before we save the input field values
    
    // We validate if all input fields are present when the form is submitted (according to the assessment requirements):
    const validationErrors = validateInputFields(inputFields);

    // If no errors, proceed with saving the record in database, otherwise display error message:
    if (Object.keys(validationErrors).length === 0) {
        try{
            // Check if article already exists:
            const existingArticleResponse = await checkArticleExists();
            if (existingArticleResponse){
                setErrorMsg(`Article already exists with ID: ${existingArticleResponse.articleId}. Click on Update Article instead.`);
                setInputFields({ title: '', summary: '', date: '', publisher: '' });
                setTimeout(() => setErrorMsg(''), 3000);
            }
            else{
                // Create the article object, including the articleId to POST to database
                const newArticle = {
                    ...inputFields,
                    articleId: articleId // Use the generated articleId here
                };
                // Send a POST request to the mock API to create the article in the database:
                const response = await axios.post('http://localhost:5001/articles', newArticle);
                if (response.status === 201) {
                    setSuccessMessage('Article created successfully!');
                    setInputFields({ title: '', summary: '', date: '', publisher: '' });
                    setTimeout(() => setSuccessMessage(''), 3000);

                    // Reset article_id for next entry:
                    setArticleId(uuidv4().slice(0,8));
                }
                }
        
        } catch (error) {
        console.error('Error during article creation or existence check:', error);
        setErrorMsg('Failed to create article');
        setTimeout(() => setErrorMsg(''), 3000);
        }
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
      <Typography variant="h5" sx={{ color: 'black', marginTop: 5, marginBottom: 3, alignItems:'center'}}>Enter details to create new article: </Typography>
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
      <form>
        <TextField
         label="Article ID"
         id = "filled-disabled"
         value={articleId}
         variant="filled"
         fullWidth
         disabled
         sx={{ 
            backgroundColor: '#f5f5f5', 
            marginBottom: 2,
            '& .MuiFormLabel-root': {
                fontSize: '1.2rem', 
                fontWeight: 'bold', 
              }}}
        />
        <TextField
          label="Title"
          name="title"
          id = "outlined-required"
          value={inputFields.title}
          onChange={handleInputFieldChange}
          required
          fullWidth
          sx = {{
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
          rows={10}
          fullWidth
          sx = {{
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
          value={inputFields.date}
          onChange={handleInputFieldChange}
          required
          fullWidth
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
          sx = {{
            marginBottom: 2,
            '& .MuiFormLabel-root': {
                fontSize: '1.2rem', 
                fontWeight: 'bold', 
              
          }}}
        />
        {errors.publisher && <Alert severity="error">{errors.publisher}</Alert>}

        <Box display="flex" justifyContent="flex-end" marginTop={2}>
          <Button variant="contained" color="primary" onClick={onHandleCreate} size='large'>
            Create
          </Button>
        </Box>
        
      </form>
    </div>
  );
};

export default Create;
