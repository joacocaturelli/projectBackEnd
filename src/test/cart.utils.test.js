import { calculateTotal } from "../utils/cart.utils.js";

describe("calculateTotal", () => {
  test("devuelve 0 para carrito vacio", () => {
    expect(calculateTotal([])).toBe(0);
  });

  test("calcula el total de un item", () => {
    const items = [{ price: 10, quantity: 3 }];
    expect(calculateTotal(items)).toBe(30);
  });

  test("suma varios items correctamente", () => {
    const items = [
      { price: 10, quantity: 3 },
      { price: 5, quantity: 4 },
      { price: 15, quantity: 1 },
    ];
    expect(calculateTotal(items)).toBe(65);
  });

  test("funciona con numeros decimales", () => {
    const items = [{ price: 9.99, quantity: 2 }];
    expect(calculateTotal(items)).toBeCloseTo(19.98);
  });
});
