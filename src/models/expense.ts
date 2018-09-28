export class Expense {

    constructor(
      public date: string,
      public category: string,
      public foodName: string,
      public calorie: string,
     // public nutrition: string,
      public amount: number,
      public notes?: string,
      public favIcon?: string 
    ) {  }
  
  }

