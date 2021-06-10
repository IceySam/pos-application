<template>
  <div class="left-sidebar">
    <h2>Category</h2>
    <div class="search_box pull-right">
      <input type="text" v-model="search" class="w-100" placeholder="Search" />
    </div>
    <div class="panel-group category-products">
      <div
        v-for="category in filteredCategories"
        :key="category.id"
        @click="
          $emit('item-selected', category.id);
          selectedCategory = category.id;
        "
        class="panel panel-default"
      >
        <div class="panel-heading btn">
          <small
            :class="`${
              selectedCategory === category.id ? 'text-info' : 'text-secondary'
            }`"
          >
            {{ category.name.toUpperCase() }}
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useCart } from "@/services/item.repository.service";
import { computed, defineComponent, ref } from "vue";

interface Category {
  id: number;
  name: string;
}
export default defineComponent({
  setup() {
    const search = ref("");
    const { selectedCategory, categories } = useCart();

    const filteredCategories = computed(() => {
      return categories.value.filter(
        (obj: Category) =>
          obj.name.toLowerCase().indexOf(search.value.toLowerCase()) > -1
      );
    });
    return { search, selectedCategory, categories, filteredCategories };
  },
});
</script>
