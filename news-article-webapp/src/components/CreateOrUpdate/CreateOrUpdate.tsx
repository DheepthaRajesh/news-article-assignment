import React, {useState} from 'react';
import { Button, Typography, Box} from '@mui/material';
import Create from './Create.tsx';  
import Update from './Update.tsx'; 
import {Link} from 'react-router-dom';

/* LOGIC for 1st page to create or update news articles:
1. Initally on the home page, there will be 2 buttons displayed -> 'Create Article' or 'Update Article'
2. If user clicks on 'Create Article' button, then the following fields will be displayed:
    -> Article_id - Unique identifier for each article (generated during creation of article). Will be greyed out as user cannot edit this field
    -> Article Title (text input) - Editable field
    -> Article Summary (textarea) - Editable field
    -> Article date (date input) - Editable field
    -> Publisher Of Article (text input) - Editable field
    
    Then we check if all fields are filled, otherwise throw appropriate error messages. 

    We use Title, date, Publisher to uniquely identify the article apart from the article_id (design choice). So if there already exists an article with the same title, date and publisher, we throw an alert that this record already exists with this article id and the user can click Update article to update any fields.

    If article doesnt exist, we create the record in the database and clear all fields for the next entry. 

3. If user clicks on 'Update Article' button, then the following fields will be displayed:
    -> Article_id - Unique identifier for each article (generated during article creation). 
        This will have to be inputted by the user to edit the corresponding article
    -> Article Title (text input) - This field will automatically retrieved using the article_id provided by the user but it can be edited for the user to update the article
    -> Article Summary (textarea) - This field will automatically retrieved using the article_id provided by the user but it can be edited for the user to update the article
    -> Article date (date input) - This field will automatically retrieved using the article_id provided by the user but it can be edited for the user to update the article
    -> Publisher Of Article (text input) - This field will automatically retrieved using the article_id provided by the user but it can be edited for the user to update the article
    
    Then we check if all fields are filled, otherwise throw appropriate error messages. 

    Then once the user edits any field, and clicks the Update button, the record will be updated in the database with the same article_id

*/

// If the user clicks the 'Create Article' button, then we will display the Create article form designed in Create.tsx file. Similarly the Update article form is in the Update.tsx file

const CreateOrUpdate = () => {
  // State to determine which form to show - either 'Create Article' or 'Update Article'
  const [formType, setFormType] = useState<"create" | "update" | null>(null);

  // Function to handle Create button click
  const handleCreateArticle = () => {
    setFormType("create");
  };

  // Function to handle Update button click
  const handleUpdateArticle = () => {
    setFormType("update");
  };

  return (
    <div>
        <Box sx={{ backgroundColor: '#b1dbe6', minHeight: '100vh', justifyContent:'center', alignItems:'center'}}>
        <header className="App-header">
            <Typography variant="h3" sx={{ color: 'black', marginTop: 5 }}>
                ArticleHub
            </Typography>
            <Typography variant="h5" sx={{ color: 'black', marginTop: 5, alignItems: 'center', marginLeft: 5, marginRight: 5}}>
                Welcome to your one-stop platform for creating, updating, and viewing articles effortlessly. 
                Easily add new articles with a title, summary, date, and publisher, each uniquely identified by 
                an auto-generated article ID for seamless updates. Browse an elegantly designed and well-organized list of 
                all your articles on the next page.
            </Typography>
            <div
            style={{
                display:'flex',
                flexDirection:'row',
                justifyContent: "center", 
                gap: "10px",
              }}>
            <Button variant="contained" color="primary" onClick={handleCreateArticle} sx={{ marginRight: 30, marginTop: 10, transform: formType === "create" ? 'scale(1.1)' : 'scale(1)', border: formType === "create" ? '10px solid #000' : 'none', alignItems:'center', '&:hover': {transform: 'scale(1.1)'}}}>
            Create Article
            </Button>
            <Button variant="contained" color="secondary" onClick={handleUpdateArticle} sx={{ marginTop: 10, marginRight: 30, transform: formType === "update" ? 'scale(1.1)' : 'scale(1)', border: formType === "update" ? '10px solid #000' : 'none',alignItems:'center', '&:hover': {transform: 'scale(1.1)'}}}>
                Update Article
            </Button>
            <Link to = "/display-articles">
                <Button variant="contained" sx={{ marginTop: 10,alignItems:'center', backgroundColor: "#dd6a51", '&:hover': {transform: 'scale(1.1)'}}}>
                    View Articles
                </Button>
            </Link>
            
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center", 
                    marginTop: "20px", 
                    width: "100%", 
                }}
                >
                {formType === "create" && <Create />}
                {formType === "update" && <Update />}
            </div>
            
            </header>
        
        </Box>
    </div>
  );
};

