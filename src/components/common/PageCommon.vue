<template>
    <div>
        <x-header></x-header>
        <aside>
            <div class="left-wrap">
                <x-menu   ref="menu"></x-menu>
            </div>
        </aside>
        <div class="right-wrap">
            <transition name="slide-left">
                <router-view class="child-view" v-if="!$route.meta.keepAlive"></router-view>
                <keep-alive  v-if="$route.meta.keepAlive">
                    <router-view class="child-view"></router-view>
                </keep-alive>
            </transition>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import header from './header';
    import menu from "./menu";

    export default {
      components : {
          'x-header' : header,
          'x-menu'   : menu,
      },
      data () {
        return {

        }
      },
      computed: mapState({
        'stateObject' : state => state.stateObject //简写。完整的:this.$store.state.stateObject访问
      }),
  }
</script>

<style scoped>

</style>
