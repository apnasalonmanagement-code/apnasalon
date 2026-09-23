export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Root → /user/
    if (url.pathname === "/") {
      return Response.redirect(`${url.origin}/user/`, 302);
    }

    // User Flutter app
    if (url.pathname === "/user" || url.pathname.startsWith("/user/")) {
      const newUrl = new URL(request.url);

      // Remove /user before requesting the Flutter asset
      newUrl.pathname =
        url.pathname.replace(/^\/user/, "") || "/";

      return env.ASSETS.fetch(
        new Request(newUrl, request)
      );
    }

    return new Response("Not Found", {
      status: 404
    });
  }
};
