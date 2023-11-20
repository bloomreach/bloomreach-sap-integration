import { Page as SpaSdkPage } from '@bloomreach/spa-sdk';
import component from './component';

class Page implements SpaSdkPage {
  getButton = jest.fn();

  getChannelParameters = jest.fn();

  getComponent = jest.fn(() => component);

  getContent = jest.fn();

  getDocument = jest.fn();

  getLocale = jest.fn();

  getMeta = jest.fn();

  getTitle = jest.fn();

  getUrl = jest.fn();

  getVersion = jest.fn();

  getVisitor = jest.fn();

  getVisit = jest.fn();

  isPreview = jest.fn();

  rewriteLinks = jest.fn();

  sync = jest.fn();

  toJSON = jest.fn();

  sanitize = jest.fn();

  prepareHTML = jest.fn();
}

export default new Page();
