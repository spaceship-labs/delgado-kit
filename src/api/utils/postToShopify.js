export const postToShopify = async ({ query, variables }) => {
    try {
        const result = await fetch("https://manueldelgado.myshopify.com/api/2021-07/graphql.json", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': import.meta.env.VITE_SHOPIFY_STOREFRONT_API_TOKEN
            },
            body: JSON.stringify({ query, variables })
        }).then((res) => res.json());

        if (result.errors) {
            console.log({ errors: result.errors });
        } else if (!result || !result.data) {
            console.log({ result });
            return 'No results found.';
        }
        // console.log(result.data);
        return result.data;
    } catch (error) {
        console.log(error);
    }
};