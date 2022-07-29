export class monitorMenu {
  isClick   = false                                               // 判断是否点击事件
  offset    = []                                                  // 点击位置与元素偏移量
  _location = []                                                  // 元素位置
  el        = null                                                // 元素存储空间
  name      = name                                                // 实例名
  // 可移动边缘，可设置值为（【0-1】/0.3/'15rem'/'10px'）,规则为 0-1为百分比（）
  edge      = {left: 0, right: 0, top: '1.512rem', bottom: 0}
  calcEdge  = null                                                // 计算后的边缘参数

  constructor(name) {
    this.name = name
    this.initCache()
  }

  get elementWidth() { return this.element.offsetWidth }          // 元素宽度
  get elementHeight() { return this.element.offsetHeight }        // 元素高度
  get elementOffsetLeft() { return this.element.offsetLeft }      // 元素左侧偏移量
  get elementOffsetTop() { return this.element.offsetTop }        // 元素顶部偏移量
  get documentWidth() { return document.body.offsetWidth }        // 视窗宽度
  get documentHeight() { return document.body.offsetHeight }      // 视窗高度
  get rootFontSize() { return parseFloat(document.querySelector('html').style.fontSize)} //根字体大小
  /** 元素位置（附加px，便于渲染）
   * @readonly @returns ['15px', '15px']
   */
  get location() {
    let arr = [...this._location]
    arr = arr.map(m => m + 'px')
    return arr
  }
  /** 视窗边缘部分计算为px值
   * @readonly @returns {Object} {left: String, right: String, top: String, bottom: String}
   */
  get documentEdge() {
    if (this.calcEdge) return this.calcEdge;
    let __ = {left: null, right: null, top: null, right: null}

    for (const key in this.edge) {
      if (this.edge.hasOwnProperty(key)) {
        const item = String(this.edge[key])
        if (item > 1 || item.indexOf('px') !== -1) {
          __[key] = parseFloat(item)
        } else if (item.indexOf('rem')) {
          __[key] = parseFloat(item) * this.rootFontSize
        } else if (item >= 0 && item <= 1) {
          if (key === 'left' || key === 'right') __[key] = item * this.documentWidth
          else __[key] = item * this.documentHeight
        } else __[key] = item
      }
    }
    this.calcEdge = __;
    return __
  }

  setElement(el) { this.element = el }                            // 元素空间赋值

  initCache() {                                                   // 初始化取值，获取历史位置值
    let _cache = JSON.parse(window.sessionStorage.getItem('CQWGT_DRAG_MENU_LOCATION') || '{}')
    let cache = _cache[this.name] || []
    if (!cache.length) {
      cache[0] = (this.documentHeight * 0.88) - Object.keys(_cache).length * 60
      cache[1] = this.documentWidth * 0.82
    }
    this._location = cache
    this.setCache()
    return cache
  }

  setCache() {                                                    // set location and update Storage
    let cache = JSON.parse(window.sessionStorage.getItem('CQWGT_DRAG_MENU_LOCATION') || '{}')
    cache[this.name] = this._location
    window.sessionStorage.setItem('CQWGT_DRAG_MENU_LOCATION', JSON.stringify(cache))
  }

  domTouchStart(e) {                                              // eventListener touchStart
    e = e || window.event
    this.isClick = true
    this.offset = [
      e.touches[0].pageY - e.target.offsetTop - this.elementOffsetTop,
      e.touches[0].pageX - e.target.offsetLeft - this.elementOffsetLeft
    ]
  }

  domTouchMove(e) {                                               // eventListener touchMove
    e = e || window.event
    this.isClick = false
    let calcLocation = [e.touches[0].pageY - this.offset[0], e.touches[0].pageX - this.offset[1]]
    // 碰撞检测
    if (this.impactChecking(calcLocation)) {
      this._location = calcLocation
    }
    this.setCache()
  }

  domTouchEnd(e) {                                                // eventListener touchEnd
    e = e || window.event
    return this.isClick
  }

  impactChecking([EL_offset_top, EL_offset_left]) {                                     // 碰撞检测
    const elementLocation = {
      left: EL_offset_left, right: this.documentWidth - ( EL_offset_left + this.elementWidth ),
      top:  EL_offset_top,  bottom: this.documentHeight - ( EL_offset_top + this.elementHeight )
    };

    let isImpactLeft  = elementLocation.left < this.documentEdge.left
    let isImpactRight = elementLocation.right < this.documentEdge.right
    let isImpactTop   = elementLocation.top < this.documentEdge.top
    let isImpactBottom= elementLocation.bottom < this.documentEdge.bottom

    return !(isImpactLeft || isImpactRight || isImpactTop || isImpactBottom)
  }
}
