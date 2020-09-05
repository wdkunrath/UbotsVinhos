import React, { useMemo } from 'react';

import dolarImg from '../../assets/dolar.svg';

import { IWalletBoxProps } from '../../interfaces/ICompomponentes';
import { Container }  from './styles';

const WalletBox: React.FC<IWalletBoxProps> = ({
    title,
    amount,
    footerlabel,
    icon,
    color
}) => {

    const iconSelected = useMemo(() => {
        switch (icon) {
            case 'dolar':
                return dolarImg;
            default:
              return undefined;
        }
    },[icon]);

    return (
        <Container color={color}>
            <span>{title}</span>
            <h1>
                <strong>{amount}</strong>               
            </h1>
            <small>{footerlabel}</small>
            <img src={iconSelected} alt={title} />
        </Container>
    );
}

export default WalletBox;