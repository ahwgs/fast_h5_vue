/**
 * @Description: 按需引入vant
 * @author ahwgs
 * @date 2019/11/8
 */

// 需要引入vant的组件在这里添加
import Vue from "vue";

import { Button, Cell, Icon, Image, Lazyload, Popup, AddressEdit } from "vant";

Vue.use(Button);
Vue.use(Cell);
Vue.use(Icon);
Vue.use(Image);
Vue.use(Lazyload);
Vue.use(Popup);
Vue.use(AddressEdit);
