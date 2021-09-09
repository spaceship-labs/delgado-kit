// store.js
// import { writable } from '/node_modules/svelte/store';
import { postToShopify } from '/src/api/utils/postToShopify';



// export const products = writable([]);
// export const productDetails = writable([]);

// export let products;
export const getProducts = async () => {
    try {
        const shopifyResponse = await postToShopify({
            query: `{
         products(sortKey: TITLE, first: 100) {
          edges {
            node {
              id
              handle
              description
              title
              totalInventory
              productType
              variants(first: 10) {
                edges {
                  node {
                    id
                    title
                    quantityAvailable
                    sku
                    priceV2 {
                      amount
                      currencyCode
                    }
                    compareAtPrice
                  }
                }
              }
              priceRange {
                maxVariantPrice {
                  amount
                  currencyCode
                }
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 1) {
                edges {
                  node {
                    src
                    altText
                  }
                }
              }
            }
          }
        }
    }
      `
        });
        


        // console.log(shopifyResponse);
        return shopifyResponse;
    } catch (error) {
        console.log(error);
    }
};


export const getCollection = async (title = null) => {
    // console.log(title);
    if(title == null){
       return getProducts();
    }
    try {
        const shopifyResponse = await postToShopify({
            query: `{
              collections(first: 100) {
                edges {
                  node {
                    id
                    title
                    products(sortKey: TITLE, first: 100) {
                      edges {
                        node {
                          id
                          handle
                          description
                          title
                          totalInventory
                          productType
                          variants(first: 10) {
                            edges {
                              node {
                                id
                                title
                                quantityAvailable
                                sku
                                priceV2 {
                                  amount
                                  currencyCode
                                }
                                compareAtPrice
                              }
                            }
                          }
                          priceRange {
                            maxVariantPrice {
                              amount
                              currencyCode
                            }
                            minVariantPrice {
                              amount
                              currencyCode
                            }
                          }
                          images(first: 1) {
                            edges {
                              node {
                                src
                                altText
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
              `
          });


        
        for(let coll of shopifyResponse.collections.edges){
          if(coll.node.title.toUpperCase() == title.toUpperCase()){
            // console.log(coll.node);
            return coll.node;
          }
        }
        // console.log(shopifyResponse.collections.edges[0].node);
        return shopifyResponse.collections.edges[0].node;
    } catch (error) {
        console.log(error);
    }
};


// Get product details
export const getProductDetails = async (handle) => {
  try {
    const shopifyResponse = await postToShopify({
      query: ` 
        query getProduct($handle: String!) {
          productByHandle(handle: $handle) {
            id
            handle
            description
            title
            totalInventory
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  quantityAvailable
                  priceV2 {
                    amount
                    currencyCode
                  }
                  compareAtPrice
                }
              }
            }
            priceRange {
              maxVariantPrice {
                amount
                currencyCode
              }
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 10) {
              edges {
                node {
                  src
                  altText
                }
              }
            }
          }
        }
      `,
      variables: {
        handle: handle,
      },
    });

    // console.log(shopifyResponse.productByHandle);
    return shopifyResponse.productByHandle;
  } catch (error) {
    console.log(error);
  }
};



const addToCart = async () => {
    // add selected product to cart
    try {
        const addToCartResponse = await fetch('/api/add-to-cart', {
            method: 'POST',
            body: JSON.stringify({
                cartId: localStorage.getItem('cartId'),
                itemId: selectedProduct,
                quantity: quantity
            })
        });
        const data = await addToCartResponse.json();
        // save new cart to localStorage
        localStorage.setItem('cartId', data.id);
        localStorage.setItem('cart', JSON.stringify(data));
        location.reload();
    } catch (e) {
        console.log(e);
    }
};