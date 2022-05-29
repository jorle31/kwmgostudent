import { ServiceFactory } from './service-factory';

describe('ServiceFactory', () => {
  it('should create an instance', () => {
    expect(new ServiceFactory()).toBeTruthy();
  });
});
