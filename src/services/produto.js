import { http } from "./api";

export default {
    listar: () => {
        return http.get("produtos/");
    },

    buscar: () => {
        return http.get("/search?coditions=nome:=:");
    },


    salvar: (produto) => {
        return http.post("produtos/", produto);
    },


    atualizar: (produto) => {
        return http.put(`produtos/${produto.id}`, produto);
    },

    apagar: (produto) => {
        return http.delete(`produtos/${produto.id}`, { data: produto })
    }

};