export default CreateOrUpdate;


// // As part of best principles, we use an interface to store the format of the input fields (which is useful for defining state of input fields and for error handling):
// interface InputFields {
//     title: string;
//     summary: string;
//     date: string;
//     publisher: string;
// }

// // To handle error handling and validation for form submissions:
// // Check if all fields are filled before updating in database, otherwise display error messages:
// function validateInputFields(inputValues){
//     const errors: Partial<InputFields> = {}; // As errors may not contain error messages for all the fields defined in InputFields interface

//     // Check if all fields are present:
//     if (!inputValues.title){
//         errors.title = 'Title of article is a required field';
//     }
//     if (!inputValues.summary){
//         errors.summary = 'Summary of article is a required field';
//     }
//     if (!inputValues.date){
//         errors.date = 'Date of article is a required field';
//     }
//     if (!inputValues.publisher){
//         errors.publisher = 'Publisher of article is a required field';
//     }

//     return errors;
    
// }
// function CreateOrUpdate(){
//     // We use a single state object to manage all input fields as it adheres to best principles -> can be scaled easily and validating if all fields are filled is easier
//     const [inputFields, setInputFields] = useState<InputFields>({
//         title: '',
//         summary: '',
//         date: '',
//         publisher: ''

//     });

//     // To handle the input field changes:
//     const handleInputFieldChange = (event) => {
//         // Destructure name and value from the event object and store it accordingly:
//         const {name, value} = event.target;

//         // Update the state for the changed input values:
//         setInputFields({
//             ...inputFields,
//             [name]:value
//         })
//     }

//     // To handle errors and validation of input fields:
//     const [errors, setErrors] = useState<Partial<InputFields>>({});

//     // To store the success message after the article has been successfully created/updated in the backend:
//     const [successMessage, setSuccessMessage] = useState('');

//     // To handle error messages while creating or updating article (in terms of if the article exists or not in the database):
//     const [errorMsg, setErrorMsg] = useState('');

//     // State to store the article ID if it exists to update the record:
//     const [articleId, setArticleId] = useState(null);


//     /* To handle form submission:
//     LOGIC for Create Article and Update Article:
//         1. Create Article - As usual, user inputs the required input fields (all values must be required), then we check if the 
//         article exists in the database. If it already exists, we throw an alert that this article exists in the database and 
//         click on 'Update' if you want to update article. Otherwise the article is created. 

//         2. Update Article - As usual, user inputs the required input fields (all values must be required), then we check if the 
//         article exists in the database. If it doesnt exist, we throw an alert that this article must be created first. Otherwise
//         we retrieve the unique id of that article record, compare its existing fields with the fields inputted by 
//         the user. If no changes, we alert accordingly. Otherwise update the article record with the inputted fields. 
//     */
//     // To handle when user presses 'Create Article' button:
//     const onHandleCreate = (event) => {
//         event.preventDefault(); // To prevent the form from reloading after submit is clicked and before we save the input field values

