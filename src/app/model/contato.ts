export class Contato {
  private _id: number;
  private _nome: string;
  private _telefone: string;
  private _email!: string;
  private _genero!: string;

  constructor(nome: string, telefone: string) {
    let chave = new Date();
    this._id = chave.getTime();
    this._nome = nome;
    this._telefone = telefone;
  }

  public get id(): number{
    return this._id;
  }
  public get nome(): string {
    return this._nome;
  }
  public set nome(value: string) {
    this._nome = value;
  }
  public get telefone(): string {
    return this._telefone;
  }
  public set telefone(value: string) {
    this._telefone = value;
  }
  public get email(): string {
    return this._email;
  }
  public set email(value: string) {
    this._email = value;
  }
  public get genero(): string {
    return this._genero;
  }
  public set genero(value: string) {
    this._genero = value;
  }
}
