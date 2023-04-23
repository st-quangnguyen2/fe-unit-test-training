export type Discount = {
  quantityApplied: number;
  value: number;
}

export interface IProduct {
  id: string;
  name: string;
  price: number;
  discounts: Discount [];
};

export class Fruit implements IProduct {
  id: string;
  name: string;
  price: number;
  discounts: Discount [];
  
  constructor(product: IProduct) {
    this.id = product?.id || '';
    this.name = product?.name || '';
    this.price = product?.price || 0;
    this.discounts = product?.discounts || [];
  }

  getDiscountApplied(quantity: number): number {
    const discountApplied: number = this.discounts.reduce((acc, discount) => {
      return Math.max(acc, quantity >= discount.quantityApplied ? discount.value : 0);
    }, 0);
   return discountApplied;
  }
}

export type ProductsInfo = {
  [name: string]: IProduct;
};

export type Detail = {
  quantity: number;
  fruit: Fruit;
};

export type Details = Map<string, Detail>;

export class Order {
  private details: Details = null;
  private total = 0;
  private bill = [];
  
  constructor() {
    this.details = new Map<string, Detail>();
  }

  addFruit(fruit: Fruit, quantity: number): Details {
    if (!Number.isNaN(quantity)) {
      let currentQuantity = 0;
      if (this.details.has(fruit.id)) {
        currentQuantity = this.details.get(fruit.id).quantity;
      }
      this.details.set(fruit.id, {
        quantity: currentQuantity + quantity,
        fruit,
      });
    }
    this.calculate();
    return this.details;
  }

  updateFruit(fruit: Fruit, quantity: number): Details {
    if (!Number.isNaN(quantity)) {
      this.details.set(fruit.id, {
        quantity,
        fruit,
      });
    }
    this.calculate();
    return this.details;
  }

  removeFruit(id: string): Details {
    this.details.delete(id);
    this.calculate();
    return this.details;
  }

  getDetails(): Details {
    return this.details;
  }

  getDetail(id: string): Detail {
    return this.details.get(id);
  }

  clear(): void {
    this.details = new Map();
    this.total = 0;
    this.bill = [];
  }

  calculate(): number {
    this.total = 0;
    this.bill = [];
    this.details.forEach(({quantity, fruit}) => {
      let discountApplied = fruit.getDiscountApplied(quantity);
      const price = Math.round(fruit.price * quantity * (100 - discountApplied) / 100);
      this.total += price;
      this.bill.push({
        id: fruit.id,
        name: fruit.name,
        priceOne: fruit.price,
        quantity,
        discountApplied,
        price: price
      });
    });
    return Math.round(this.total);
  }

  getTotal(): number {
    return this.total;
  }

  getBill() {
    return this.bill;
  }
};