//         // We validate if all input fields are present when the form is submitted (according to the assessment requirements):
//         const validationErrors = validateInputFields(inputFields);
        
//         // If no errors, proceed with saving the record in database, otherwise display error message:
//         if (Object.keys(validationErrors).length === 0){
//             // console.log('Article successfully created/updated: ', inputFields);

//             // Check if article exists in database:
//             axios
//             .get('http://localhost:5001/articles', {
//             params: { title: inputFields.title, date: inputFields.date, publisher: inputFields.publisher },
//             })
//             .then((response) => {
//                 if (response.data.length> 0) {
//                     setErrorMsg("Article already exists! Please click on 'Update Article' to update existing articles");
//                     // Reset error message after 3 seconds
//                     setTimeout(() => {
//                         setErrorMsg('');
//                     }, 3000);
//                     // Reset input field after alert/error is displayed (in terms of create/update functionality):
//                     setInputFields({ title: '', summary: '', date: '', publisher: '' });
//                 }
//                 else{
//                     // Send a POST request to the mock API to create the article in the database:
//                     axios
//                     .post('http://localhost:5001/articles', inputFields)
//                     .then((response) => {
//                         if (response.status === 201) {
//                             setSuccessMessage('Article successfully created');
//                             // Reset input field after successful submission:
//                             setInputFields({ title: '', summary: '', date: '', publisher: '' });

//                             // Clear error messages
//                             setErrors({});

//                             // Reset success message after 3 seconds
//                             setTimeout(() => {
//                                 setSuccessMessage('');
//                             }, 3000);
//                         }
//                     })
//                     .catch((error) => {
//                         console.error('Error in POST request:', error);
//                     });
//                 }
//             })
//             .catch((getError) => {
//                 console.error('Error in GET request:', getError);
//             })
//         }
//         else{
//             setErrors(validationErrors);
//         }

    
//     }

//     // To handle when user presses 'Update Article' button:
//     const onHandleUpdate = (event) => {
//         event.preventDefault(); // To prevent the form from reloading after submit is clicked and before we save the input field values

//         // We validate if all input fields are present when the form is submitted (according to the assessment requirements):
//         const validationErrors = validateInputFields(inputFields);
        
//         // If no errors, proceed with saving the record in database, otherwise display error message:
//         if (Object.keys(validationErrors).length === 0){
//             // console.log('Article successfully created/updated: ', inputFields);

//             // Check if article exists in database for the first 'Update' click:
//             if (articleId === null){
//                 axios
//                 .get('http://localhost:5001/articles', {
//                 params: { title: inputFields.title, date: inputFields.date, publisher: inputFields.publisher },
//                 })
//                 .then((response) => {
//                     if (response.data.length === 0) {
//                         setErrorMsg("Article does not exist! Please click on 'Create Article' to create the article first");
//                         // Reset error message after 3 seconds
//                         setTimeout(() => {
//                             setErrorMsg('');
//                         }, 3000);
//                         // Reset input field after alert/error is displayed (in terms of create/update functionality):
//                         setInputFields({ title: '', summary: '', date: '', publisher: '' });
//                     }
//                     else{
//                         // Record exists. Extract its `id` and store it.
//                         const existingArticle = response.data[0];
//                         setArticleId(existingArticle.id);

//                         // Proceed with the update process (check if fields have changed)
//                         handleUpdateFields(existingArticle.id, inputFields);

//                     }
//                 })
//                 .catch((getError) => {
//                     console.error('Error in GET request:', getError);
//                 })
//             }
//             else{
//                 // Scenario 2: After first update click, update article with stored ID
//                 handleUpdateFields(articleId, inputFields);
//             }

//         }
//         else{
//             setErrors(validationErrors);
//         }
//     }
//     const handleUpdateFields = (id, fields) => {
//         // Step 1: Fetch the existing article data from the server
//         axios
//             .get(`http://localhost:5001/articles/${id}`)
//             .then((response) => {
//                 const existingArticle = response.data;
    
