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
      let colorClass = "";

      const setQuantity = Number.isInteger(stock_quantity) ? (
(`: ${stock_quantity} ${Pieces}`)
):(
    (``)
      );

switch (stock_status) {
    case "instock":
        stockValue = `${InStock} ${setQuantity}`;
        colorClass = `green`;
        break;
        case "onbackorder":
          stockValue = `${OnOrder}`;
          colorClass = `orange`;
          break;
          case "outofstock":
            stockValue = `${OutOfStock}`;
            colorClass = `red`;
            break;
            
            default:
              stockValue = `${NoStockInfo}`;
              colorClass = `green`;
        break;
}

  
  
  return (
    <Container className={colorClass}>
   <FaTruck /> {stockValue}
    </Container>
  );
};
export default StockStatuts;
