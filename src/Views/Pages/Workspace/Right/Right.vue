<template>
  <cart :items="cartItems" />
  <div v-show="cartItems.length > 0" class="">
    <span class="form-control text-center">
      {{
        `Items: ${cartItems.length}, Total Amount:  ${formatCurrency(total)}`
      }}
    </span>
    <button @click="printItems" class="btn btn-primary form-control">
      <small>Process</small>
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, reactive } from "vue";
import Cart from "./Cart.vue";
import useCurrency from "@/services/currency.service";
import { usePrint } from "@/services/cart.service";
import { CartItem, ReceiptDetails } from "@/types";
import useAuth from "@/services/auth.service";

export default defineComponent({
  components: { Cart },
  setup() {
    const { formatCurrency } = useCurrency();
    const { print } = usePrint();
    const cartItems = inject<CartItem[]>("cartItems");
    const { user } = useAuth();

    const { name } = user;

    const receiptDetails = reactive<ReceiptDetails>({
      name,
      company_name: "Happiness Eatery Service",
      company_email: "xxxxxx",
      company_address: "xxxxx",
      company_phone: +2340000000000,
    });

    const formattedItems = computed(() =>
      cartItems?.map((item, index) => ({
        index: index + 1,
        name: item.name,
        price: formatCurrency(item.price),
        quantity: item.quantity,
        total: formatCurrency(item.price * item.quantity),
      }))
    );

    const total = computed(() => {
      return cartItems?.reduce((acc, obj) => obj.price * obj.quantity + acc, 0);
    });

    const printItems = () => {
      print(formattedItems.value, receiptDetails, total.value || 0);
    };

    return { cartItems, total, formatCurrency, printItems };
  },
});
</script>
