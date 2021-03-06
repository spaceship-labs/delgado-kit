import { postToShopify } from './postToShopify';

export const addItemToCart = async ({ cartId, itemId, quantity }) => {
  try {
    const shopifyResponse = postToShopify({
      query: `
        mutation addItemToCart($cartId: ID!, $lines: [CartLineInput!]!) {
          cartLinesAdd(cartId: $cartId, lines: $lines) {
            cart {
              id
              checkoutUrl
              lines(first: 10) {
                edges {
                  node {
                    id
                    quantity
                    merchandise {
                      ... on ProductVariant {
                        id
                        title
                        quantityAvailable
                        priceV2 {
                          amount
                          currencyCode
                        }
                        compareAtPrice
                        product {
                          title
                          handle
                        }
                        image{
                          src
                        }
                      }
                    }
                  }
                }
              }
              estimatedCost {
                totalAmount {
                  amount
                  currencyCode
                }
                subtotalAmount {
                  amount
                  currencyCode
                }
                totalTaxAmount {
                  amount
                  currencyCode
                }
                totalDutyAmount {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      `,
      variables: 
      {
        cartId,
        lines: [
          {
            merchandiseId: itemId,
            quantity
          }
        ]
      }
    });

    return shopifyResponse;
  } catch (error) {
    console.log(error);
  }
};