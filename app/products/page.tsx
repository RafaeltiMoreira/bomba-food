import { Button } from "../_components/ui/button";
import { Input } from "../_components/ui/input";


const ProductPage = () => {
  return ( 
    <div className="p-5 border border-red-500 rounded-xl">
      <h1 className="text-red-500">Product Page</h1>
      <Button>Bomba Food</Button>
      <Input placeholder="Faça seu pedido" />
    </div>
   );
}
 
export default ProductPage;