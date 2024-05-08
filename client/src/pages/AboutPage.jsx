import React from "react";
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const aboutData = [
  { img: 'https://www.wildrose-district.com/wp-content/uploads/2018/09/iStock-868935172.jpg'},
  { img: 'https://www.buffalocabinsandlodges.com/wp-content/uploads/2021/09/Fancy-Restaurants-in-Ohio.jpg'},
  { img: 'https://www.ktchnrebel.com/wp-content/uploads/2023/01/Served_dinner_table_AdobeStock_243652575.tif_748105_image-office-2.jpg'},
  { img: 'https://assets2.devourtours.com/wp-content/uploads/pexels-mister-mister-food-rotated.jpg'},
  { img: 'https://www.tastingtable.com/img/gallery/regional-chinese-food-explained/l-intro-1669836324.jpg'},
  { img: 'https://luluwild.co.uk/wp-content/uploads/2023/07/pan-asian-vs-chinese-cousine-1024x771.jpeg'}
];

function AboutPage() {
  return (
    <Box sx={{
  width: '100%',
  overflowY: 'hidden',
  padding: '20px',
  fontFamily: "Boogaloo",
  color: 'rgb(240, 236, 236)',
  textShadow: '2px 4px 4px rgba(0, 0, 0, 1)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center' // This centers the content horizontally
}}>
  <h1 style={{ marginBottom: '10px' }}>BiteReserve</h1>
  <h2 style={{ marginTop: '0', marginBottom: '20px' }}>"The Start of Flavor, Perfect Reservations with BiteReserve"</h2>
  
  <ImageList sx={{
    width: 1200, // Fixed width of the ImageList
    height: 550, // Optional: you can set a fixed height
    overflowY: 'hidden'
  }} variant="masonry" cols={3} gap={8}>
    {aboutData.map((item) => (
      <ImageListItem key={item.img} sx={{
        width: 'auto', // Ensures the items do not stretch
        height: 350
        , // Fixed height for each item
        display: 'flex',
        justifyContent: 'center' // Centers the image within the item
      }}>
        <img
          srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
          src={`${item.img}?w=248&fit=crop&auto=format`}
          alt="Decorative image"
          loading="eager"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} // Makes the image cover the item area
        />
        
      </ImageListItem>
    ))}
    
  </ImageList>
  <h2 style={{
    textAlign: 'center', // Centers the text
    maxWidth: '800px', // Sets a max width for the text block
    lineHeight: '1.4', // Adjusts the line height for better readability
    margin: 'auto', // Centers the block horizontally and vertically
    whiteSpace: 'pre-wrap' // Ensures the text wraps properly
  }}>
    Welcome to BiteReserve,{"\n"} 
    the premier destination for securing a table {"\n"}
    at the world's most exquisite dining establishments.
  </h2>
  
</Box>
  );
}

export default AboutPage;