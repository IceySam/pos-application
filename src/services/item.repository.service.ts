import axios from "axios";
import { computed, reactive, ref, watch } from "vue";

const baseURL = process.env.VUE_APP_BASE_URL;

const state = reactive({
  categories: [
    {
      id: 1,
      name: "Category 1",
    },
    {
      id: 2,
      name: "Category 2",
    },
  ],
  products: [
    {
      id: 1,
      name: "Puma",
      price: 4500,
      quantity: 1,
      inStock: 30,
    },
    {
      id: 3,
      name: "Shar",
      price: 90000,
      quantity: 1,
      inStock: 30,
    },
    {
      id: 2,
      name: "Sha ray",
      price: 7000,
      quantity: 1,
      inStock: 30,
    },
    {
      id: 5,
      name: "Slutter",
      price: 3000,
      quantity: 1,
      inStock: 30,
    },
  ],
  error: "",
  hasError: false,
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useCart = () => {
  const selectedCategory = ref(1);
  const categories = computed(() => state.categories);
  const products = computed(() => state.products);
  const error = computed(() => state.error);
  const hasError = computed(() => state.hasError);

  watch(selectedCategory, async (val) => {
    state.products = await setProductsFor(val);
  });

  //   get all categories from server
  const setCategories = async () => {
    try {
      const res = await axios.get(`${baseURL}`, {
        headers: { "Content-Type": "application/json" },
      });
      state.categories = res.data.data;
      state.hasError = false;
      return res;
    } catch (error) {
      // state.error = error.response.data;
      state.error = "Oops!! Connection error";
      state.hasError = true;
      return error;
    }
  };

  //   get products for selected category
  const setProductsFor = async (id: number) => {
    try {
      const res = await axios.get(`${baseURL}/${id}`, {
        headers: { "Content-Type": "application/json" },
      });
      state.products = res.data.data;
      state.hasError = false;
      return res;
    } catch (error) {
      // state.error = error.response.data;
      state.error = "Oops!! Connection error";
      state.hasError = true;
      return error;
    }
  };

  //   post transaction
  const postItems = async (items: any) => {
    try {
      const res = await axios.post(`${baseURL}`, items, {
        headers: { "Content-Type": "application/json" },
      });
      state.hasError = false;
      return res;
    } catch (error) {
      // state.error = error.response.data;
      state.error = "Oops!! Connection error";
      state.hasError = true;
      return error;
    }
  };

  return {
    setCategories,
    postItems,
    selectedCategory,
    categories,
    products,
    error,
    hasError,
  };
};
