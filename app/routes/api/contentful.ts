// routes/api.contentful.ts
import type { Route } from "./+types/contentful";
import { spaceId, accessToken } from "./contentful.server";

export async function action({ request }: Route.ActionArgs) {
  try {
    const body = await request.text();

    const response = await fetch(`https://graphql.contentful.com/content/v1/spaces/${spaceId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body,
    });

    const text = await response.text();

    if (!response.ok) {
      console.error("Contentful error:", response.status, text);
    }

    return new Response(text, {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    throw error;
  }
}