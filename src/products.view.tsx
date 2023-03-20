import { useEffect, useState } from "react";
import { TProduct } from "./App";
import { Requester } from "./Requester/Requester";

export function ProductsView(props: { 
  data: TProduct ,
  currentModif: number,
  setCurrentModif: React.Dispatch<React.SetStateAction<number>>,
  products : TProduct[],
  setProducts: React.Dispatch<React.SetStateAction<TProduct[]>>,
}) {
  const { data, currentModif, setCurrentModif, products,setProducts } = props;
  const [modif, setModif] = useState({ ...data });

  const [inModif, setInModif] = useState(data.id === currentModif);


  useEffect(() => {
    setInModif(data.id === currentModif);
  }, [currentModif]);

  useEffect(() => {
    inModif && setModif({ ...data });
  }, [data, inModif]);

  const handleModif = (key: "nom" | "prix" | "quantite", value: string) => {
    const newModif = { ...modif };
    if (key !== "nom") {
      newModif[key] = Number(value);
    } else {
      newModif[key] = value;
    }
    setModif(newModif);
  };


  const handleUpdate = async () => {
    const newProduct = await Requester.updateProducts(data.id !,modif);
    setProducts(products.map(item => {
      if (item.id === newProduct.id){
        return newProduct
      }
      return item
    }))
    setCurrentModif(0)
  };


  const handleDelete = async () => {
    const newProduct = await Requester.deleteProducts(data.id !);
    setProducts(products.filter(item => item.id !== data.id))
    setCurrentModif(0)
  };

  return (
    <tr>
      <td>
        {data.id}
      </td>
      <td>
        {!inModif && data.nom}
        {inModif && <div>
          <label></label>
          <input
            type="text"
            defaultValue={modif.nom}
            onChange={(e) => handleModif("nom", e.target.value)}
          />
        </div>}
        </td>
      <td>
        {!inModif && data.prix}
        {inModif && <div>
          <label></label>
          <input
            type="number"
            defaultValue={modif.prix}
            onChange={(e) => handleModif("prix", e.target.value)}
          />
        </div>}
        </td>
      <td>
        {!inModif && data.quantite}
        {inModif && <div>
          <label></label>
          <input
            type="number"
            defaultValue={modif.quantite}
            onChange={(e) => handleModif("quantite", e.target.value)}
          />
        </div>}
        </td>
      <td>
        {currentModif === 0 && (
          <div>
            <button onClick={() => setCurrentModif(data.id!)}>Editer</button>
            <button onClick={handleDelete}>Supprimer</button>
          </div>
        )}
        {inModif && (
          <div>
            <button onClick={handleUpdate}>Modifier</button>
            <button onClick={() => setCurrentModif(0)}>Annuler</button>
          </div>
        )}
      </td>
    </tr>
  );
}
