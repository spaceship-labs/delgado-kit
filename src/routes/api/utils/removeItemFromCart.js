import { postToShopify } from './postToShopify';

export const removeItemFromCart = async ({ cartId, lineId }) => {
  try {
    const shopifyResponse = await postToShopify({
      query: `
        mutation removeItemFromCart($cartId: ID!, $lineIds: [ID!]!) {
          cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
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
      variables: {
        cartId,
        lineIds: [lineId]
      }
    });

    return shopifyResponse;
  } catch (error) {
    console.log(error);
  }
};