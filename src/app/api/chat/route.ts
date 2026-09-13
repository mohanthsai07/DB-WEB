export async function POST() {
  return Response.json(
    { message: "Chat is not available yet." },
    { status: 501 },
  );
}
