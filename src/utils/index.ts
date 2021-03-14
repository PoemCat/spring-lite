import { InitializeException } from "../error/initialize-exception";

const SPRING = Symbol("SPRING#GLOBAL#CONFIG");

const SPRING_HOOKS = {
  INITIALIZE: "initialize",
  START: "start",
  DOWNLOADING: "downloading",
  DOWNLOADED: "downloaded",
  ITEM_CREATE: 'item:create',
  ITEM_UPDATE: 'item:update',
  RESTART: "restart",
  STOP: "stop",
};

function def(obj: any, key: PropertyKey, config: PropertyDescriptor) {
  return Object.defineProperty(obj, key, config);
}

export function getSpringGlobal(): SpringGlobal {
  if (!globalThis[SPRING]) {
    throw new InitializeException();
  }
  return globalThis[SPRING];
}

class SpringGlobal {
  
  private subscriberRecord: Record<string, Array<Function>> = {};

  constructor() {}

  on(evtName: string, subscriber: Function) {
    if (!this.subscriberRecord[evtName]) {
      this.subscriberRecord[evtName] = [];
    }
    const subscriberArray = this.subscriberRecord[evtName];
    if (!subscriberArray.includes(subscriber)) {
      subscriberArray.push(subscriber);
    }
  }

  static create() {
    return new SpringGlobal()
  }
}

export function initializeSpringGlobal() {
    if (!globalThis[SPRING]) {
        globalThis[SPRING] = SpringGlobal.create();
    }
}
