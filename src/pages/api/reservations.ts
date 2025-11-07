import fs from "fs";
import path from "path";

const filePath = path.resolve("./src/data/reservations.json");

export async function GET() {
  const data = fs.readFileSync(filePath, "utf8");
  return new Response(data, { headers: { "Content-Type": "application/json" } });
}

export async function POST({ request }) {
  const body = await request.json();
  const { reservation } = body;
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  data.reservations.push(reservation);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return new Response(JSON.stringify({ success: true }));
}

export async function PUT({ request }) {
  const body = await request.json();
  const { reservation, email, index } = body;
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const userRes = data.reservations.filter(r => r.email === email);
  const globalIndex = data.reservations.findIndex(
    r =>
      r.email === email &&
      r.date === userRes[index].date &&
      r.time === userRes[index].time
  );
  data.reservations[globalIndex] = reservation;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return new Response(JSON.stringify({ success: true }));
}
export const prerender = false;