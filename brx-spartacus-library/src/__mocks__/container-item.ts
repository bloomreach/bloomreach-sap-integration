import { ContainerItem } from '@bloomreach/spa-sdk';
import { MockComponent } from './component';

const mockRef = 'ref';
const mockParameters: Record<string, any> = {
  interval: 0,
  limit: 0,
  title: 'test',
  showDescription: true,
  showPid: true,
  showPrice: true,
  showTitle: true,
};

class MockContainerItem extends MockComponent implements ContainerItem {
  on = jest.fn();

  off = jest.fn();

  getType = jest.fn();

  getLabel = jest.fn();

  isHidden = jest.fn();

  getContent = jest.fn();

  getContentReference = jest.fn(() => ({ $ref: mockRef }));

  getParameters = jest.fn(() => mockParameters as any);
}

export default new MockContainerItem();
