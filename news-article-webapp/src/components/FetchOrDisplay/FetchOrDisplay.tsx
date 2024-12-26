import React, { useEffect, useState } from 'react';
import { Typography, Box, Card, CardContent, Button} from '@mui/material';
import axios from 'axios';
import {Link} from 'react-router-dom';

/* The header will display how many articles found/exist in database. 
All articles will be displayed in a Card/Box format with Publisher name and date or article, followed by article's title, 
followed by the article summary in bullet point format
*/

// Define the structure of an article
interface Article {
    articleId: string;
    title: string;
    summary: string;
    date: string;
    publisher: string;
}


const FetchOrDisplay = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  // Fetch articles from the database
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:5001/articles'); // Mock API endpoint (json-server)
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
    
    fetchArticles();
  }, []);

  return (
      <div
          style={{
              backgroundColor: '#b1dbe6',
              minHeight: '100vh'
          }}
      >
          <div
              style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginBottom: '20px',
                  paddingTop: 30
              }}>
              <div
                style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}
                >
                <Link to="/">
                <Button
                    variant="contained"
                    sx={{ backgroundColor: "#dd6a51", '&:hover': { transform: 'scale(1,1)' }, marginRight: 64, marginLeft: 5}}
                >
                    Go to Update Article
                </Button>
                </Link>

               
                <Typography
                    variant="h4"
                    sx={{
                        color: 'black',
                        textAlign: 'center'
                    }}
                >
                    Articles List
                </Typography>
            </div>

            
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '10px',
                }}
            >
                <Typography variant="h5" sx={{ color: 'blue' }}>
                    {articles.length} {articles.length === 1 ? 'Article' : 'Articles'} Found
                </Typography>
    </div>
          </div>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 3 }}>
        {articles.length > 0 ? (
          articles.map((article) => (
            <Card key={article.articleId} sx={{ width: '80%', marginBottom: 2, padding: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', marginBottom: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', marginRight: 10}}>
                    {article.publisher}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold'}}>{article.date}</Typography>
                </Box>
                <Typography variant="h6" sx={{ marginBottom: 1, fontWeight: 'bold' }}>
                  {article.title}
                </Typography>
                <Typography variant="body1" sx={{ listStyleType: 'circle', paddingLeft: 2 }}>
                  {article.summary.split('\n').filter((line) => line.trim() !== '').map((line, index) => (
                    <Typography key={index} variant="body2" sx={{ paddingLeft: 2 }}>
                      • {line}
                    </Typography>
                  ))}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="body1">No articles found.</Typography>
        )}
      </Box>
    </div>
  );
};

export default FetchOrDisplay;
