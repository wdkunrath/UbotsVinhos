import React, { useState, useMemo } from 'react';
import ContentHeader from '../../components/ContentHeader';
import WalletBox from '../../components/WalletBox';
import ListService from '../../services/List';
import { IData, ICompras } from '../../interfaces/IPages';

import { 
    Container,
    Content, 
} from './styles';

const Dashboard: React.FC = () => {
    const [data, setData] = useState<IData[]>([]);
    const [maiorUnica, setMaiorUnica] = useState('');
    
    useMemo(()=>{
        const requestApi = async () => {
            const result = await ListService.getClientes(); 
            setData(result.data);            
        };        
        requestApi();
    },[setData]);
    
    useMemo(() =>{
        const requestApi = async () => {
            let result = await ListService.getCompras(); 
            let array:ICompras[] = [];
            result.data.map((item:ICompras)=>{
                if(item.data.substr(6) === "2016"){
                    if(item.itens.length === 1){
                        array.push(item);
                    }                 
                }
            });

            let max = Math.max.apply(Math, array.map(function(o) { return o.valorTotal; }));

            const recurso = (item:ICompras)=>{
                var x:string ='';
                for (let index = 0; index < data.length; index++) {
                    var cpf = item.cliente.substr(1);
                    if(data[index].cpf.replace('-','.') === cpf){
                        x = data[index].nome;
                    }      
                }
                return x;
            }

            array.map((item)=>{
                if(item.valorTotal === max){
                    let retorno:string = recurso(item);
                    setMaiorUnica(retorno);
                }
            });
        };

        requestApi();
    },[data]);
    
    return (
        <Container>
            <ContentHeader title="Dashboard" lineColor="#efa44b">
            </ContentHeader>

            <Content>
                <WalletBox 
                    title="Maior compra unica 2016."
                    color="#51918e"
                    amount={maiorUnica}
                    footerlabel="Cliente"
                    icon="dolar"
                />                
            </Content>
        </Container>
    );
}

export default Dashboard;