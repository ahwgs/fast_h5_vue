<script>
import defaultSetting from '../setting'
export default {
  name: 'RouteView',
  props: {
    keepAlive: {
      type: Boolean,
      default: true
    },
    pageTrans: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  render() {
    const { pageTrans } = defaultSetting
    const {
      $route: { meta }
    } = this

    const inKeep =
            pageTrans || this.pageTrans ? (
              <transition>
                <keep-alive>
                  <router-view />
                </keep-alive>
              </transition>
            ) : (
              <keep-alive>
                <router-view />
              </keep-alive>
            )
    const notKeep =
            pageTrans || this.pageTrans ? (
              <transition>
                <router-view />
              </transition>
            ) : (
              <router-view />
            )

    return this.keepAlive || meta.keepAlive ? inKeep : notKeep
  }
}
</script>
