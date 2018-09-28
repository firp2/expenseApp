export class List {

    constructor(
      public type:string,
      public name: string,
      public picture: string,
      public steps:string[],
      public ingredients:string[],
      public notes?:string
    ) { }
  
  }
