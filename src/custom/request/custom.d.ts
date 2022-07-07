declare namespace Express {
  interface customArgs{
    reqUuid: string
  }
  export interface Request {
     custom: customArgs     
  }
  export interface customResult
  {
      success?:any,
      error?:any
  }
 
}