import { useEffect, useState } from "react";
import { TProduct } from "./App";
import { Requester } from "./Requester/Requester";

export function ProductsNew(props: {
  data: TProduct;
  currentModif: number;
  setCurrentModif: React.Dispatch<React.SetStateAction<number>>;
  products: TProduct[];
  setProducts: React.Dispatch<React.SetStateAction<TProduct[]>>;
}) {
  const { data, currentModif, setCurrentModif, products, setProducts } = props;
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
    setProducts([...products, newProduct]);
    setCurrentModif(0);
  };

  return (
    <div>
      {currentModif === 0 && (
        <button
          className="btn btn-primary m-2"
          onClick={() => setCurrentModif(-1)}
        >
          Ajouter un produit
        </button>
      )}
      {inModif && (
        <div className="p-2">
          <div className="input-group p-2">
            <label className="input-group-text">Nom : </label>
            <input
              className="form-control"
              type="text"
              defaultValue={modif.nom}
              onChange={(e) => handleModif("nom", e.target.value)}
            />
          </div>
          <div className="input-group p-2">
            <label className="input-group-text">Prix : </label>
            <input
              className="form-control"
              type="number"
              defaultValue={modif.prix}
              onChange={(e) => handleModif("prix", e.target.value)}
            />
          </div>
          <div className="input-group p-2">
            <label className="input-group-text">Quatités : </label>
            <input
              className="form-control"
              type="number"
              defaultValue={modif.quantite}
              onChange={(e) => handleModif("quantite", e.target.value)}
            />
          </div>

          <div className="d-flex justify-content-end">
            <button className="btn btn-danger m-2"  onClick={() => setCurrentModif(0)}>
              Annuler
            </button>

            <button className="btn btn-primary m-2" onClick={handleSave}>
              Ajouter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
