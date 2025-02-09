import { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  ThemeProvider, 
  createTheme,
  AppBar,
  Toolbar,
  IconButton,
  CssBaseline,
  Tooltip,
  Badge,
  Avatar,
  Chip,
} from '@mui/material';
import { LineChart, PieChart } from '@mui/x-charts';
import { 
  Memory, 
  Storage, 
  Speed, 
  Notifications,
  Settings,
  Terminal,
  CloudDone
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { usePrivy } from '@privy-io/react-auth';
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

const MotionPaper = motion(Paper);

// Define animation variants before using them
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
    }
  },
};

// Now define InfoSection after the variants
const InfoSection = () => (
  <MotionPaper
    variants={itemVariants}
    whileHover={{ scale: 1.01 }}
    sx={{
      p: 3,
      mb: 3,
      background: '#ffffff',
      borderColor: '#e2e8f0',
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
      <Speed sx={{ color: 'primary.main', fontSize: 32 }} />
      <Box>
        <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 600, mb: 0.5 }}>
          Gaia AI Node Information
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          High-performance edge computing node for AI inference
        </Typography>
      </Box>
    </Box>
    
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Typography variant="subtitle1" sx={{ color: 'black', fontWeight: 'bold', mb: 1 }}>
          🚀 Deployment Details
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          • Deployed on: Local Edge Device<br />
          • Runtime: Ollama v0.1.14<br />
          • Models: Mistral, Llama2, CodeLlama<br />
          • Status: Active & Operational
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="subtitle1" sx={{ color: 'black', fontWeight: 'bold', mb: 1 }}>
          ⚡ Performance Metrics
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          • Average Response Time: 150ms<br />
          • Requests per Second: 10<br />
          • Uptime: 99.9%<br />
          • Active Connections: 5
        </Typography>
      </Grid>
    </Grid>
  </MotionPaper>
);

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb',
      light: '#3b82f6',
      dark: '#1d4ed8',
    },
    secondary: {
      main: '#4f46e5',
      light: '#6366f1',
      dark: '#4338ca',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a',
      secondary: '#475569',
    },
    success: {
      main: '#16a34a',
      dark: '#15803d',
    },
    error: {
      main: '#dc2626',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#f8fafc',
          backgroundImage: 'none',
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: 16,
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderBottom: '1px solid #e2e8f0',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          height: 28,
        },
      },
    },
  },
});

