import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Box, Grid, Paper, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { jsPDF } from 'jspdf';

const Accueil: React.FC = () => {
  const [notifications, setNotifications] = useState<string[]>([]);
  const [stats, setStats] = useState<{ title: string, value: number }[]>([]);

  useEffect(() => {
    // Simulation de la récupération des statistiques et notifications
    setStats([
      { title: 'Utilisateurs Actifs', value: 150 },
      { title: 'Requêtes Assistance', value: 45 },
      { title: 'Événements Planifiés', value: 20 },
      { title: 'Déchets Collectés', value: 500 },
    ]);
    setNotifications(["Nouveau signalement de déchets", "Demande d'assistance en attente"]);
  }, []);

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Statistiques Admin', 10, 10);
    stats.forEach((stat, index) => {
      doc.text(`${stat.title}: ${stat.value}`, 10, 20 + index * 10);
    });
    doc.save('statistiques.pdf');
  };

  const navigate = (section: string) => {
    alert(`Navigation vers la section : ${section}`);
  };

  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: 'green' }}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            <img src="src/assets/Logo.png" alt="logo" className='w-15' />
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ position: 'relative' }}>
            <InputBase
              placeholder="Recherche…"
              inputProps={{ 'aria-label': 'search' }}
            />
            <IconButton type="submit" aria-label="search">
              <SearchIcon />
            </IconButton>
          </Box>
          <IconButton edge="end" color="inherit">
            <AccountCircle />
            <Typography variant="body2" style={{ marginLeft: '8px' }}>
              Admin
            </Typography>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Grid container spacing={3} style={{ padding: '20px' }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper style={{ padding: '10px', textAlign: 'center' }} onClick={() => navigate('Tableau de bord')}>
            <DashboardIcon style={{ fontSize: '50px' }} />
            <Typography variant="h6">Tableau de bord</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper style={{ padding: '10px', textAlign: 'center' }} onClick={() => navigate('Ligne D’assistance')}>
            <HelpOutlineIcon style={{ fontSize: '50px' }} />
            <Typography variant="h6">Ligne D’assistance</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper style={{ padding: '10px', textAlign: 'center' }} onClick={() => navigate('Calendrier')}>
            <CalendarTodayIcon style={{ fontSize: '50px' }} />
            <Typography variant="h6">Calendrier</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper style={{ padding: '10px', textAlign: 'center' }} onClick={() => navigate('Déchets Collectés')}>
            <DeleteIcon style={{ fontSize: '50px' }} />
            <Typography variant="h6">Déchets Collectés</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'space-around', padding: '10px', backgroundColor: 'lightgray' }}>
        <IconButton color="inherit">
          <LocationOnIcon />
        </IconButton>
        <Typography variant="body2"><img src="src/assets/Logo.png" alt="logo" className='w-15' /></Typography>
        <IconButton color="inherit">
          <NotificationsIcon />
          {notifications.length > 0 && <span>({notifications.length})</span>}
        </IconButton>
      </Box>

      <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
        <Button variant="contained" color="primary" onClick={exportPDF}>Exporter les statistiques en PDF</Button>
      </Box>
    </div>
  );
};

export default Accueil;
