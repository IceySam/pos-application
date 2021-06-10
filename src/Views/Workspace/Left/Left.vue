<template>
  <div class="row">
    <!-- Category -->
    <section class="col-sm-4 col-md-3">
      <categories class="" />
    </section>

    <!-- Products -->
    <section class="col-sm-8 col-md-9">
      <product-list />
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProductList from "./ProductList.vue";
import Categories from "./Categories.vue";
export default defineComponent({
  components: { ProductList, Categories },
});
</script>
