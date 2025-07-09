import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/', async (req, res) => {
  const { origin, destination, waypoints } = req.body;

  const baseUrl = 'https://maps.googleapis.com/maps/api/directions/json';
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  try {
    const waypointParam = waypoints?.length
      ? `&waypoints=optimize:true|${waypoints.join('|')}`
      : '';

    const url = `${baseUrl}?origin=${origin}&destination=${destination}${waypointParam}&key=${apiKey}`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch directions' });
  }
});

export default router;
