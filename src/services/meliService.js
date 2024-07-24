import api from "../api/api.js";

export async function getItem(id) {
  try {
    const response = await api.get(`/items/${id}`);
    const itemData = response.data;
    const description = await getItemDescription(id);

    const data = {
      author: {
        name: "Stephanye",
        lastname: "Vasconcellos",
      },
      item: {
        id: itemData.id,
        title: itemData.title,
        price: {
          currency: itemData.currency_id,
          amount: Math.floor(itemData.price),
          decimals: (itemData.price % 1).toFixed(2).split(".")[1] || 0,
        },
        picture: itemData.thumbnail,
        condition: itemData.condition,
        free_shipping: itemData.shipping.free_shipping,
        sold_quantity: itemData.sold_quantity,
        description: description.plain_text,
      },
    };
    return data;
  } catch (error) {
    console.error("Error fetching item data:", error);
    throw error;
  }
}

export async function getItemDescription(id) {
  try {
    const response = await api.get(`/items/${id}/description`);
    return response.data;
  } catch (error) {
    console.error("Error fetching item description:", error);
    throw error;
  }
}

export async function searchItems(query) {
  try {
    let categoryAlternative;
    const response = await api.get(`/sites/MLA/search?q=${query}`);

    const { results, filters } = response.data;
    const items = results.slice(0, 4);

    const categoriesFilter = filters.find((filter) => filter.id === "category");
    const categories = categoriesFilter
      ? categoriesFilter.values[0].path_from_root.map(
          (category) => category.name
        )
      : [];

    if (categories.length === 0) {
      const categoriesIdAlternative = results[0].id;
      categoryAlternative = await getItemCategory(categoriesIdAlternative);
    }

    const itemsResult = items.map((item) => ({
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: Math.floor(item.price),
        decimals: (item.price % 1).toFixed(2).split(".")[1] || 0,
      },
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
    }));

    const data = {
      author: {
        name: "Stephanye",
        lastname: "Vasconcellos",
      },
      categories:
        categories.length > 0
          ? categories
          : categoryAlternative.map((category) => category.name),
      items: itemsResult,
    };
    return data;
  } catch (error) {
    console.error("Error searching items:", error);
    throw error;
  }
}

export async function getItemDetails(id) {
  try {
    const itemResponse = await getItem(id);
    const descriptionResponse = await getItemDescription(id);

    const data = {
      author: {
        name: "Stephanye",
        lastname: "Vasconcellos",
        item: {
          id: itemResponse.id,
          title: itemResponse.title,
          price: {
            currency: itemResponse.currency_id,
            amout: Math.floor(itemResponse.price),
            decimals: (item.pice % 1).toFixed(2).split(".")[1] || 0,
          },
          picture: itemResponse.thumbnail,
          condition: itemResponse.condition,
          free_shipping: itemResponse.shipping.free_shipping,
          sold_quantity: itemResponse.sold_quantity,
          description: descriptionResponse.plain_text,
        },
      },
    };

    return data;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getItemCategory(id) {
  try {
    const responseItem = await api.get(`/items/${id}`);
    const itemData = responseItem.data;
    const { category_id } = itemData;
    const responseCategory = await api.get(`/categories/${category_id}`);
    return responseCategory.data.path_from_root;
  } catch (error) {
    console.error("Error searching categories:", error);
    throw error;
  }
}
