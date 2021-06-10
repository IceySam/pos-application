<template>
  <div class="features_items row">
    <div class="col-sm-12">
      <h2 class="title text-center">Products</h2>
      <div class="search_box pull-right">
        <input type="text" class="w-100 mb-4" placeholder="Search Product" />
      </div>
    </div>

    <div
      class="col-sm-4 col-md-4 col-lg-3"
      v-for="item in products"
      :key="item.id"
    >
      <item-block :item="item" @item-selected="addToCart" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject } from "vue";
import ItemBlock from "@/components/ItemBlock.vue";
import { useCart } from "@/services/item.repository.service";
export default defineComponent({
  components: { ItemBlock },
  setup() {
    const { products } = useCart();
    const addToCart = inject("addToCart");
    return { products, addToCart };
  },
});
</script>
