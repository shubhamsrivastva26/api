export default async function handler(req, res) {
  // 1. Get query parameters
  const { q, key } = req.query;
  const providedApiKey = req.headers['x-api-key'] || key;

  // 2. Set your private API key here
  const SECRET_API_KEY = "shubham_123";

  // 3. Check API Key
  if (!providedApiKey || providedApiKey !== SECRET_API_KEY) {
    return res.status(401).json({
      error: "Unauthorized",
      message: "Bina key ke koi access nhi kr paye! Please provide a valid API key.",
      credits: "Created by Shubham"
    });
  }

  // 4. Require the 'q' parameter
  if (!q) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Please provide a 'q' query parameter.",
      credits: "Created by Shubham"
    });
  }

  // 5. Call the OLD API in the background
  try {
    const apiUrl = `https://api-rebix.vercel.app/api/gpt-5?q=${encodeURIComponent(q)}`;
    const response = await fetch(apiUrl);
    
    // Check if the old API responds correctly
    if (!response.ok) {
      throw new Error(`Old API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    // 6. Override the old creator with Shubham
    data.creator = "Shubham";
    
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
      message: "Failed to fetch data from the backend API.",
      credits: "Created by Shubham"
    });
  }
}
