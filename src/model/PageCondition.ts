/* eslint-disable */
export default class PageCondition {

  public pageSize: number;
  public pageIndex: number;

  public constructor(pageSize: number = 1, pageIndex: number = 10) {
    this.pageSize = pageSize;
    this.pageIndex = pageIndex;
  }
}
