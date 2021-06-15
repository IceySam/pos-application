<template>
  <div class="row mb-3">
    <div class="col-md-7">
      <div class="shop-menu clearfix pull-left">
        <ul class="nav">
          <router-link :to="{ name: 'Workspace' }">
            <span class="btn">
              <h4 class="app-color">
                <font-awesome-icon icon="home" /> Happiness Eatery Station
              </h4></span
            >
          </router-link>
        </ul>
      </div>
    </div>
    <div class="col-md-5 clearfix">
      <div class="shop-menu clearfix pull-right">
        <ul class="nav">
          <router-link :to="{ name: 'Sales' }">
            <span class="btn"><font-awesome-icon icon="star" /> Sales</span>
          </router-link>
          <li @click="closeAttendantShift">
            <span class="btn"
              ><font-awesome-icon icon="crosshairs" /> Close Shift</span
            >
          </li>
          <li @click="logout">
            <span class="btn"
              ><font-awesome-icon icon="crosshairs" /> Logout</span
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import useAuth from "@/services/auth.service";
import { useCart } from "@/services/cart.service";
import { useSwal } from "@/services/utils.service";
import { defineComponent } from "vue";
export default defineComponent({
  components: {},
  setup() {
    const { logout, user } = useAuth();
    const { closeShift } = useCart();
    const { confirm, popop } = useSwal();

    const closeAttendantShift = async () => {
      const result = await confirm();
      if (result) {
        const res = await closeShift(Number(user.salesId));
        if (res.success) {
          popop();
        }
      }
    }
    return { logout, closeAttendantShift };
  },
});
</script>
