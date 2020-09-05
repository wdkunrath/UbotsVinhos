export interface IRouteParams {
    match: {
        params: {
            type: string;
        }
    }
}

export interface IData {
    id: number | string;
    nome: string;
    cpf: string;
}

export interface ICliente {
    id: number | string;
    nome: string;
    cpf: string;
}

export interface ICompras{    
    codigo: string;
    data: string;
    cliente: string;
    itens: 
        {
        produto: string;
        variedade: string;
        pais: string;
        categoria: string;
        safra: number| string;
        preco: number;
        }[];
    valorTotal: number;
}

export interface IFieis{
    clienteNome: string;
    valorTotalComprado: number;
    totalItensComprados: number;
    ocorrenciaCompra: number;
}
