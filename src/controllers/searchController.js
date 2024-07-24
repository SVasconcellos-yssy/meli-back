import axios from "axios"

const searchItems = async (req, res) => {
  try {
    const query = req.query.q;

    const response = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`);
    const { results, filters } = response.data;
    const categories = filters[0]?.values.map(value => value.name) || [];

    const items = results.map(item => ({
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: Math.floor(item.price),
        decimals: (item.price % 1).toFixed(2).split('.')[1] || 0
      },
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping
    }));
    
    res.json({
      author: {
        name: "Seu Nome",
        lastname: "Seu Sobrenome"
      },
      categories,
      items
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {searchItems}
