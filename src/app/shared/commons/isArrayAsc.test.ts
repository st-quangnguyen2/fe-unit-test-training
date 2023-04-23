

import { isIArrayAsc } from './isArrayAsc';

describe('Testing isIArrayAsc function', () => {

  describe('Argument passed is not an array', () => {

    it('Argument not passed should be return false', () => {
      expect(isIArrayAsc()).toBe(false);
    });

    it('Empty string passed should be return false', () => {
      expect(isIArrayAsc('')).toBe(false);
    });

    it('Undefined passed should be return false', () => {
      expect(isIArrayAsc(undefined)).toBe(false);
    });

    it('Number passed should be return false', () => {
      expect(isIArrayAsc(1)).toBe(false);
    });

    it('Boolean passed should be return false', () => {
      expect(isIArrayAsc(true)).toBe(false);
    });

    it('Object passed should be return false', () => {
      expect(isIArrayAsc({})).toBe(false);
    });

    it('Function passed should be return false', () => {
      expect(isIArrayAsc(() => {})).toBe(false);
    });

  });

  describe('Argument passed is an array', () => {

    describe('Length of array less than 2', () => {

      it('Empty array should be return false', () => {
        expect(isIArrayAsc([])).toBe(false);
      });

      it('Array has one element should be return false', () => {
        expect(isIArrayAsc([1])).toBe(false);
      });

    });

    describe('Length of array greater than and equal 2', () => {

      it('Array has an element not a number should be return false', () => {
        expect(isIArrayAsc([1, ''])).toBe(false);
        expect(isIArrayAsc([1, false])).toBe(false);
        expect(isIArrayAsc([1, []])).toBe(false);
        expect(isIArrayAsc([1, null])).toBe(false);
      });
      
      it('Array not has been increase sorted should be return false', () => {
        expect(isIArrayAsc([2, 1])).toBe(false);
        expect(isIArrayAsc([2.1, 2, 2])).toBe(false);
      });

      it('Array has been increase sorted should be return true', () => {
        expect(isIArrayAsc([1, 2])).toBe(true);
        expect(isIArrayAsc([-1, 2, 5])).toBe(true);
        expect(isIArrayAsc([1, 3, 6, 10])).toBe(true);
        expect(isIArrayAsc([2, 2, 4])).toBe(true);
        expect(isIArrayAsc([1, 2, 2])).toBe(true);
      });
    });
  });
});

