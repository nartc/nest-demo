import { Injectable } from '@angular/core';

@Injectable()
export class BaseClient {
  constructor() {
  }

  public transformOptions(options: any): any {
    /**
     * Modify RequestOptions object before return new Promise
     */
    return new Promise(resolve => {
      resolve(options);
    });
  }
}
