import { Axios } from './Axios';

const ListService = {
    getClientes: async () =>{
        const result = await Axios.get('598b16291100004705515ec5')
        .then(({ ...response }) => {
            return response;
        })
        .catch(({ response }) => {
            return response;
          });

        return result;
    },
    getCompras: async () =>{
        const result = await Axios.get('598b16861100004905515ec7')
        .then(({ ...response }) => {
            return response;
        })
        .catch(({ response }) => {
            return response;
          });

        return result;
    }
};

export default ListService;