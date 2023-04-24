import { ProductsInfo, Order, Fruit } from './order';

const fruitStorage: ProductsInfo = {
  apple: {
    id: 'FR0001',
    name: 'Apple',
    price: 5000,
    discounts: [
      {
        value: 5,
        quantityApplied: 1,
      },
      {
        value: 10,
        quantityApplied: 2,
      }
    ]
  },
  lemon: {
    id: 'FR0002',
    name: 'Lemon',
    price: 2000,
    discounts: [
      {
        value: 5,
        quantityApplied: 2,
      },
      {
        value: 10,
        quantityApplied: 4,
      }
    ],
  },
}

describe('Test Order Class', () => {

  describe('Order is empty', () => {
    const order = new Order();
    
    it('order details should be empty', () => {
      expect(order.getDetails().size).toBe(0);
    })
    
    it('total price should be 0', () => {
      expect(order.getTotal()).toBe(0);
    });
    
    it('export bill should be empty', () => {
      expect(order.getBill()).toEqual([]);
    });
  });

  describe('Order has one product', () => {
    const order = new Order();
  
    test('Add an apple', () => {
      order.addFruit(new Fruit(fruitStorage.apple), 1);
      expect(order.getDetails().size).toBe(1);
      expect(order.getDetail(fruitStorage.apple.id)).not.toBeUndefined();
      expect(order.getDetail(fruitStorage.apple.id).quantity).toBe(1);
    });
  
    test('Total price is 4750', () => {
      expect(order.getTotal()).toBe(4750);
    });

    test('Add more 2 apples', () => {
      order.addFruit(new Fruit(fruitStorage.apple), 2);
      expect(order.getDetails().size).toBe(1);
      expect(order.getDetail(fruitStorage.apple.id)).not.toBeUndefined();
      expect(order.getDetail(fruitStorage.apple.id).quantity).toBe(3);
    });

    test('Total price is 13500', () => {
      expect(order.getTotal()).toBe(13500);
    });

    test('Update quantity of apple to 4', () => {
      order.updateFruit(new Fruit(fruitStorage.apple), 4);
      expect(order.getDetails().size).toBe(1);
      expect(order.getDetail(fruitStorage.apple.id)).not.toBeUndefined();
      expect(order.getDetail(fruitStorage.apple.id).quantity).toBe(4);
    });

    test('Total price is 18000', () => {
      expect(order.getTotal()).toBe(18000);
    });

    test('Remove apple in order', () => {
      order.removeFruit(fruitStorage.apple.id);
      expect(order.getDetails().size).toBe(0);
      expect(order.getDetail(fruitStorage.apple.id)).toBeUndefined();
    });

    test('Total price is 0', () => {
      expect(order.getTotal()).toBe(0);
    });
  });

  describe('Order has more one product', () => {
    const order = new Order();
    
    test('Add 4 apples', () => {
      order.addFruit(new Fruit(fruitStorage.apple), 4);
      expect(order.getDetails().size).toBe(1);
      expect(order.getDetail(fruitStorage.apple.id)).not.toBeUndefined();
      expect(order.getDetail(fruitStorage.apple.id).quantity).toBe(4);
    });
    
    test('Total price is 18000', () => {
      expect(order.getTotal()).toBe(18000);
    });
    
    test('Add more 2 lemons', () => {
      order.addFruit(new Fruit(fruitStorage.lemon), 1);
      expect(order.getDetails().size).toBe(2);
      expect(order.getDetail(fruitStorage.lemon.id)).not.toBeUndefined();
      expect(order.getDetail(fruitStorage.lemon.id).quantity).toBe(1);
    });
    
    test('Total price is 20000', () => {
      expect(order.getTotal()).toBe(20000);
    });
    
    test('Update quantity of lemon to 4', () => {
      order.updateFruit(new Fruit(fruitStorage.lemon), 4);
      expect(order.getDetails().size).toBe(2);
      expect(order.getDetail(fruitStorage.lemon.id)).not.toBeUndefined();
      expect(order.getDetail(fruitStorage.lemon.id).quantity).toBe(4);
    });
    
    test('Total price is 23200', () => {
      expect(order.getTotal()).toBe(25200);
    });
    
    test('Remove apple in order', () => {
      order.removeFruit(fruitStorage.apple.id);
      expect(order.getDetails().size).toBe(1);
      expect(order.getDetail(fruitStorage.apple.id)).toBeUndefined();
    });
    
    test('Total price is 7200', () => {
      expect(order.getTotal()).toBe(7200);
    });
  });

});
