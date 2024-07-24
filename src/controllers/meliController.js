import express from "express";
import {
  getItem,
  getItemCategory,
  searchItems,
} from "../services/meliService.js";

const router = express.Router();

//endpoint para obter detalhes de um item
router.get("/items/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await getItem(itemId);
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Error fetching item data" });
  }
});


// Endpoint para buscar itens
router.get("/items", async (req, res) => {
  try {
    console.log("aoba");
    const query = req.query.q;
    const results = await searchItems(query);
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: "Error searching items" });
  }
});

//buscar categoria
router.get("/Item/category", async (req, res) =>{
  try{
    const id = req.params.id
    const results = await getItemCategory(id)
    res.json(results)
  }catch(error){
    res.status(500).json({ message: "Error searching category" });
  }
})

export default router;
