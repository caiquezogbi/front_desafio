<template>
  <div id="produtos">
    <table>
      <thead>
        <tr>
          <td>
            <input type="checkbox" v-model="selectAll" />
          </td>
          <th>
            Codigo -
            <a class="button-seta" v-on:click="doSort('codigo')"
              ><img src="../assets/seta.png" alt="" />
              <span v-if="sort.field == 'id'">({{ sort.desc }})</span>
            </a>
          </th>

          <th>
            Nome -
            <a class="button-seta" v-on:click="doSort('nome')"
              ><img src="../assets/seta.png" alt="" /><span
                v-if="sort.field == 'name'"
                >({{ sort.desc }})</span
              ></a
            >
          </th>
          <th>
            Preço -
            <a class="button-seta" v-on:click="doSort('preco')"
              ><img src="../assets/seta.png" alt="" /><span
                v-if="sort.field == 'leave'"
                >({{ sort.desc }})</span
              ></a
            >
          </th>
          <th>
            Categoria -
            <a class="button-seta" v-on:click="doSort('Categoria')"
              ><img src="../assets/seta.png" alt="" /><span
                v-if="sort.field == 'leave'"
                >({{ sort.desc }})</span
              ></a
            >
          </th>
          <th>
            Status -
            <a class="button-seta" v-on:click="doSort('Status')"
              ><img src="../assets/seta.png" alt="" /><span
                v-if="sort.field == 'leave'"
                >({{ sort.desc }})</span
              ></a
            >
          </th>

          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="produto in sortedData" :key="produto.id">
          <td>
            <input type="checkbox" :value="produto.id" v-model="selected" />
          </td>
          <td>{{ produto.id }}</td>
          <td>{{ produto.nome }}</td>
          <td>{{ produto.preco }}</td>
          <td>{{ produto.categoria }}</td>
          <td>{{ produto.status }}</td>
          <td>
            <button class="button-alterar" @click="editar(produto)">
              <img src="../assets/lapis.png" alt="" />
            </button>
            <button
              class="button-excluir fa fa-trash"
              @click="remover(produto)"
            ></button>
          </td>
        </tr>
      </tbody>
    </table>

    <EditarModal v-if="showModal" @close="toggleEditarModal">
      <form @submit.prevent="salvar">
        <div class="forProduto">
          <label for="">Nome </label>
          <input class="inputNome" type="text" v-model="produto.nome" />
          <br />
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
          <button class="button-cancelar" @click="toggleEditarModal">
            X Cancelar
          </button>
          <button class="button-salvar" type="submit">V Salvar</button>
        </div>
      </form>
    </EditarModal>
  </div>
</template>





<script>
import Produto from "../services/produto";
import EditarModal from "../components/EditarModal.vue";

export default {
  nome: "Produtos",

  components: { EditarModal },
  data() {
    return {
      produtos: [], //apresentação dos produtos
      selected: [], //apresentação dos checkbox marcados
      showModal: false, // verificador modal editar

      //ordenação
      sort: {
        field: "",
        desc: true,
      },
    };
  },

  mounted() {
    this.listar(); //apresentação da lista de produtos automaticamente
  },

  computed: {
    //ordenação
    sortedData() {
      if (!this.sort.field) {
        return this.produtos;
      }
      return this.produtos.concat().sort((a, b) => {
        if (this.sort.desc) {
          return a[this.sort.field] > b[this.sort.field] ? -1 : 1;
        } else {
          return a[this.sort.field] > b[this.sort.field] ? 1 : -1;
        }
      });
    },

    selectAll: {
      //get e set dos checkbox marcados
      get() {
        if (this.produtos && this.produtos.length > 0) {
          //Uma array de produtos existe com pelo menos um item
          let allChecked = true;
          for (const produto of this.produtos) {
            if (!this.selected.includes(produto.id)) {
              allChecked = false; // Se pelo menos um não estiver incluído no array
            }
            // Saia do loop se a incompatibilidade já for encontrada
            if (!allChecked) break;
          }
          return allChecked;
        }
        return false;
      },
      set(value) {
        const checked = [];
        if (value) {
          this.produtos.forEach((produto) => {
            checked.push(produto.id);
          });
        }
        this.selected = checked;
      },
    },
  },

  methods: {
    doSort(field) {
      if (field == this.sort.field) {
        this.sort.desc = !this.sort.desc;
      } else {
        this.sort.field = field;
        this.sort.desc = true;
      }
    },

    //metodo pesquisar que nao consegui fazer funcionar
    pesquisar() {
      Produto.buscar().then((resposta) => {
        this.procurar = resposta.data;
      });
    },

    //metodo verifcação para abrir  modal editar
    toggleEditarModal(produto) {
      this.showModal = !this.showModal;
      console.log(produto);
      console.log("modal Editar");
    },

    salvar() {
      if (!this.produto.id) {
        Produto.salvar(this.produto).then((resposta) => {
          alert("salvo com sucesso!");
          console.log(resposta);
          this.listar();
        });
      } else {
        Produto.atualizar(this.produto).then((resposta) => {
          this.produto = {};
          console.log(resposta);

          this.listar();
        });
      }
    },

    editar(produto) {
      this.showModal = !this.showModal;
      this.produto = produto;
    },

    listar() {
      Produto.listar().then((resposta) => {
        this.produtos = resposta.data;
      });
    },

    remover(produto) {
      if (confirm("Você deseja realmente excluir o Produto?")) {
        Produto.apagar(produto).then((resposta) => {
          console.log(resposta);
          this.listar();
        });
      }
    },

    // remover todos os produtos marcados no checkbox que nao consegui fazer funcionar
    removerSelecionado(selected) {
      if (confirm("Você deseja realmente excluir os Produtos selecionados?")) {
        for (const index of this.selected) {
          Produto.apagar(selected).then((resposta) => {
            console.log(resposta, index);
            this.listar();
          });
        }
      }
    },
  },
};
</script>

<style scoped>
#produtos {
  display: flex;
  width: 96%;
  justify-content: space-between;
  align-items: center;
  margin: -8px;
}

button.page-link {
  display: inline-block;
}
button.page-link {
  font-size: 20px;
  color: #29b3ed;
  font-weight: 500;
}
.offset {
  width: 500px !important;
  margin: 20px auto;
}

table {
  width: 100%;
  margin: 10px;
  margin-bottom: 99px;
  font-family: arial, sans-serif;
  border-collapse: collapse;
}
thead {
  background: #e9e9e9;
  width: 100%;
  margin: 30px;
}

tbody tr td {
  border-bottom: 2px solid rgb(206, 204, 204);
  padding: 0px;
}
img {
  width: 20px;
  margin: -5px;
  color: #fff;
}

td {
  padding: 10px;
  text-align: center;
}
th {
  padding: -8px;
  text-align: center;
}

tr {
  padding: -8px;
  text-align: left;
}

.button-alterar {
  cursor: pointer;
  border: 0;
  padding: 6px 20px;
  margin: 10px;
  border-radius: 50%;
  display: inline-block;
  height: 50px;
  width: 50px;
  background-color: #689f38;
  color: #fff;
}

.button-excluir {
  cursor: pointer;
  border: 0;
  padding: 20px 18px;
  margin: 0px;
  border-radius: 50%;
  display: inline-block;
  height: 50px;
  width: 50px;
  background-color: #fbc02d;
}

/* -------------------------------------------------modal --------------------- */
form {
  width: 100%;
  flex-direction: column;
}

textarea {
  width: 500px;
  height: 80px;
}

/* ------------------------------button  modal------------------------------------ */
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

.button-seta {
  cursor: pointer;
}
</style>