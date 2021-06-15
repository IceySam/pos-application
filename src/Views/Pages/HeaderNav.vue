<template>
  <div class="row mb-3">
    <div class="col-md-7">
      <div class="shop-menu clearfix pull-left">
        <ul class="nav">
          <li>
            <h4 class="app-color">Happiness Eatery Service</h4>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-md-5 clearfix">
      <div class="shop-menu clearfix pull-right">
        <ul class="nav">
          <router-link :to="{ name: 'Workspace' }">
            <span class="btn"><font-awesome-icon icon="home" /> Home</span>
          </router-link>
          <router-link :to="{ name: 'Sales' }">
            <span class="btn"><font-awesome-icon icon="star" /> Sales</span>
          </router-link>
          <li @click="() => {}">
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
import { defineComponent } from "vue";
export default defineComponent({
  components: {},
  setup() {
    const { logout } = useAuth();
    return { logout };
  },
});
</script>
