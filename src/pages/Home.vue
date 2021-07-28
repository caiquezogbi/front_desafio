<template>
  <div id="home">
    <div>
      <h3>Gerenciar Produto</h3>
    </div>

    <form @submit="pesquisar" class="pesquisar">
      <input type="text" placeholder="Nome do produto..." />
      <button type="submit" class="fa fa-search">Pesquisar</button>
    </form>
  </div>
</template>

<script>
import Produto from "../services/produto";
export default {
  name: "Home",
  components: {},

  methods: {
    pesquisar() {
      Produto.buscar().then((resposta) => {
        this.produtos = resposta.data;
      });
    },
  },
};
</script>

<style scoped>
#home {
  display: flex;
  width: 95%;
  margin-top: 10px;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  background: #e9e9e9;
}

h3 {
  display: flex;
  margin: 10px;
  font-family: sans-serif;
  justify-content: space-around;
  align-items: center;
  font-size: 25px;
}

.pesquisar {
  margin: 15px;
  flex-direction: row;
}

input {
  border: 2px solid rgb(185, 185, 185);
  padding: 1px;
  font-size: 15px;
  outline: none;
}

button {
  cursor: pointer;
  border: 0;
  background: #689f38;
  padding: 6px 20px;
  border-radius: 3px;
  color: #fff;
}
</style>