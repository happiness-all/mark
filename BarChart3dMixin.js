export default {
  props: {
    // 占比 0 ~ 100
    percent: {
      type: Number,
      default: 0,
    },

    // 柱子的高度
    maxHeight: {
      type: Number,
      default: 120,
    },
  },
  computed: {
    currPercent() {
      return Math.min(100, this.percent);
    },
  },
};
