import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Mock processing logic
    console.log("📨 [API] New Enquiry Received:", body);
    
    // Simulate some server-side logic delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return NextResponse.json({
      success: true,
      message: "Enquiry submitted successfully",
      receivedAt: new Date().toISOString(),
      data: body
    }, { status: 200 });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to process enquiry",
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 400 });
  }
}
