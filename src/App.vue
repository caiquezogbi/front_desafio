<template>
  <div id="app">
    <Header />
    <Home />
    <Produtos />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Produtos from "./pages/Produtos.vue";
import Home from "./pages/Home.vue";
export default {
  name: "App",
  components: {
    Header,
    Home,
    Produtos,
  },
};
</script>

<style scoped>
#app {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
