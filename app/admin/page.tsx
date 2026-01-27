import { getContent } from "@/lib/content"
import { AdminPageClient } from "./AdminPageClient"

export default async function AdminPage() {
  const content = await getContent()
  return <AdminPageClient initialContent={content} />
}
