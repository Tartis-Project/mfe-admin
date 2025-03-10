import { EuroCurrencyPipe } from './euro-currency.pipe';

describe('EuroCurrencyPipe', () => {
  let pipe: EuroCurrencyPipe;

  beforeEach(() => {
    pipe = new EuroCurrencyPipe();
  });

  it('should create the pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format number as euro currency with default decimals', () => {
    const result = pipe.transform(1234.56);
    expect(result).toBe('1234,56 €');
  });

  it('should format number as euro currency with custom decimals', () => {
    const result = pipe.transform(1234.5678, 3);
    expect(result).toBe('1234,568 €');
  });

  it('should format number with zero decimals', () => {
    const result = pipe.transform(1234.5678, 0);
    expect(result).toBe('1235 €');
  });

  it('should handle integer values correctly', () => {
    const result = pipe.transform(1234);
    expect(result).toBe('1234,00 €');
  });

  it('should handle zero as input', () => {
    const result = pipe.transform(0);
    expect(result).toBe('0,00 €');
  });

  it('should handle negative values correctly', () => {
    const result = pipe.transform(-1234.56);
    expect(result).toBe('-1234,56 €');
  });

  it('should handle large numbers correctly', () => {
    const result = pipe.transform(1234567890.12345, 3);
    expect(result).toBe('1234567890,123 €');
  });
});
