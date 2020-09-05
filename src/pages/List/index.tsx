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
    const [fieis, setFieis] = useState<IFieis[]>([]);
    const [clientes, setCliente] = useState<ICliente[]>([]);
    const [teste,setTeste] = useState('');

    useMemo(()=>{
        const requestApi = async () => {
            const resultC = await ListService.getClientes(); 
            setData(resultC.data);
        }
        requestApi();
    },[setData]);

    useMemo(()=>{
        const requestApi = async () => {
            const result = await ListService.getCompras(); 
            let ordenado = result.data.sort((a:any, b:any) => (a.valorTotal > b.valorTotal) ? -1 : 1 );
            setCompras(ordenado);
        }
        requestApi();
    },[setCompras]);
    
    useEffect(()=>{
        const requestApi = async () => {
            let array:ICliente[] = [];
            compras.map((item:ICompras)=>{
                data.map((element:IData) => {
                    if(element.cpf.replace('-','.')===item.cliente.substr(1)){
                        array.push(element);
                    }
                })
            })
            
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

    },[data,setCliente]);

    useEffect(()=>{
        const requestApi = async () => {
            let array:IFieis[] = [];
            const contaFrequencia = (item:ICompras, element:IData) =>{
                var i = 0;                
                array.push({
                    clienteNome: element.nome,
                    valorTotalComprado: item.valorTotal,
                    totalItensComprados: item.itens.length,
                    ocorrenciaCompra: i++
                });
            }

            compras.map((item)=>{
                data.map((element)=>{
                    setTeste('teste');
                    if(element.cpf.replace('-','.')===item.cliente.substr(1)){
                        contaFrequencia(item,element);
                    } 
                });
            });

            let reduced: IFieis[] =[];
            array.forEach((item) => {
                let duplicated  = reduced.findIndex(redItem => {
                    return {
                        clienteNome: redItem.clienteNome,
                        valorTotalComprado: redItem.valorTotalComprado,
                        totalItensComprados: redItem.valorTotalComprado,
                        ocorrenciaCompra: redItem.ocorrenciaCompra +1
                    }
                }) > -1;
            
                if(!duplicated) {
                    reduced.push(item);
                }
            });            

            setFieis(reduced);
        }
        requestApi();
    },[setFieis,setTeste]);

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
    console.log(teste);

    return (
        <Container>
            <ContentHeader title={pageData?.title} lineColor={pageData?.lineColor}>                
            </ContentHeader>

            <Content>
                {movimentType === 'clientes' ? (
                    clientes.map((item, i) => (
                        <HistoryClienteCard 
                            key={i}
                            title={item.nome}
                            subtitle={item.cpf}
                        />
                    ))
                ):(
                    <>
                    {movimentType === 'vinhos' ? (
                        compras.map((item, i )=> (
                            <HistoryFinanceCard
                                key={i}
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