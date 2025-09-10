
import { Request, Response } from "express";
import { getAllApartmentsFromDB, getApartmentByIdFromDB } from '../db/queries';

// Simple user agent parser function
const parseUserAgent = (userAgent: string) => {
  const ua = userAgent.toLowerCase();

  // Operating System detection
  let os = 'Unknown OS';
  if (ua.includes('windows')) os = 'Windows';
  else if (ua.includes('macintosh') || ua.includes('mac os x')) os = 'macOS';
  else if (ua.includes('linux')) os = 'Linux';
  else if (ua.includes('android')) os = 'Android';
  else if (ua.includes('ios') || ua.includes('iphone') || ua.includes('ipad')) os = 'iOS';

  // Browser detection
  let browser = 'Unknown Browser';
  if (ua.includes('chrome') && !ua.includes('edg')) browser = 'Chrome';
  else if (ua.includes('firefox')) browser = 'Firefox';
  else if (ua.includes('safari') && !ua.includes('chrome')) browser = 'Safari';
  else if (ua.includes('edg')) browser = 'Edge';
  else if (ua.includes('opera')) browser = 'Opera';

  // Device detection
  let device = 'Desktop';
  if (ua.includes('mobile')) device = 'Mobile';
  else if (ua.includes('tablet') || ua.includes('ipad')) device = 'Tablet';

  return { os, browser, device };
};

// Get all apartments
export const getAllApartments = async (req: Request, res: Response) => {
  // Extract user information for logging
  const clientIP = req.ip || req.connection.remoteAddress || req.socket.remoteAddress || 'Unknown';
  const userAgent = req.get('User-Agent') || 'Unknown';
  const timestamp = new Date().toISOString();
  
  // Parse user agent for system information
  const systemInfo = parseUserAgent(userAgent);

  // Log comprehensive user information
  console.log('='.repeat(80));
  console.log('🏠 APARTMENTS REQUEST LOG');
  console.log('='.repeat(80));
  console.log(`📅 Timestamp: ${timestamp}`);
  console.log(`🌐 IP Address: ${clientIP}`);
  console.log(`🖥️  Operating System: ${systemInfo.os}`);
  console.log(`🌐 Browser: ${systemInfo.browser}`);
  console.log(`📱 Device: ${systemInfo.device}`);

  try {
    const apartments = await getAllApartmentsFromDB();
    res.json(apartments);
  } catch (err) {
    console.error("❌ Error fetching apartments:", err);
    res.status(500).json({ error: "Failed to fetch apartments" });
  }
};

// Get one apartment by ID
export const getApartmentById = async (req: Request, res: Response) => {
  try {
    const apartment = await getApartmentByIdFromDB(parseInt(req.params.id));
    if (!apartment) return res.status(404).json({ error: "Not found" });
    res.json(apartment);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch apartment" });
  }
};
