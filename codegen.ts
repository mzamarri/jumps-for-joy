import type { CodegenConfig } from '@graphql-codegen/cli'
import 'dotenv/config'

const spaceId = process.env.CONTENTFUL_SPACE_ID
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN

if (!spaceId || !accessToken) {
    throw new Error(
        'Missing CONTENTFUL_SPACE_ID or CONTENTFUL_ACCESS_TOKEN. Ensure these are set in your .env file.'
    )
}

const config: CodegenConfig = {
    overwrite: true,
    config: {
        useTypeImports: true
    },
    schema: {
        [`https://graphql.contentful.com/content/v1/spaces/${spaceId}`]: {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            }
        }
    },
    documents: "app/**/*.tsx",
    generates: {
        './app/lib/gql/graphql.schema.json': {
            plugins: ['introspection']
        },
        './app/lib/gql/graphql.schema.graphql': {
            plugins: ['schema-ast']
        },
        './app/lib/gql/client/': {
            preset: 'client'
        }
    }
};

export default config;