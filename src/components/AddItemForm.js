// src/AddItemForm.js
import React, { useState } from 'react';
import { TextField, Button, Box, Paper, Typography } from '@mui/material';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';

function AddItemForm() {
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'pantryItems'), {
        item,
        quantity
      });
      setItem('');
      setQuantity('');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
         <Typography variant="h6" gutterBottom>
           Add Pantry Item
         </Typography>
         <motion.div
           initial={{ opacity: 0, y: -10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
         >
           <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
             <TextField
               label="Item"
               value={item}
               onChange={(e) => setItem(e.target.value)}
               fullWidth
               margin="normal"
             />
             <TextField
               label="Quantity"
               value={quantity}
               onChange={(e) => setQuantity(e.target.value)}
               fullWidth
               margin="normal"
             />
             <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
               Add Item
             </Button>
           </Box>
         </motion.div>
       </Paper>
       );
    }
 
    export default AddItemForm;
 

