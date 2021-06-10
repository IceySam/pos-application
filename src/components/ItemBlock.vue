<template>
  <div class="product-image-wrapper">
    <div class="single-products">
      <div class="productinfo text-center">
        <img
          v-if="localItem.image === undefined"
          src="@/assets/Floral-Dolphin.svg"
          width="70"
          height="50"
        />
        <img v-else :src="localItem.image" width="70" height="50" alt="" />
        <h6>{{ formatCurrency(item.price) }}</h6>
        <p>{{ localItem.name }}</p>
        <a
          href="#"
          @click="$emit('item-selected', localItem)"
          class="btn btn-default add-to-cart"
        >
          <font-awesome-icon icon="shopping-cart" />
          <span>Add to cart</span></a
        >
      </div>
      <div class="product-overlay">
        <div class="overlay-content">
          <p class="m-0">{{ localItem.name }}</p>
          <!-- <p>{{ formatCurrency(item.price) }}</p> -->
          <p class="mt-0">{{ `In stock: ${localItem.inStock}` }}</p>
          <small>Qty: </small>
          <input
            v-model="localItem.quantity"
            class="w-50 h-25 rounded mb-2"
            type="number"
          />
          <span
            @click="$emit('item-selected', localItem)"
            class="btn btn-default add-to-cart h-25 rounded"
          >
            <font-awesome-icon icon="shopping-cart" />
            <span>Add to cart</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import useCurrency from "@/services/currency.service";
export default defineComponent({
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { formatCurrency } = useCurrency();
    const localItem = reactive(props.item);
    return { localItem, formatCurrency };
  },
});
</script>
