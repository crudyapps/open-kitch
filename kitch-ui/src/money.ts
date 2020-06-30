export enum Currency {
    AUD = 'AUD',
}

export class Money {

    constructor(
        public currency: Currency,
        public whole: number,
        public decimal: number
    ) { }

    public toString(includeCurrency?: boolean) {
        const { currency, whole, decimal } = this;
        return `${includeCurrency ? currency : ''}${whole}.${decimal}`;
    }
}