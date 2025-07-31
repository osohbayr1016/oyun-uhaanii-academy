import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const token = request.headers.get("authorization");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/course-filters/levels/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: token } : {}),
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(error, { status: response.status });
    }

    const level = await response.json();
    return NextResponse.json(level);
  } catch (error) {
    console.error("Error updating level:", error);
    return NextResponse.json(
      { error: "Failed to update level" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const token = request.headers.get("authorization");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/course-filters/levels/${id}`,
      {
        method: "DELETE",
        headers: {
          ...(token ? { Authorization: token } : {}),
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(error, { status: response.status });
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error deleting level:", error);
    return NextResponse.json(
      { error: "Failed to delete level" },
      { status: 500 }
    );
  }
}
