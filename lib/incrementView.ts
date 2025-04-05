// app/actions/incrementView.ts
"use server";

import { writeClient } from "@/sanity/lib/write-client";

export async function incrementView(id: string, totalViews: number) {
  try {
    await writeClient.patch(id).set({ views: totalViews + 1 }).commit();
  } catch (err) {
    console.error("View update failed", err);
  }
}
