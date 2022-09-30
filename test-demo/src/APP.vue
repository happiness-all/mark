<template>
  <div id="app">
    <Editor />

     <div>当前选择的角色id： {{ roleIds }}</div>
    <hr />

    <div v-if="$refs.roleSelectorRef">
      当前选择的角色： {{ $refs.roleSelectorRef.getSelectedRoles() }}
    </div>

    <RoleSelection ref="roleSelectorRef" v-model="roleIds" :http-config="httpConfig" />
  </div>
  <!--     "role-selection": "git+https://codehub-dg-y.huawei.com/qwx886945_self/role-selection.git", -->
</template>
<script>
import Editor from '@/components/tinymce-editor/editor-index'

export default {
  name: 'App',
  components: {
    Editor
  },
  data() {
    return {
      roleIds: [],
      httpConfig: {
        headers: {
          'gc-authentication': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJmYTc4MTUxNy04YjUzLTRjYzgtYTc0My05NGE3MDNkYWYyOWUiLCJleHAiOjE2NjQzMzI2Njh9.u_ETBJeQB6gnG2qH_9Eh6FNt9iUMAjD24i6eMCXQp0aRZojXdL4DMbTNLFvGPfez9w6ONkOoaFoOBeL9u2Vzeg'
        }
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