//                 // Step 2: Compare fields
//                 const fieldsChanged = Object.keys(fields).some((key) => fields[key] !== existingArticle[key]);
    
//                 if (!fieldsChanged) {
//                     // If no fields have changed, show an alert and return
//                     setErrors({}); // Clear any previous errors
//                     setErrorMsg('No changes detected. Please update the fields before submitting.');
//                     // Reset error message after 3 seconds
//                     setTimeout(() => {
//                         setErrorMsg('');
//                     }, 3000);
//                     // Reset input field after alert/error is displayed (in terms of create/update functionality):
//                     setInputFields({ title: '', summary: '', date: '', publisher: '' });
                    
//                 }
    
//                 // Step 3: If fields have changed, send the update request
//                 axios
//                     .put(`http://localhost:5001/articles/${id}`, fields)
//                     .then((updateResponse) => {
//                         if (updateResponse.status === 200) {
//                             setSuccessMessage('Article successfully updated!');
//                             setInputFields({ title: '', summary: '', date: '', publisher: '' }); // Reset fields after success
//                             setErrors({}); // Clear errors
//                             setTimeout(() => setSuccessMessage(''), 3000); // Reset success message after 3 seconds
//                         }
//                     })
//                     .catch((error) => {
//                         console.error('Error in PUT request:', error);
//                     });
//             })
//             .catch((error) => {
//                 console.error('Error fetching article:', error);
//             });
//     };
    

//     return(
//         <div> 
//             <h1> Create or Update articles </h1>
//             <form>
//                 <label>Title: </label>
//                 <TextField
//                     required
//                     id="outlined-required"
//                     type= "text"
//                     placeholder= "Enter the article's title"
//                     name= "title"
//                     value= {inputFields.title}
//                     onChange= {handleInputFieldChange}
//                     sx={{
//                         backgroundColor: 'white', // Set background color to white
//                     }}
//                 />
//                 {errors.title && <Alert severity="error">{errors.title}</Alert>}
//                 <label>Summary: </label>
//                 <TextField
//                     id="outlined-multiline-static"
//                     multiline
//                     rows={3}
//                     placeholder= "Enter the article's summary"
//                     name= "summary"
//                     value= {inputFields.summary}
//                     onChange= {handleInputFieldChange}
//                     sx={{
//                         backgroundColor: 'white', // Set background color to white
//                     }}
//                 />
//                 {errors.summary && <Alert severity="error">{errors.summary}</Alert>}
//                 <label>Date: </label>
//                 <TextField
//                     type= "date"
//                     placeholder= "Enter the article's date"
//                     name= "date"
//                     id = "date"
//                     value= {inputFields.date}
//                     onChange= {handleInputFieldChange}
//                     sx={{
//                         backgroundColor: 'white', // Set background color to white
//                     }}
//                 />
//                 {errors.date && <Alert severity="error">{errors.date}</Alert>}
//                 <label>Publisher: </label>
//                 <TextField
//                     required
//                     id="outlined-required"
//                     placeholder= "Enter the article's publisher"
//                     name= "publisher"
//                     value= {inputFields.publisher}
//                     onChange= {handleInputFieldChange}
//                     sx={{
//                         backgroundColor: 'white', // Set background color to white
//                     }}
//                 />
//                 {errors.publisher && <Alert severity="error">{errors.publisher}</Alert>}
//                 <Box display="flex" justifyContent="space-between">
//                     <Button variant="contained" color="primary" onClick={onHandleCreate}>
//                     Create
//                     </Button>
//                     <Button variant="contained" color="secondary" onClick={onHandleUpdate}>
//                     Update
//                     </Button>
//                 </Box>
//                 {successMessage && <Alert severity="success">{successMessage}</Alert>}
//                 {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
//             </form>
//         </div>
//     )
// }

// export default CreateOrUpdate;