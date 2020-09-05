
export interface IWalletBoxProps {
    title: string;
    amount: string | number;
    footerlabel: string;
    icon: 'dolar';
    color: string;
}

export interface ISelectInputProps {
    options: {
        value: string | number;
        label: string | number;
    }[],    
    onChange(event: React.ChangeEvent<HTMLSelectElement>): void | undefined;
    defaultValue?: string | number;
}

export interface IToggleProps {
    labelLeft: string;
    labelRight: string;
    checked: boolean;
    onChange(): void;
}

export interface IContentHeaderProps {
    title: string;
    lineColor: string;
    children: React.ReactNode;
}

export interface IHistoryClienteCardProps {
    title: string;
    subtitle: string;
}

export interface IHistoryFinanceCardProps {
    tagColor: string;
    title: string;
    subtitle: string | number;
    amount: number;
}