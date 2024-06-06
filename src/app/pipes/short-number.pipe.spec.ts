import { ShortNumberPipe } from './short-number.pipe';

describe('ShortNumberPipe', () => {
  let pipe: ShortNumberPipe;

  beforeEach(() => {
    pipe = new ShortNumberPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return null for NaN', () => {
    expect(pipe.transform(NaN)).toBeNull();
  });

  it('should return null for null', () => {
    expect(pipe.transform(null as any)).toBeNull(); // `null as any` to simulate the passing of null value
  });

  it('should return null for 0', () => {
    expect(pipe.transform(0)).toBeNull();
  });

  it('should transform numbers less than 1000 correctly', () => {
    expect(pipe.transform(999)).toBe('1K');
    expect(pipe.transform(-999)).toBe('-1K');
  });

  it('should transform thousands correctly', () => {
    expect(pipe.transform(1000)).toBe('1K');
    expect(pipe.transform(1500)).toBe('1.5K');
    expect(pipe.transform(-2500)).toBe('-2.5K');
  });

  it('should transform millions correctly', () => {
    expect(pipe.transform(1000000)).toBe('1M');
    expect(pipe.transform(1500000)).toBe('1.5M');
    expect(pipe.transform(-2500000)).toBe('-2.5M');
  });

  it('should transform billions correctly', () => {
    expect(pipe.transform(1000000000)).toBe('1B');
    expect(pipe.transform(1500000000)).toBe('1.5B');
    expect(pipe.transform(-2500000000)).toBe('-2.5B');
  });

  it('should transform trillions correctly', () => {
    expect(pipe.transform(1000000000000)).toBe('1T');
    expect(pipe.transform(1500000000000)).toBe('1.5T');
    expect(pipe.transform(-2500000000000)).toBe('-2.5T');
  });

  it('should transform quadrillions correctly', () => {
    expect(pipe.transform(1000000000000000)).toBe('1Q');
    expect(pipe.transform(1500000000000000)).toBe('1.5Q');
    expect(pipe.transform(-2500000000000000)).toBe('-2.5Q');
  });
});
