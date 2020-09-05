import React from 'react';

import { Container }  from './styles';
import { IHistoryClienteCardProps } from '../../interfaces/ICompomponentes';

const HistoryClienteCard: React.FC<IHistoryClienteCardProps> = ({
    title,
    subtitle
}) => (
    <Container>
        <div>
            <span>{title}</span>
            <small>{subtitle}</small>
        </div>
    </Container>
);


export default HistoryClienteCard;