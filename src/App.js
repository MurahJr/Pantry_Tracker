// src/App.js
import React from 'react';
import { Container, AppBar, Toolbar, Typography } from '@mui/material';
import AddItemForm from './components/AddItemForm';
import PantryList from './components/PantryList';

function App() {
  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Pantry Tracker
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <AddItemForm />
        <PantryList />
      </main>
    </Container>
  );
}

export default App;
