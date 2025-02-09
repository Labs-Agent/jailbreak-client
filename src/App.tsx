import { useState, useEffect } from 'react';
import { Box, Container, Grid, Paper, Typography, useTheme } from '@mui/material';
import { LineChart, PieChart } from '@mui/x-charts';
import './App.css';

interface SystemMetrics {
  cpu: number;
  used_memory: number;
  available_memory: number;
  core_count: number;
  total_memory: number;
  total_swap: number;
  used_swap: number;
}

function App() {
  const theme = useTheme();
  const [metrics, setMetrics] = useState<SystemMetrics>({
    cpu: 0,
    used_memory: 0,
    available_memory: 0,
    core_count: 0,
    total_memory: 0,
    total_swap: 0,
    used_swap: 0,
  });

  // Simulated data for now - replace with actual data fetching
  useEffect(() => {
    const mockData = {
      cpu: 45,
      used_memory: 8192,
      available_memory: 16384,
      core_count: 8,
      total_memory: 32768,
      total_swap: 4096,
      used_swap: 1024,
    };
    setMetrics(mockData);
  }, []);

  const memoryData = [
    { value: metrics.used_memory, label: 'Used Memory' },
    { value: metrics.available_memory, label: 'Available Memory' },
  ];

  const swapData = [
    { value: metrics.used_swap, label: 'Used Swap' },
    { value: metrics.total_swap - metrics.used_swap, label: 'Available Swap' },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        System Metrics Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* CPU Usage Chart */}
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 300,
            }}
          >
            <Typography variant="h6" gutterBottom>
              CPU Usage Over Time
            </Typography>
            <LineChart
              series={[
                {
                  data: [metrics.cpu],
                  label: 'CPU Usage (%)',
                  color: theme.palette.primary.main,
                },
              ]}
              xAxis={[{ data: [new Date()], scaleType: 'time' }]}
              height={220}
            />
          </Paper>
        </Grid>

        {/* Core Count Display */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 300,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6" gutterBottom>
              CPU Cores
            </Typography>
            <Typography variant="h2" color="primary">
              {metrics.core_count}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Total Cores
            </Typography>
          </Paper>
        </Grid>

        {/* Memory Usage Chart */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 300,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Memory Usage
            </Typography>
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
              <PieChart
                series={[
                  {
                    data: memoryData,
                    highlightScope: { faded: 'global', highlighted: 'item' },
                    faded: { innerRadius: 30, additionalRadius: -30 },
                  },
                ]}
                height={220}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Swap Usage Chart */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 300,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Swap Usage
            </Typography>
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
              <PieChart
                series={[
                  {
                    data: swapData,
                    highlightScope: { faded: 'global', highlighted: 'item' },
                    faded: { innerRadius: 30, additionalRadius: -30 },
                  },
                ]}
                height={220}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
