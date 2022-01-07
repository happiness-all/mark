<template>
  <span ref="menu" :class="{menu: true, menuFont: menuType === 'font'}" :style="{zIndex: zIndex, top: location[0], left:location[1]}"
    @touchstart="touchDown" @touchmove.prevent="touchMove" @touchend="touchEnd">
    <span v-if="menuType == 'font'" class="menu-font">{{ menuFont }}</span>
    <img v-else-if="menuType == 'icon'" :src="menuIcon" alt="">
  </span>
</template>

<script>
import {monitorMenu} from './drag-menu-monitor'

export default {
  props: {
    zIndex: {type: String, default: '99'},
    menuType: {type: String, default: 'font'},    //font, icon
    menuIcon: String,
    menuFont: {type: String, default: 'DEMO'},
    stopMove: {type: Boolean, default: false},
    name: {type: String, default: 'demo'},        // 必传 尤其是多个按钮的时候
  },
  data() {
    return {
      location: ['20px', '50px'],
      monitorMenu: new monitorMenu(this.name)
    }
  },
  mounted() {
    // 计算按钮位置
    this.calcMenuLocation();
    // 给插件元素，便于计算
    this.monitorMenu.setElement(this.$refs.menu)
  },
  methods: {
    calcMenuLocation() {
      this.location = [...this.monitorMenu.location];
      let el = this.$refs.menu;
      el.style.top  = this.location[0];
      el.style.left = this.location[1];
    },
    touchDown(e) {
      this.monitorMenu.domTouchStart(e);
    },
    touchMove(e) {
      if (this.stopMove) return;
      this.monitorMenu.domTouchMove(e);
      this.calcMenuLocation();
    },
    touchEnd(e) {
      let isClick = this.monitorMenu.domTouchEnd(e);
      if (isClick) this.$emit('click');
    }
  },
}
</script>

<style lang="less" scoped>
@menu-size: 1.388rem; @menu-font-size:.555556rem;
.menu{position:fixed;
  width:@menu-size; height:@menu-size; border-radius:50%; font-size:@menu-font-size;
  display:flex; justify-content:center; align-items:center;
  img{width:100%}
}

.menuFont{ background:#7fd86f; color:#fff;
  &::before{content:''; display:block; width:90%; height:90%; border-radius:50%; border:1px solid #8ca788;
    position:absolute; top:3%; left:3%;
  }
}
</style>
