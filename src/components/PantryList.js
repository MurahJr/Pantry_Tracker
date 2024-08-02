// src/PantryList.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { List, ListItem, ListItemText, Paper, Typography, IconButton, TextField, Button, Box } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

function PantryList() {
  const [items, setItems] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [editItem, setEditItem] = useState('');
  const [editQuantity, setEditQuantity] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'pantryItems'), (snapshot) => {
      const itemsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(itemsList);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'pantryItems', id));
};

const handleEdit = (item) => {
  setEditItemId(item.id);
  setEditItem(item.item);
  setEditQuantity(item.quantity);
};

const handleUpdate = async () => {
  await updateDoc(doc(db, 'pantryItems', editItemId), {
    item: editItem,
    quantity: editQuantity
  });
  setEditItemId(null);
  setEditItem('');
  setEditQuantity('');
};

return (
  <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
    <Typography variant="h6" gutterBottom>
      Pantry Items
    </Typography>
    <List>
      <AnimatePresence>
        {items.map(({ id, item, quantity }) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            >
              <ListItem
                secondaryAction={
                  <>
                    <IconButton edge="end" aria-label="edit" onClick={() => handleEdit({ id, item, quantity })}>
                      <Edit />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(id)}>
                      <Delete />
                    </IconButton>
                  </>
                }
              >
                <ListItemText primary={item} secondary={`Quantity: ${quantity}`} />
              </ListItem>
            </motion.div>
          ))}
        </AnimatePresence>
      </List>

      {editItemId && (
        <Box component="form" onSubmit={handleUpdate} sx={{ mt: 4 }}>
          <TextField
            label="Edit Item"
            value={editItem}
            onChange={(e) => setEditItem(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Edit Quantity"
            value={editQuantity}
            onChange={(e) => setEditQuantity(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleUpdate} sx={{ mt: 2 }}>
            Update Item
          </Button>
        </Box>
      )}
    </Paper>
  );
}

export default PantryList;


