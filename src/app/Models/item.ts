export class Item {
    constructor(
        public imgUrl: string,
        public price: number,
        public count: number,
        public inStock: boolean,
        public shop: any,
        public description: string

    ) {}
}
