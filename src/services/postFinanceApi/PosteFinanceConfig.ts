import { PostFinanceCheckout } from "postfinancecheckout";

let spaceId: number = 23340;
let userId: number = 48078;
let apiSecret: string = "q8qtyI5maaCTfZ1aUWXY6Y3G/A/CjABNynZZkxLPjhw=";

let config = {
  space_id: spaceId,
  user_id: userId,
  api_secret: apiSecret,
};

//https://checkout.postfinance.ch URL postfinance for api rest

export const createTransaction = () => {
  // Transaction Service
  let transactionService: PostFinanceCheckout.api.TransactionService =
    new PostFinanceCheckout.api.TransactionService(config);

  // TransactionPaymentPage Service
  let transactionPaymentPageService: PostFinanceCheckout.api.TransactionPaymentPageService =
    new PostFinanceCheckout.api.TransactionPaymentPageService(config);

  // LineItem of type PRODUCT
  let lineItem: PostFinanceCheckout.model.LineItemCreate =
    new PostFinanceCheckout.model.LineItemCreate();
  lineItem.name = "Red T-Shirt";
  lineItem.uniqueId = "5412";
  lineItem.sku = "red-t-shirt-123";
  lineItem.quantity = 1;
  lineItem.amountIncludingTax = 3.5;
  lineItem.type = PostFinanceCheckout.model.LineItemType.PRODUCT;

  // Transaction
  let transaction: PostFinanceCheckout.model.TransactionCreate =
    new PostFinanceCheckout.model.TransactionCreate();
  transaction.lineItems = [lineItem];
  transaction.autoConfirmationEnabled = true;
  transaction.currency = "EUR";
  /* transactionService.fetchPaymentMethods */

  transactionService.create(spaceId, transaction).then((response) => {
    let transactionCreate: PostFinanceCheckout.model.Transaction =
      response.body;
    transactionPaymentPageService
      .paymentPageUrl(spaceId, <number>transactionCreate.id)
      .then(function (response) {
        let pageUrl: string = response.body;
        //console.log("pageUrl::", pageUrl);
        if (typeof window !== "undefined") {
          window.location.href = pageUrl;
        }
      });
  });
};
