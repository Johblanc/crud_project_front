
/**
 * Format de réponse de l'API
 * 
 * @type `Data`             Le Format de la donnée reçue
 * @type `Message`          Le Format du message reçu
 * 
 * @property `statusCode`   Le status de la reponse
 * @property `message`      Le message de la reponse
 * @property `data`         La donnée de la reponse
 * 
 * @version v1
 */
export type TResponse<Data = any , Message = string | string []> = {

  /** Le status de la reponse */
  statusCode : number,

  /** Le message de la reponse */
  message: Message;

  /** La donnée de la reponse */
  data: Data;
};