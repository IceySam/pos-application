<template>
  <div class="p-3">
    <div class="row">
      <!-- top -->
      <div class="col-md-12">
        <header-nav />
        <alert-bar v-if="hasError" :message="error" />
      </div>
      <!-- Right -->
      <div class="col-md-12 col-lg-6">
        <left />
      </div>
      <!-- Left -->
      <div class="col-md-12 col-lg-6">
        <right />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useCart } from "@/services/cart.service";
import { defineComponent, provide, reactive } from "vue";
import HeaderNav from "../HeaderNav.vue";
import Left from "./Left/Left.vue";
import Right from "./Right/Right.vue";
import AlertBar from "@/Views/components/AlertBar.vue";
import { CartItem } from "@/types";
// import { useCompanyInfo } from "@/services/utils.service";

export default defineComponent({
  name: "Home",
  components: { Left, HeaderNav, Right, AlertBar },
  setup() {
    const { setCategories, error, hasError } = useCart();
    // const { setCompanyDetails } = useCompanyInfo()
    // get categories from serve and save in state
    setCategories();

    /**
     * set company information NB. edit useCompanyInfo in utils.service.ts to use this function
     * setCompanyDetails() gets company details from server
     * details such as company_name, company_address, company_email, company_phone can be gotten
     * from const { company_name, company_address, company_email, company_phone, setCompanyDetails } = useCompanyInfo()
     * */
    // setCompanyDetails();

    const cartItems = reactive<CartItem[]>([]);
    const addToCart = (item: CartItem) => {
      if (!cartItems.some((obj) => obj.id === item.id)) {
        cartItems.push(item);
      }
    };
    const removeFromCart = (id: number) => {
      const index = cartItems.findIndex((obj) => obj.id === id);
      cartItems.splice(index, 1);
    };
    const clearCart = () => {
      while (cartItems.length > 0) {
        cartItems.pop();
      }
    };
    provide("addToCart", addToCart);
    provide("removeFromCart", removeFromCart);
    provide("clearCart", clearCart);
    provide("cartItems", cartItems);

    return { error, hasError };
  },
});
</script>
