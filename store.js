// store.js
// import { writable } from '/node_modules/svelte/store';
import { postToShopify } from '/src/routes/api/utils/postToShopify';

import { createCartWithItem } from '/src/routes/api/utils/createCartWithItem';
import { addItemToCart } from '/src/routes/api/utils/addItemToCart';

import { removeItemFromCart } from '/src/routes/api/utils/removeItemFromCart';


// export const products = writable([]);
// export const productDetails = writable([]);

// export let products;
export const getProducts = async () => {
    try {
        const shopifyResponse = await postToShopify({
            query: `{
         products(sortKey: TITLE, first: 200) {
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
                                sku
                                price
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
          pageInfo {
            hasNextPage
          }
        }
    }
      `
        });
        


        console.log(shopifyResponse);
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
              collections(first: 200) {
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
                                sku
                                price
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
                      pageInfo {
                        hasNextPage
                      }
                    }
                  }
                }
              }
            }
              `
          });

        title = title.replaceAll("-"," ");
        for(let coll of shopifyResponse.collections.edges){
          if(coll.node.title.toUpperCase() == title.toUpperCase()){
            // console.log(coll.node);
            // console.log(title);
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
            descriptionHtml
            title
            totalInventory
            metafields(first: 4) {
              edges {
                node {
                  key
                  value
                  type
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  sku
                  quantityAvailable
                  metafield(namespace: "my_fields", key: "color") {
                    value
                    key
                  }
                  priceV2 {
                    amount
                    currencyCode
                  }
                  compareAtPrice
                  image{
                    id
                  }
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
                  id
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





export const addToCart = async (itemId,quantity) => {
    // add selected product to cart
    console.log(quantity);
    if(quantity == 0){
      return;
    }
    try {
        let cartId =  localStorage.getItem('cartId');
        if (cartId) {
            console.log('Adding item to existing cart...');
            const data = await addItemToCart({
                cartId,
                itemId,
                quantity,
            }).then((data) => {
              console.log(data.cartLinesAdd.cart);
              if(data.cartLinesAdd.cart.id){
                localStorage.setItem('cartId', data.cartLinesAdd.cart.id);
                localStorage.setItem('cart', JSON.stringify(data.cartLinesAdd.cart));
                location.reload();
              }
            });
        } else {
            console.log('Creating new cart with item...');
            const data = await createCartWithItem({
                itemId,
                quantity,
            }).then((data) => {
              console.log(data.cartCreate.cart);
              if(data.cartCreate.cart.id){
                localStorage.setItem('cartId', data.cartCreate.cart.id);
                localStorage.setItem('cart', JSON.stringify(data.cartCreate.cart));
                location.reload();
              }
            });
        }
        
    } catch (e) {
        console.log(e);
    }
};




export const removeFromCart = async function removeItem(lineId) {
    try {
        let cartId =  localStorage.getItem('cartId');

        const shopifyResponse = await removeItemFromCart({
            cartId,
            lineId
        }).then((data) => {
          console.log(data);
          if(data.cartLinesRemove.cart.id){
            localStorage.setItem('cartId', data.cartLinesRemove.cart.id);
            localStorage.setItem('cart', JSON.stringify(data.cartLinesRemove.cart));
            location.reload();
          }
        });
    } catch (error) {
        console.log('There was an error removing-item-from-cart');
        console.log(error);
    }

}

export const updateCart = async function removeItem(lineId,itemId,quantity) {
    try {
        let cartId =  localStorage.getItem('cartId');
        const shopifyResponse = await removeItemFromCart({
            cartId,
            lineId
        }).then((data) => {
          addToCart(itemId,quantity);
        });
    } catch (error) {
        console.log('There was an error removing-item-from-cart');
        console.log(error);
    }

}





// Get blog
export const getBlog = async (count = 50) => {
  try {
    const shopifyResponse = await postToShopify({
      query: ` 
        {
          blogs(first: 1) {
            edges {
              node {
                articles(first: `+count+`, sortKey: PUBLISHED_AT) {
                  pageInfo {
                    hasNextPage
                    hasPreviousPage
                  }
                  edges {
                    node {
                      id
                      image {
                        src
                      }
                      title
                      handle
                      publishedAt
                    }
                  }
                }
                handle
              }
            }
          }
        }
      `,
    });
    // console.log(shopifyResponse);
    return shopifyResponse;
  } catch (error) {
    console.log(error);
  }
};


// Get post detail
export const getPostDetails = async (handle) => {
  try {
    const shopifyResponse = await postToShopify({
      query: ` 
        {
          blogs(first: 1) {
            edges {
              node {
                articleByHandle(handle: "`+handle+`") {
                  image {
                    src
                  }
                  id
                  handle
                  contentHtml
                  seo {
                    description
                    title
                  }
                  title
                  publishedAt
                }
              }
            }
          }
        }
      `
    });

    // console.log(shopifyResponse.blogs.edges[0].node.articleByHandle);
    return shopifyResponse.blogs.edges[0].node.articleByHandle;
  } catch (error) {
    console.log(error);
  }
};