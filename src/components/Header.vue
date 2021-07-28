<template>
  <header id="header">
    <button class="button-novo" @click="toggleNovoModal">+ Novo</button>

    <button class="button-excluir fa fa-trash" deletar="prod">Excluir</button>

    <Modal v-if="showModal" @close="toggleNovoModal">
      <div class="titulo">
        <h2>Detalhe do Produto</h2>
        <button class="button-x" @click="toggleNovoModal">X</button>
      </div>
      <form @submit.prevent="salvar">
        <div class="forProduto">
          <label for="">Nome </label>
          <input class="inputNome" type="text" v-model="produto.nome" /> <br />
        </div>

        <label for="">Descrição </label>
        <textarea v-model="produto.descricao"></textarea><br />

        <label>Status</label>
        <select v-model="produto.status">
          <option disabled value="">Selecione o status</option>
          <option value="Em Estoque">Em Estoque</option>
          <option value="Estoque Esgotado">Estoque Esgotado</option>
        </select>

        <label class="categoria-label">Categoria </label>
        <div class="categoria">
          <div class="categoria-1-2">
            <span
              ><input
                type="radio"
                id="1"
                value="categoria 1"
                v-model="produto.categoria"
              />
              Categoria 1</span
            >
            <span
              ><input
                type="radio"
                id="2"
                value="categoria 2"
                v-model="produto.categoria"
              />
              Categoria 2</span
            >
          </div>
          <div class="categoria-3-4">
            <span
              ><input
                type="radio"
                id="3"
                value="categoria 3"
                v-model="produto.categoria"
              />
              Categoria 3</span
            >

            <span
              ><input
                type="radio"
                id="4"
                value="categoria 4"
                v-model="produto.categoria"
              />
              Categoria 4</span
            >
          </div>
        </div>

        <div class="preco-qtd">
          <div>
            <label for="">Preço </label>
            <input class="input-preco" type="text" v-model="produto.preco" />
            <br />
          </div>
          <div>
            <label for="">Quantidade </label>
            <input class="input-qtd" type="text" v-model="produto.quantidade" />
            <br />
          </div>
        </div>

        <div class="botao">
          <button class="button-cancelar" @click="toggleNovoModal">
            X Cancelar
          </button>
          <button class="button-salvar" type="submit">V Salvar</button>
        </div>
      </form>
    </Modal>
  </header>
</template>

<script>
import Produto from "../services/produto";
import Modal from "../components/Modal.vue";

export default {
  name: "Header",
  components: { Modal },
  data() {
    return {
      produto: {
        nome: "",
        descricao: "",
        preco: "",
        quantidade: "",
        categoria: "",
        status: "",
      },

      showModal: false,
    };
  },

  mounted() {
    this.listar();
  },

  methods: {
    listar() {
      Produto.listar().then((resposta) => {
        this.produtos = resposta.data;
      });
    },

    salvar() {
      Produto.salvar(this.produto).then((resposta) => {
        alert("salvo com sucesso!");
        console.log(resposta);
        this.listar();
      });
    },

    toggleNovoModal() {
      this.showModal = !this.showModal;
      console.log("Modal salvar");
      if (this.showModal === false) {
        return this.listar();
        //this.listar();
      }
    },
  },
};
</script>

<style scoped>
#header {
  display: flex;
  width: 95%;
  margin-top: 10px;
  justify-content: flex-start;
  align-items: center;
  height: 50px;
  background: #e9e9e9;
  border: 1px solid rgb(184, 183, 183);
}
#header a {
  text-decoration: none;
  font-size: 30px;
  color: #fff;
  cursor: pointer;
}

.button-novo {
  cursor: pointer;
  border: 0;
  background: #689f38;
  padding: 6px 20px;
  margin: 10px;
  border-radius: 5px;
  color: #fff;
}

.button-excluir {
  cursor: pointer;
  border: 0;
  background: #e28080;
  padding: 9.5px 18px;
  margin: 10px;
  border-radius: 5px;
  color: #fff;
}

form {
  width: 100%;
  flex-direction: column;
}

textarea {
  width: 500px;
  height: 80px;
}

/* ------------------------------button do modal------------------------------------ */
.botao {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 35px;
}
.button-salvar {
  cursor: pointer;
  display: flex;
  border: none;
  color: rgb(67, 169, 246);
  background: rgb(255, 255, 255);
}

.button-cancelar {
  cursor: pointer;
  display: flex;
  border: none;
  color: rgb(59, 158, 235);
  background: rgb(255, 255, 255);
}
.button-x {
  cursor: pointer;
  display: flex;
  border: none;
  color: rgb(0, 0, 0);
  background: rgb(255, 255, 255);
}
/* ------------------------------------------------------------------ */

.inputNome {
  width: 500px;
  height: 30px;
}

form label {
  display: flex;
  font-size: 17px;
  height: 30px;
  margin-top: 10px;
}

select {
  width: 500px;
  height: 30px;
}

.categoria-label {
  margin-bottom: 10px;
}

.categoria {
  display: table;
}

.categoria-1-2 {
  display: flex;
}

.categoria-3-4 {
  display: flex;
}

form span {
  display: table;
  margin: 0px 0px 20px;
  width: 250px;
}

/* ------------------------------------------------------preço e quantidade--------------------------------------- */
.preco-qtd {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.input-preco {
  display: flex;
  width: 250px;
  height: 30px;
}

.input-qtd {
  display: flex;
  width: 80%;
  height: 30px;
}

.titulo {
  display: flex;
  justify-content: space-between;
}
</style>>
