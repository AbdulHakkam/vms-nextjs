const unauthorized = () => {
  return new Response("Unauthorized!", {
    headers: { "content-type": "text/plain" },
  });
};

export { unauthorized };
