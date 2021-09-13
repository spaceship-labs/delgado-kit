import { postToShopify } from './postToShopify';

// Creates a cart with a single item
export const createCartWithItem = async ({ itemId, quantity }) => {

	try {
		const response = await postToShopify({
			query: `
        mutation createCart($cartInput: CartInput) {
          cartCreate(input: $cartInput) {
            cart {
              id
              createdAt
              updatedAt
              checkoutUrl
              lines(first: 10) {
                edges {
                  node {
                    id
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
              attributes {
                key
                value
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
				cartInput: {
					lines: [
						{
							quantity:quantity,
							merchandiseId: itemId
						}
					]
				}
			}
		});

		return response;
	} catch (error) {
		console.log(error);
	}
};