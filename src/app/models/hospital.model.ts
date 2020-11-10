export class Hospital {
    constructor(
      public nombre: string,
      public usuarioId: string,
      public img?: string,
      // tslint:disable-next-line: variable-name
      public _id?: string
    ) {}
  }