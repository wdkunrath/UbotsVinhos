import React from 'react';

import { Container, Tag }  from './styles';
import { IHistoryFinanceCardProps } from '../../interfaces/ICompomponentes';

const HistoryFinanceCard: React.FC<IHistoryFinanceCardProps> = ({
    tagColor,
    title,
    subtitle,
    amount
}) => (
    <Container>
        <Tag color={tagColor} />
        <div>
            <span>{title}</span>
            <small>Qnt. de itens comprados: {subtitle}</small>
        </div>        
        <h3>R$ {amount}</h3>
    </Container>
);


export default HistoryFinanceCard;