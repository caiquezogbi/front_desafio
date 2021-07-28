<template>
  <div class="editarmodal">
    <div class="container">
      <div class="titulo">
        <h2>Detalhe do Produto</h2>
        <button class="button-x" @click="$emit('close')">X</button>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditarModal",

  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped>
.editarmodal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.editarmodal .container {
  position: relative;
  max-width: 600px;
  top: 10vh;
  bottom: 4vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.7);
  overflow: auto;
}

.close {
  cursor: pointer;
  background: #121212;
  padding: 4px 15px;
  color: #fff;
  position: absolute;
  top: 15px;
  left: 15px;
}

span {
  font-style: italic;
  font-weight: bold;
  color: #121212;
}

p {
  white-space: pre-wrap;
}

.titulo {
  display: flex;
  justify-content: space-between;
}

.button-x {
  cursor: pointer;
  display: flex;
  border: none;
  color: rgb(0, 0, 0);
  background: rgb(255, 255, 255);
}
</style>