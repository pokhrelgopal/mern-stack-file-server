export default async function SingleApplicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return <div>App ID: {id}</div>;
}
