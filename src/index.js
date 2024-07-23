import express from "express"
import cors from "cors"


import searchRoutes from "./routes/searchRoutes.js";
import itemRoutes from "./routes/itemRoutes.js"


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); 
app.use(express.json());

// Rotas
app.use('/api', searchRoutes);
app.use('/api/items', itemRoutes);





app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
