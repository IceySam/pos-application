<template>
  <div class="p-3">
    <div class="row">
      <!-- top -->
      <div class="col-md-12">
        <header-nav />
        <alert-bar v-if="hasError" :message="error" />
      </div>

      <!-- down -->
      <div class="col-md-12">
        <section id="cart_items" class="col-sm-12">
          <!-- search by reciept code -->
          <div>
            <h2 class="title text-center">Sales</h2>
            <input
              type="text"
              v-model="search"
              class="w-100 mb-4 form-control"
              placeholder="Search by Reciept Code"
            />
          </div>
          <!-- table -->
          <div class="table-responsive cart_info">
            <table class="table table-condensed">
              <thead>
                <tr class="cart_menu">
                  <td class=""><small>#</small></td>
                  <td class="description"><small>Item</small></td>
                  <td class="price"><small>Price</small></td>
                  <td class="quantity"><small>Quantity</small></td>
                  <td class="total"><small>Total</small></td>
                  <td class="receipt"><small>Payment Method</small></td>
                  <td class="receipt"><small>Receipt Code</small></td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in sales" :key="index">
                  <td class="">
                    <span class="text-muted">{{ `${index + 1}.` }}</span>
                  </td>
                  <td class="">
                    <span class="text-muted">{{ item.product.name }}</span>
                  </td>
                  <td class="app-color">
                    <span>{{ formatCurrency(item.product.price) }}</span>
                  </td>
                  <td class="">
                    <span class="text-muted">{{ item.quantity }}</span>
                  </td>
                  <td class="">
                    <span class="app-color">
                      {{ formatCurrency(item.total) }}
                    </span>
                  </td>
                  <td class="">
                    <span class="app-color">
                      {{ item.payment_method.name }}
                    </span>
                  </td>
                  <td class="">
                    <span class="app-color">
                      {{ item.receipt }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useCart } from "@/services/cart.service";
import useCurrency from "@/services/currency.service";
import HeaderNav from "./HeaderNav.vue";
import useAuth from "@/services/auth.service";

export default defineComponent({
  components: {
    HeaderNav,
  },
  setup() {
    const search = ref("");
    const { formatCurrency } = useCurrency();
    const localItems = ref([]);
    const { error, hasError, sales, setSales } = useCart();
    const { user } = useAuth();

    // get all sales
    setSales(Number(user.salesId));

    return { sales, error, hasError, localItems, formatCurrency, search };
  },
});
</script>
