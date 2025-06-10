import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { employeeId, item, date } = body;

    // Simulate saving reservation (replace with DB logic)
    if (!employeeId || !item || !date) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    return NextResponse.json({ message: "Reservation created successfully" }, { status: 201 });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
