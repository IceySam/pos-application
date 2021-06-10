<template>
  <cart :items="cartItems" />
  <div v-show="cartItems.length > 0" class="">
    <input
      :value="`Total Sum:  ${formatCurrency(total)}`"
      type="text"
      class="form-control text-right"
      readonly
    />
    <button class="btn btn-primary form-control"><small>Process</small></button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from "vue";
import Cart from "./Cart.vue";
import useCurrency from "@/services/currency.service";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  inStock: number;
}
export default defineComponent({
  components: { Cart },
  setup() {
    const { formatCurrency } = useCurrency();
    const cartItems = inject<CartItem[]>("cartItems");
    const total = computed(() => {
      return cartItems?.reduce((acc, obj) => obj.price * obj.quantity + acc, 0);
    });
    return { cartItems, total, formatCurrency };
  },
});
</script>
