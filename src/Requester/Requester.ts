import { TProduct } from "../App";
import { RequestMethods } from "./RequestMethod";
import { TResponse } from "./TResponse";

/**
 * Contient la methode de Requêtes génériques
 * 
 * @version v1
 */
export class Requester {

  /**
   * Une Requête générique
   * 
   * @type `Data`   Le Type de donnée de la réponse
   * 
   * @param url         Le complément d'url
   * @param method  ?   La methode html
   * @param params  ?   Les paramètres
   * @param body    ?   Le corps de la Requête
   * @param token   ?   Le token
   * 
   * @returns La réponse à la requête
   * 
   * @version v1
   */
  static async base<Data = any, Message = string | string[]>(
    url: string,
    method: RequestMethods = RequestMethods.GET,
    params: (string | number)[] = [],
    body: any = undefined,
    token: string | undefined = undefined
  )
  : Promise<TResponse<Data,Message>> 
  {
    const data = await fetch(
      `http://localhost:8000/api/${url}${params.map((item) => "/" + String(item))}`,
      {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(body),
      }
    );
    const result: TResponse<Data,Message> = await data.json();
    console.log(result.message);

    return result;
  }

  static async getProducts (){
    return (await Requester.base<TProduct[]>("products")).data
  }

  static async newProducts (body : TProduct){
    return (await Requester.base<TProduct>(
      "products",
      RequestMethods.POST,
      [],
      body
      )).data
  }

  static async updateProducts (id : number , body : TProduct){
    return (await Requester.base<TProduct>(
      "products",
      RequestMethods.PATCH,
      [id],
      body
      )).data
  }

  static async deleteProducts (id : number ){
    return (await Requester.base<TProduct>(
      "products",
      RequestMethods.DELETE,
      [id]
      )).data
  }

}
