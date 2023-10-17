export default function handler(req, res) {
    if (req.method === 'POST') {
      const { password } = req.body;
      
      if (password === process.env.SECRET_GOOGLE_DRIVE_PW) {
        res.status(200).json({ success: true });
      } else {
        res.status(401).json({ success: false, message: 'Incorrect password' });
      }
    } else {
      res.status(405).end();  // Method Not Allowed
    }
  }