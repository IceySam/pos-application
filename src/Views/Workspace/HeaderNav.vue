<template>
  <div class="row mb-3">
    <div class="col-md-8">
      <div class="shop-menu clearfix pull-left">
        <ul class="nav">
          <li>
            <a href=""><font-awesome-icon icon="home" /> Home</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-md-4 clearfix">
      <div class="shop-menu clearfix pull-right">
        <ul class="nav">
          <!-- <li>
            <info-bar />
          </li> -->
          <li>
            <a href=""><font-awesome-icon icon="crosshairs" /> Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// import InfoBar from "@/components/InfoBar.vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: {},
});
</script>

InfoBar
