import { useEffect, useState } from "react";
import "./App.css";
import { ProductsNew } from "./products.New";
import { ProductsView } from "./products.view";
import { Requester } from "./Requester/Requester";

export type TProduct = {
  id?: number;
  nom: string;
  prix: number;
  quantite: number;
};

function App() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [currentModif, setCurrentModif] = useState(0); // -1 pour un nouveau, 0 pour rien , 1+ pour les autres
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await Requester.getProducts();
      data.sort((a, b) => (a.id || 0) - (b.id || 0));
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="App">
      <h1 className="bg-primary text-light d-flex justify-content-center align-items-center">
        <div>Produit</div>
      </h1>
      <ProductsNew
        data={{
          id: -1,
          nom: "Nouveau Produit",
          prix: 0,
          quantite: 0,
        }}
        currentModif={currentModif}
        setCurrentModif={setCurrentModif}
        products={products}
        setProducts={setProducts}
      />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nom</th>
            <th scope="col">Prix</th>
            <th scope="col" className="text-break">Quantité</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, i) => (
            <ProductsView
              data={item}
              key={i}
              currentModif={currentModif}
              setCurrentModif={setCurrentModif}
              products={products}
              setProducts={setProducts}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
