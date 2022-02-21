import useTranslation from "next-translate/useTranslation";
import { Container } from "./styles";
import { FaTruck } from "react-icons/fa";

interface Props{
    stock_quantity: number|undefined; 
    stock_status:string|undefined;
}

const StockStatuts = ({stock_quantity,stock_status}: Props) => {

  const { t } = useTranslation();
  const InStock = t("common:InStock");
  const OnOrder = t("common:OnOrder");
  const Pieces = t("common:Pieces");
  const NoStockInfo = t("common:NoStockInfo");
  const OutOfStock = t("common:OutOfStock");
  

      let stockValue = "";

      const setQuantity = Number.isInteger(stock_quantity) ? (
(`: ${stock_quantity} ${Pieces}`)
):(
    (``)
      );

switch (stock_status) {
    case "instock":
        stockValue = `${InStock} ${setQuantity}`;
        break;
    case "onbackorder":
        stockValue = `${OnOrder}`;
        break;
    case "outofstock":
        stockValue = `${OutOfStock}`;
        break;

    default:
        stockValue = `${NoStockInfo}`;
        break;
}

  
  
  return (
    <Container>
   <FaTruck /> {stockValue}
    </Container>
  );
};
export default StockStatuts;
