export default class Teacher {

  public id: string;
  public sid: string;
  public password: string;
  public name: string;
  public age: number;
  public email: string;
  public phone: string;
  public mark: string;

  public constructor(param: any) {
    const { id, sid, password, name, age, email, phone, mark} = param;
    this.id = id;
    this.sid = sid;
    this.password = password;
    this.name = name;
    this.age = age;
    this.email = email;
    this.phone = phone;
    this.mark = mark;
  }
}
