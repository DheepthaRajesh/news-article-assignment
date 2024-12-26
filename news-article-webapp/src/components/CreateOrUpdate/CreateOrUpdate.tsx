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


