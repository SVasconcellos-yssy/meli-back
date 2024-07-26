import api from "../api/api.js";

export async function getItem(id) {
  try {
    const response = await api.get(`/items/${id}`);
    const itemData = response.data;
    const description = await getItemDescription(id);
    const existDescription =
      description.plain_text.length > 0
        ? description.plain_text
        : "Não foi encontrado descrição para este item.";


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
        description: existDescription
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
      categories: categories.length > 0 ? categories : categoryAlternative,
      items: itemsResult,
    };
    return data;
  } catch (error) {
    console.error("Error searching items:", error);
    throw error;
  }
}

export async function getItemCategory(id) {
  try {
    const responseItem = await api.get(`/items/${id}`);
    const itemData = responseItem.data;
    const { category_id } = itemData;
    const responseCategory = await api.get(`/categories/${category_id}`);

    const mapedCategory = responseCategory.data.path_from_root.map(
      (category) => category.name
    );

    return mapedCategory;
  } catch (error) {
    console.error("Error searching categories:", error);
    throw error;
  }
}