const Navbar = () => (
  <AppBar 
    position="fixed" 
    elevation={0}
    sx={{ 
      backdropFilter: 'blur(10px)',
      background: 'linear-gradient(to right, rgba(29, 78, 216, 0.97), rgba(30, 64, 175, 0.97))',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    }}
  >
    <Toolbar sx={{ 
      height: 70,
      px: { xs: 2, sm: 4 },
    }}>
      {/* Left side */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2,
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          padding: '8px 16px',
        }}>
          <Terminal sx={{ 
            fontSize: 24, 
            color: 'white',
            filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))'
          }} />
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700,
              letterSpacing: '-0.5px',
              color: 'white',
              textShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
            }}
          >
            Bot-Man
          </Typography>
        </Box>

        <Chip 
          icon={<CloudDone sx={{ fontSize: 16, color: '#22c55e' }} />}
          label="Online" 
          size="small"
          sx={{ 
            ml: { xs: 1, sm: 2 },
            background: 'rgba(34, 197, 94, 0.2)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            color: '#4ade80',
            '& .MuiChip-label': {
              fontWeight: 600,
              px: 1,
            },
            height: 24,
          }}
        />
      </Box>

      {/* Right side */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: { xs: 1.5, sm: 2.5 },
        ml: 'auto',
      }}>
        <Tooltip title="System Notifications">
          <IconButton 
            size="small"
            sx={{ 
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            <Badge 
              badgeContent={3} 
              color="error"
              sx={{
                '& .MuiBadge-badge': {
                  background: 'linear-gradient(to bottom right, #ef4444, #dc2626)',
                  border: '2px solid rgba(29, 78, 216, 0.97)',
                }
              }}
            >
              <Notifications sx={{ fontSize: 20, color: 'white' }} />
            </Badge>
          </IconButton>
        </Tooltip>

        <Tooltip title="System Settings">
          <IconButton 
            size="small"
            sx={{ 
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            <Settings sx={{ fontSize: 20, color: 'white' }} />
          </IconButton>
        </Tooltip>

        <Avatar 
          sx={{ 
            width: 35,
            height: 35,
            fontSize: '0.9rem',
            fontWeight: 700,
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            color: 'white',
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
            },
          }}
        >
          AI
        </Avatar>
      </Box>
    </Toolbar>
  </AppBar>
);



function App() {
  const { login, authenticated } = usePrivy();
  const [metrics, setMetrics] = useState<SystemMetrics>({
    cpu: 0,
    used_memory: 0,
    available_memory: 0,
    core_count: 0,
    total_memory: 0,
    total_swap: 0,
    used_swap: 0,
  });

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

  // If wallet is not connected, show connect wallet page
  if (!authenticated) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            width: '100%',
            bgcolor: 'background.default',
            background: 'linear-gradient(to bottom right, #1e293b, #0f172a)',
            color: 'text.primary',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Paper
              sx={{
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3,
                maxWidth: 400,
                mx: 'auto',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 4,
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Terminal sx={{ fontSize: 48, color: '#60a5fa' }} />
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #60a5fa, #818cf8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textAlign: 'center',
                }}
              >
                Welcome to Bot-Man
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#94a3b8',
                  textAlign: 'center',
                  maxWidth: 300,
                  mb: 2,
                }}
              >
                Connect your wallet to access real-time system metrics and performance analytics
              </Typography>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Box
                  onClick={login}
                  sx={{
                    py: 2,
                    px: 4,
                    background: 'linear-gradient(45deg, #3b82f6, #6366f1)',
                    borderRadius: 2,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      filter: 'brightness(1.1)',
                    },
                  }}
                >
                  <Typography
                    variant="button"
                    sx={{
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '1rem',
                    }}
                  >
                    Connect Wallet
                  </Typography>
                </Box>
              </motion.div>
            </Paper>
          </motion.div>
        </Box>
      </ThemeProvider>
    );
  }

  // If wallet is connected, show the main dashboard
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          width: '100%',
          bgcolor: 'background.default',
          background: 'linear-gradient(to bottom, #f8fafc, #f1f5f9)',
          color: 'text.primary',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Navbar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pt: 10,
            pb: 3,
            px: { xs: 2, sm: 3 },
            zIndex: 1,
          }}
        >
          <Container maxWidth="lg">
            <InfoSection />
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <Grid container spacing={3}>
                {/* CPU Usage Chart */}
                <Grid item xs={12}>
                  <MotionPaper
                    variants={itemVariants}
                    whileHover={{ scale: 1.01 }}
                    sx={{
                      p: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      height: { xs: 300, sm: 350 },
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                      background: 'linear-gradient(145deg, #1e293b, #0f172a)',
                      border: '1px solid rgba(148, 163, 184, 0.1)',
                      '& .MuiChartsAxis-line': {
                        stroke: '#475569',
                      },
                      '& .MuiChartsAxis-tick': {
                        stroke: '#475569',
                      },
                      '& .MuiChartsAxis-tickLabel': {
                        fill: '#94a3b8',
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <Speed color="primary" />
                      <Typography variant="h6">CPU Usage Over Time</Typography>
                    </Box>
                    <LineChart
                      series={[
                        {
                          data: [metrics.cpu],
                          label: 'CPU Usage (%)',
                          color: theme.palette.primary.main,
                          area: true,
                          showMark: true,
                          curve: "linear",
                          valueFormatter: (value) => `${value}%`,
                        },
                      ]}
                      xAxis={[{ 
                        data: [new Date()], 
                        scaleType: 'time',
                        tickMinStep: 3600000,
                        tickLabelStyle: {
                          fill: '#94a3b8',
                          fontSize: 12
                        }
                      }]}
                      yAxis={[{
                        min: 0,
                        max: 100,
                        tickMinStep: 20,
                        tickLabelStyle: {
                          fill: '#94a3b8',
                          fontSize: 12
                        }
                      }]}
                      height={250}
                      sx={{
                        '.MuiLineElement-root': {
                          strokeWidth: 3,
                        },
                        '.MuiAreaElement-root': {
                          fill: `${theme.palette.primary.main}20`, // Add transparency to area
                        },
                        '.MuiChartsLegend-root': {
                          color: '#94a3b8',
                        },
                      }}
                    />
                  </MotionPaper>
                </Grid>

                {/* Core Count Display */}
                <Grid item xs={12} sm={6} md={4}>
                  <MotionPaper
                    variants={itemVariants}
                    whileHover={{ scale: 1.03 }}
                    sx={{
                      p: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 200,
                      justifyContent: 'center',
                      alignItems: 'center',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.3)',
                    }}
                  >
                    <Memory color="primary" sx={{ fontSize: 40, mb: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      CPU Cores
                    </Typography>
                    <Typography 
                      variant="h2" 
                      color="primary"
                      sx={{ 
                        fontWeight: 'bold',
                        background: 'linear-gradient(45deg, #60a5fa, #818cf8)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {metrics.core_count}
                    </Typography>
                  </MotionPaper>
                </Grid>

                {/* Memory Usage Chart */}
                <Grid item xs={12} sm={6} md={4}>
                  <MotionPaper
                    variants={itemVariants}
                    whileHover={{ scale: 1.03 }}
                    sx={{
                      p: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      height: { xs: 280, sm: 200 },
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                      background: 'linear-gradient(145deg, #1e293b, #0f172a)',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <Memory color="primary" />
                      <Typography variant="h6">Memory Usage</Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                      <PieChart
                        series={[
                          {
                            data: memoryData,
                            highlightScope: { faded: 'global', highlighted: 'item' },
                            faded: { innerRadius: 30, additionalRadius: -30 },
                            arcLabel: (item) => `${(item.value / metrics.total_memory * 100).toFixed(0)}%`,
                            arcLabelMinAngle: 45,
                          },
                        ]}
                        height={150}
                        margin={{ 
                          top: 10, 
                          bottom: 35,
                          left: 10,
                          right: 10
                        }}
                        slotProps={{
                          legend: {
                            direction: 'row',
                            position: { vertical: 'bottom', horizontal: 'middle' },
                            padding: { top: 20, bottom: 0, left: 0, right: 0 },
                            itemMarkWidth: 10,
                            itemMarkHeight: 10,
                            markGap: 5,
                            itemGap: 10,
                            labelStyle: {
                              fill: '#475569',
                              fontSize: 11,
                            },
                          },
                        }}
                        colors={['#3b82f6', '#93c5fd']}
                      />
                    </Box>
                  </MotionPaper>
                </Grid>

                {/* Swap Usage Chart */}
                <Grid item xs={12} sm={6} md={4}>
                  <MotionPaper
                    variants={itemVariants}
                    whileHover={{ scale: 1.03 }}
                    sx={{
                      p: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      height: { xs: 280, sm: 200 },
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                      background: 'linear-gradient(145deg, #1e293b, #0f172a)',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <Storage color="primary" />
                      <Typography variant="h6">Swap Usage</Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                      <PieChart
                        series={[
                          {
                            data: swapData,
                            highlightScope: { faded: 'global', highlighted: 'item' },
                            faded: { innerRadius: 30, additionalRadius: -30 },
                            arcLabel: (item) => `${(item.value / metrics.total_swap * 100).toFixed(0)}%`,
                            arcLabelMinAngle: 45,
                          },
                        ]}
                        height={150}
                        margin={{ 
                          top: 10, 
                          bottom: 35,
                          left: 10,
                          right: 10
                        }}
                        slotProps={{
                          legend: {
                            direction: 'row',
                            position: { vertical: 'bottom', horizontal: 'middle' },
                            padding: { top: 20, bottom: 0, left: 0, right: 0 },
                            itemMarkWidth: 10,
                            itemMarkHeight: 10,
                            markGap: 5,
                            itemGap: 10,
                            labelStyle: {
                              fill: '#475569',
                              fontSize: 11,
                            },
                          },
                        }}
                        colors={['#3b82f6', '#93c5fd']}
                      />
                    </Box>
                  </MotionPaper>
                </Grid>
              </Grid>
            </motion.div>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
