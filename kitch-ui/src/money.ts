export enum Currency {
    AUD = 'AUD',
}

export interface MoneyJson {
    currency: Currency,
    whole: number,
    decimal: number
}

export class Money {

    constructor(
        public currency: Currency,
        public whole: number,
        public decimal: number
    ) { }

    public static fromString(value: string) {
        const parts = value.split(".");
        return new Money(Currency.AUD, Number(parts[0]), Number(parts[1]));
    }

    public toString(includeCurrency?: boolean) {
        const { currency, whole, decimal } = this;
        return `${includeCurrency ? currency : ''}${whole}.${String(decimal).padStart(2, "0")}`;
    }

    public static fromJSON(obj: MoneyJson) {
        const { currency, whole, decimal } = obj;
        return new Money(currency, whole, decimal);
    }

    public toJSON(): MoneyJson {
        const { currency, whole, decimal } = this;
        return { currency, whole, decimal };
    }
}