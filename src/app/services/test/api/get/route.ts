// services/test/api/get

export async function GET(request) {
    try {
      // Example logic: returning a simple message and request details
      const message = "Hello from Next.js 14 API route!";
      const url = request.url;
  
      return new Response(
        JSON.stringify({
          success: true,
          message,
          requestedUrl: url,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } 
    catch (error) {
      console.error("Error in test route:", error);
  
      return new Response(
        JSON.stringify({
          success: false,
          message: "An error occurred in the test route.",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }
  