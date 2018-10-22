export class User {
  photoURL: string;
  idToken: any;
    constructor(
      public email: string,
      public password: string,
      public name: string
      ) {  }
  
  }
