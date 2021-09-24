
export const postToShopifyAdmin = async ({ query, variables }) => {
    console.log("admin");
    try {
        const result = await fetch("https://manueldelgado.myshopify.com/admin/api/2021-10/graphql.json", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

                // 'X-Shopify-Storefront-Access-Token': "dbba93fbda31ab8784607c08bf3a1f1b",
                'X-Shopify-Password': import.meta.env.VITE_SHOPIFY_PASSWORD,
                'X-Shopify-Access-Token':"dbba93fbda31ab8784607c08bf3a1f1b"
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