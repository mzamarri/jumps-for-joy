export const isPreview = process.env.CONTENTFUL_PREVIEW === "true"
export const spaceId = process.env.CONTENTFUL_SPACE_ID;
export const accessToken = isPreview
    ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
    : process.env.CONTENTFUL_ACCESS_TOKEN;
