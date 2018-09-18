export default class ResultVo {

  public code: number;
  public data: any[];
  public message: string;
  public success: boolean = false;
  public constructor(code: number = 1, data: any[] = [], message: '') {
    this.code = code;
    this.data = data;
    this.message = message;
  }
}
