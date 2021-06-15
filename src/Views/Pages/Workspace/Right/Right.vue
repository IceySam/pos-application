<template>
  <cart :items="cartItems" />
  <div v-show="cartItems.length > 0" class="">
    <span class="form-control text-center">
      {{
        `Items: ${cartItems.length}, Total Amount:  ${formatCurrency(total)}`
      }}
    </span>
    <div class="d-flex justify-content-end">
      <select v-model="payment_method" class="form-control mt-auto w-50 mr-2">
        <option
          v-for="method in paymentMethods"
          :value="method.id"
          :key="method.id"
        >
          {{ method.name }}
        </option>
      </select>
      <button @click="sendToServer" class="btn btn-primary form-control w-50">
        <small>Process</small>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, reactive, ref } from "vue";
import Cart from "./Cart.vue";
import useCurrency from "@/services/currency.service";
import { useCart, usePrint } from "@/services/cart.service";
import { CartItem, ReceiptDetails } from "@/types";
import useAuth from "@/services/auth.service";
import { useSwal } from "@/services/utils.service";

export default defineComponent({
  components: { Cart },
  setup() {
    const payment_method = ref(1);
    const { formatCurrency } = useCurrency();
    const { print } = usePrint();
    const cartItems = inject<CartItem[]>("cartItems");
    const { user } = useAuth();
    const { postItems, setPaymentMethods, paymentMethods } = useCart();
    const { confirm } = useSwal();

    const { name, salesId } = user;

    const receiptDetails = reactive<ReceiptDetails>({
      name,
      company_name: "Happiness Eatery Service",
      company_email: "xxxxxx",
      company_address: "xxxxx",
      company_phone: +2340000000000,
    });

    // formatted for printing
    const formattedItems = computed(() =>
      cartItems?.map((item, index) => ({
        index: index + 1,
        name: item.name,
        price: formatCurrency(item.price),
        quantity: item.quantity,
        total: formatCurrency(item.price * item.quantity),
      }))
    );

    // formatted for sending to server
    const paymentItems = computed(() =>
      cartItems?.map((item) => ({
        product_id: item.id,
        price: item.price,
        qty: item.quantity,
        total_amount: item.price * item.quantity,
      }))
    );

    // set payment methods
    setPaymentMethods();

    const total = computed(() => {
      return cartItems?.reduce((acc, obj) => obj.price * obj.quantity + acc, 0);
    });

    const sendToServer = async () => {
      const result = await confirm();
      if (result) {
        const res = await postItems({
          salesID: salesId,
          items: paymentItems.value,
          payment_method: payment_method.value,
        });
        if (res.success) {
          printItems();
        }
      }
    };

    const printItems = () => {
      print(formattedItems.value, receiptDetails, total.value || 0);
    };

    return {
      cartItems,
      total,
      formatCurrency,
      payment_method,
      paymentMethods,
      sendToServer,
    };
  },
});
</script>
