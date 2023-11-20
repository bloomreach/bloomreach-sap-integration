import { Component as SpaSdkComponent } from '@bloomreach/spa-sdk';

export class MockComponent implements SpaSdkComponent {
  getId = jest.fn();

  getMeta = jest.fn();

  getModels = jest.fn();

  getUrl = jest.fn();

  getName = jest.fn();

  getParameters = jest.fn();

  getProperties = jest.fn();

  getChildren = jest.fn();

  getComponent = jest.fn();

  getComponentById = jest.fn();
}

export default new MockComponent();
