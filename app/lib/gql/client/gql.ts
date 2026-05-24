/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n    fragment IconTextComponentFields on IconTextComponent {\n        displayText\n        lucideIconName\n        lucideIconColor\n        descriptionType\n        text\n        dimensionsLength\n        dimensionsWidth\n        dimensionsHeight\n    }\n": typeof types.IconTextComponentFieldsFragmentDoc,
    "\n    fragment RentalItemCardFragment on RentalItemDetails {\n        name\n        cost\n        smallDescription\n        featuredItem\n        slug\n        thumbnailImage {\n            contentType\n            url\n        }\n    }   \n": typeof types.RentalItemCardFragmentFragmentDoc,
    "\n    query HeroSlides {\n        heroSlideCollection {\n            items {\n                ...HeroSlideFields\n            }\n        }\n    }\n": typeof types.HeroSlidesDocument,
    "\n    query RentalCategories {\n        rentalCategoryCollection(order: displayOrder_ASC, limit: 15) {\n            items {\n                ...RentalCategoryCardFields\n                ...CategoryCatalog\n            }\n        }\n    }\n": typeof types.RentalCategoriesDocument,
    "\n    query featuredRentals {\n        rentalCategoryCollection(\n            limit: 15, \n            where: {\n                rentalItems: { \n                    featuredItem_exists: true \n                }\n            }\n        ) {\n            items {\n                ...FeaturedCards\n            }\n        }\n    }\n": typeof types.FeaturedRentalsDocument,
    "\n    fragment FeaturedCards on RentalCategory {\n        slug\n        rentalItemsCollection(where: { featuredItem_exists:  true}) {\n            items {\n                ...RentalItemCardFragment\n            }\n        }\n    }\n": typeof types.FeaturedCardsFragmentDoc,
    "\n    fragment HeroSlideFields on HeroSlide {\n    sys {\n        __typename\n        id\n    }\n    internalName\n    titleForegroundColor\n    titleSecondaryColor\n    slidePosition\n    subTitle\n    description\n    slideImage {\n        url\n        title\n        description\n    }\n    }\n": typeof types.HeroSlideFieldsFragmentDoc,
    "\n    fragment RentalCategoryCardFields on RentalCategory {\n        sys {\n            id\n        }\n        categoryName\n        shortDescription\n        categoryImage {\n            contentType\n            url\n        }\n        slug\n    }\n": typeof types.RentalCategoryCardFieldsFragmentDoc,
    "\n    fragment CategoryCatalog on RentalCategory {\n        categoryName\n        subHeader\n        longDescription\n        categoryImage {\n            contentType\n            url\n        }\n        rentalItemsCollection(limit: 15) {\n            items {\n                name\n                cost\n                smallDescription\n                thumbnailImage {\n                    contentType\n                    url\n                }\n                slug\n                ...ItemDetails\n            }\n        }\n        slug\n    }\n": typeof types.CategoryCatalogFragmentDoc,
    "\n    fragment ItemDetails on RentalItemDetails {\n        name\n        cost\n        smallDescription\n        longDescription\n        featuredItem\n        specificationsCollection {\n            items {\n                ...IconTextComponentFields\n            }\n        }\n        features\n        thumbnailImage {\n            contentType\n            url\n        }\n        galleryImagesCollection {\n            items {\n                contentType\n                url\n            }\n        }\n        bookingInformationCollection {\n            items {\n                ...IconTextComponentFields\n            }\n        }\n        slug\n    } \n": typeof types.ItemDetailsFragmentDoc,
};
const documents: Documents = {
    "\n    fragment IconTextComponentFields on IconTextComponent {\n        displayText\n        lucideIconName\n        lucideIconColor\n        descriptionType\n        text\n        dimensionsLength\n        dimensionsWidth\n        dimensionsHeight\n    }\n": types.IconTextComponentFieldsFragmentDoc,
    "\n    fragment RentalItemCardFragment on RentalItemDetails {\n        name\n        cost\n        smallDescription\n        featuredItem\n        slug\n        thumbnailImage {\n            contentType\n            url\n        }\n    }   \n": types.RentalItemCardFragmentFragmentDoc,
    "\n    query HeroSlides {\n        heroSlideCollection {\n            items {\n                ...HeroSlideFields\n            }\n        }\n    }\n": types.HeroSlidesDocument,
    "\n    query RentalCategories {\n        rentalCategoryCollection(order: displayOrder_ASC, limit: 15) {\n            items {\n                ...RentalCategoryCardFields\n                ...CategoryCatalog\n            }\n        }\n    }\n": types.RentalCategoriesDocument,
    "\n    query featuredRentals {\n        rentalCategoryCollection(\n            limit: 15, \n            where: {\n                rentalItems: { \n                    featuredItem_exists: true \n                }\n            }\n        ) {\n            items {\n                ...FeaturedCards\n            }\n        }\n    }\n": types.FeaturedRentalsDocument,
    "\n    fragment FeaturedCards on RentalCategory {\n        slug\n        rentalItemsCollection(where: { featuredItem_exists:  true}) {\n            items {\n                ...RentalItemCardFragment\n            }\n        }\n    }\n": types.FeaturedCardsFragmentDoc,
    "\n    fragment HeroSlideFields on HeroSlide {\n    sys {\n        __typename\n        id\n    }\n    internalName\n    titleForegroundColor\n    titleSecondaryColor\n    slidePosition\n    subTitle\n    description\n    slideImage {\n        url\n        title\n        description\n    }\n    }\n": types.HeroSlideFieldsFragmentDoc,
    "\n    fragment RentalCategoryCardFields on RentalCategory {\n        sys {\n            id\n        }\n        categoryName\n        shortDescription\n        categoryImage {\n            contentType\n            url\n        }\n        slug\n    }\n": types.RentalCategoryCardFieldsFragmentDoc,
    "\n    fragment CategoryCatalog on RentalCategory {\n        categoryName\n        subHeader\n        longDescription\n        categoryImage {\n            contentType\n            url\n        }\n        rentalItemsCollection(limit: 15) {\n            items {\n                name\n                cost\n                smallDescription\n                thumbnailImage {\n                    contentType\n                    url\n                }\n                slug\n                ...ItemDetails\n            }\n        }\n        slug\n    }\n": types.CategoryCatalogFragmentDoc,
    "\n    fragment ItemDetails on RentalItemDetails {\n        name\n        cost\n        smallDescription\n        longDescription\n        featuredItem\n        specificationsCollection {\n            items {\n                ...IconTextComponentFields\n            }\n        }\n        features\n        thumbnailImage {\n            contentType\n            url\n        }\n        galleryImagesCollection {\n            items {\n                contentType\n                url\n            }\n        }\n        bookingInformationCollection {\n            items {\n                ...IconTextComponentFields\n            }\n        }\n        slug\n    } \n": types.ItemDetailsFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment IconTextComponentFields on IconTextComponent {\n        displayText\n        lucideIconName\n        lucideIconColor\n        descriptionType\n        text\n        dimensionsLength\n        dimensionsWidth\n        dimensionsHeight\n    }\n"): (typeof documents)["\n    fragment IconTextComponentFields on IconTextComponent {\n        displayText\n        lucideIconName\n        lucideIconColor\n        descriptionType\n        text\n        dimensionsLength\n        dimensionsWidth\n        dimensionsHeight\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment RentalItemCardFragment on RentalItemDetails {\n        name\n        cost\n        smallDescription\n        featuredItem\n        slug\n        thumbnailImage {\n            contentType\n            url\n        }\n    }   \n"): (typeof documents)["\n    fragment RentalItemCardFragment on RentalItemDetails {\n        name\n        cost\n        smallDescription\n        featuredItem\n        slug\n        thumbnailImage {\n            contentType\n            url\n        }\n    }   \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query HeroSlides {\n        heroSlideCollection {\n            items {\n                ...HeroSlideFields\n            }\n        }\n    }\n"): (typeof documents)["\n    query HeroSlides {\n        heroSlideCollection {\n            items {\n                ...HeroSlideFields\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query RentalCategories {\n        rentalCategoryCollection(order: displayOrder_ASC, limit: 15) {\n            items {\n                ...RentalCategoryCardFields\n                ...CategoryCatalog\n            }\n        }\n    }\n"): (typeof documents)["\n    query RentalCategories {\n        rentalCategoryCollection(order: displayOrder_ASC, limit: 15) {\n            items {\n                ...RentalCategoryCardFields\n                ...CategoryCatalog\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query featuredRentals {\n        rentalCategoryCollection(\n            limit: 15, \n            where: {\n                rentalItems: { \n                    featuredItem_exists: true \n                }\n            }\n        ) {\n            items {\n                ...FeaturedCards\n            }\n        }\n    }\n"): (typeof documents)["\n    query featuredRentals {\n        rentalCategoryCollection(\n            limit: 15, \n            where: {\n                rentalItems: { \n                    featuredItem_exists: true \n                }\n            }\n        ) {\n            items {\n                ...FeaturedCards\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment FeaturedCards on RentalCategory {\n        slug\n        rentalItemsCollection(where: { featuredItem_exists:  true}) {\n            items {\n                ...RentalItemCardFragment\n            }\n        }\n    }\n"): (typeof documents)["\n    fragment FeaturedCards on RentalCategory {\n        slug\n        rentalItemsCollection(where: { featuredItem_exists:  true}) {\n            items {\n                ...RentalItemCardFragment\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment HeroSlideFields on HeroSlide {\n    sys {\n        __typename\n        id\n    }\n    internalName\n    titleForegroundColor\n    titleSecondaryColor\n    slidePosition\n    subTitle\n    description\n    slideImage {\n        url\n        title\n        description\n    }\n    }\n"): (typeof documents)["\n    fragment HeroSlideFields on HeroSlide {\n    sys {\n        __typename\n        id\n    }\n    internalName\n    titleForegroundColor\n    titleSecondaryColor\n    slidePosition\n    subTitle\n    description\n    slideImage {\n        url\n        title\n        description\n    }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment RentalCategoryCardFields on RentalCategory {\n        sys {\n            id\n        }\n        categoryName\n        shortDescription\n        categoryImage {\n            contentType\n            url\n        }\n        slug\n    }\n"): (typeof documents)["\n    fragment RentalCategoryCardFields on RentalCategory {\n        sys {\n            id\n        }\n        categoryName\n        shortDescription\n        categoryImage {\n            contentType\n            url\n        }\n        slug\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment CategoryCatalog on RentalCategory {\n        categoryName\n        subHeader\n        longDescription\n        categoryImage {\n            contentType\n            url\n        }\n        rentalItemsCollection(limit: 15) {\n            items {\n                name\n                cost\n                smallDescription\n                thumbnailImage {\n                    contentType\n                    url\n                }\n                slug\n                ...ItemDetails\n            }\n        }\n        slug\n    }\n"): (typeof documents)["\n    fragment CategoryCatalog on RentalCategory {\n        categoryName\n        subHeader\n        longDescription\n        categoryImage {\n            contentType\n            url\n        }\n        rentalItemsCollection(limit: 15) {\n            items {\n                name\n                cost\n                smallDescription\n                thumbnailImage {\n                    contentType\n                    url\n                }\n                slug\n                ...ItemDetails\n            }\n        }\n        slug\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment ItemDetails on RentalItemDetails {\n        name\n        cost\n        smallDescription\n        longDescription\n        featuredItem\n        specificationsCollection {\n            items {\n                ...IconTextComponentFields\n            }\n        }\n        features\n        thumbnailImage {\n            contentType\n            url\n        }\n        galleryImagesCollection {\n            items {\n                contentType\n                url\n            }\n        }\n        bookingInformationCollection {\n            items {\n                ...IconTextComponentFields\n            }\n        }\n        slug\n    } \n"): (typeof documents)["\n    fragment ItemDetails on RentalItemDetails {\n        name\n        cost\n        smallDescription\n        longDescription\n        featuredItem\n        specificationsCollection {\n            items {\n                ...IconTextComponentFields\n            }\n        }\n        features\n        thumbnailImage {\n            contentType\n            url\n        }\n        galleryImagesCollection {\n            items {\n                contentType\n                url\n            }\n        }\n        bookingInformationCollection {\n            items {\n                ...IconTextComponentFields\n            }\n        }\n        slug\n    } \n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;