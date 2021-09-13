
export const postToShopify = async ({ query, variables }) => {
    console.log("admin");
    try {
        const result = await fetch("https://manueldelgado.myshopify.com/admin/api/2021-10/graphql.json", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

                // 'X-Shopify-Storefront-Access-Token': import.meta.env.VITE_SHOPIFY_STOREFRONT_API_TOKEN,
                'X-Shopify-Access-Token': import.meta.env.VITE_SHOPIFY_PASSWORD
                // 'X-Shopify-Access-Token':import.meta.env.VITE_SHOPIFY_STOREFRONT_API_TOKEN
            },
            body: JSON.stringify({ query, variables })
        }).then((res) => res.json() );

        if (result.errors) {
            console.log(result.errors);
        } else if (!result || !result.data) {
            console.log({ result });
            return 'No results found.';
        }
        return result.data;
    } catch (error) {
        console.log(error);
    }
};