import { useEffect, useState } from "react";
import { TProduct } from "./App";
import { Requester } from "./Requester/Requester";

export function ProductsNew(props: {
  data: TProduct,
  currentModif: number,
  setCurrentModif: React.Dispatch<React.SetStateAction<number>>,
  products : TProduct[],
  setProducts: React.Dispatch<React.SetStateAction<TProduct[]>>
}) {
  const { data, currentModif, setCurrentModif ,products, setProducts} = props;
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

  const handleSave = async () => {
    const newProduct = await Requester.newProducts(modif);
    setProducts([...products,newProduct])
    setCurrentModif(0)
  };

  
  return (
    <div>
      {currentModif === 0 && (
        <button onClick={() => setCurrentModif(-1)}>Ajouter un produit</button>
      )}
      {inModif && (
        <div>
          <label>Nom : </label>
          <input
            type="text"
            defaultValue={modif.nom}
            onChange={(e) => handleModif("nom", e.target.value)}
          />
          <label>Prix : </label>
          <input
            type="number"
            defaultValue={modif.prix}
            onChange={(e) => handleModif("prix", e.target.value)}
          />
          <label>Quatités : </label>
          <input
            type="number"
            defaultValue={modif.quantite}
            onChange={(e) => handleModif("quantite", e.target.value)}
          />

          <button onClick={handleSave}>Ajouter</button>
        </div>
      )}
    </div>
  );
}
