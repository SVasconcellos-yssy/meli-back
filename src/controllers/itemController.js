
import axios from "axios"

const getItemDetails = async (req, res) => {
  try {
    console.log("ola")
    console.log("aooooooobna")
    const { id } = req.params;
    console.log(id)
    const [itemResponse, descriptionResponse] = await Promise.all([
      axios.get(`https://api.mercadolibre.com/items/${id}`),
      axios.get(`https://api.mercadolibre.com/items/${id}/description`)
    ]);

    const item = itemResponse.data;
    const description = descriptionResponse.data.plain_text;

    res.json({
      author: {
        name: "Seu Nome",
        lastname: "Seu Sobrenome"
      },
      item: {
        id: item.id,
        title: item.title,
        price: {
          currency: item.currency_id,
          amount: Math.floor(item.price),
          decimals: (item.price % 1).toFixed(2).split('.')[1] || 0
        },
        picture: item.thumbnail,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping,
        sold_quantity: item.sold_quantity,
        description
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export default { getItemDetails };