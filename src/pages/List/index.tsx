import React, { useMemo, useState, useEffect } from 'react'; 
import ContentHeader from '../../components/ContentHeader';
import HistoryClienteCard from '../../components/HistoryClienteCard';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import { IRouteParams, IData, IFieis, ICliente, ICompras } from '../../interfaces/IPages';
import ListService from '../../services/List';
import { 
    Container, 
    Content
} from './styles';

const List: React.FC<IRouteParams> = ({ match }) => {
    const [data, setData] = useState<IData[]>([]);
    const [compras, setCompras] = useState<ICompras[]>([]);
    const [fieis, setFieis] = useState<ICompras[]>([]);
    const [clientes, setCliente] = useState<ICliente[]>([]);
    
    useEffect(()=>{
        const requestApi = async () => {
            const resultC = await ListService.getClientes(); 
            setData(resultC.data);

            const result = await ListService.getCompras(); 
            let ordenado = result.data.sort((a:any, b:any) => (a.valorTotal > b.valorTotal) ? -1 : 1 );
            setCompras(ordenado);

            let array:ICliente[] = [];
            ordenado.map((item:ICompras)=>{
                data.map((element:IData) => {
                    if(element.cpf.replace('-','.')===item.cliente.substr(1)){
                        array.push(element);
                    }
                })
            })
            
            let comprado:ICompras[] = [];
            data.map((element:IData) => {
                ordenado.map((item:ICompras)=>{
                    if(element.cpf.replace('-','.')===item.cliente.substr(1)){
                        comprado.push(item);
                    }
                })
            })
            setFieis(comprado);

            let reduced: ICliente[] =[];
            array.forEach((item) => {
                let duplicated  = reduced.findIndex(redItem => {
                    return item.cpf === redItem.cpf;
                }) > -1;
            
                if(!duplicated) {
                    reduced.push(item);
                }
            });
           setCliente(reduced);


        };           

        requestApi();

    },[data,setCliente,setCompras,setData]);

    const movimentType = match.params.type;

    const pageData = useMemo(() => {
        switch (movimentType) {
            case 'clientes': return {
                    title: 'Clientes',
                    lineColor: '#51918e',
                    data: clientes
                }
            case 'vinhos':return {
                title: 'Compras',
                lineColor: '#973268',
                data: compras
            }
            case 'fieis':return {
                title: 'Clientes Fiéis',
                lineColor: '#F3D8E1',
                data: compras
            }        
            default: return {
                title: 'Em construção',
                lineColor: '#51918e',
                data: clientes
            }
        }     
    },[movimentType]);
    console.log(fieis);
    return (
        <Container>
            <ContentHeader title={pageData?.title} lineColor={pageData?.lineColor}>                
            </ContentHeader>

            <Content>
                {movimentType === 'clientes' ? (
                    clientes.map(item => (
                        <HistoryClienteCard 
                            key={item.id}
                            title={item.nome}
                            subtitle={item.cpf}
                        />
                    ))
                ):(
                    <>
                    {movimentType === 'vinhos' ? (
                        compras.map(item => (
                            <HistoryFinanceCard
                                key={item.cliente}
                                title={item.cliente}
                                subtitle={item.itens.length}
                                tagColor='#BFBFBF'
                                amount={item.valorTotal}
                            />
                        ))
                    ):(
                        <h1>Em construção</h1>
                    )}
                    </>
                )}     
            </Content>            
        </Container>
    );
}

export default List;