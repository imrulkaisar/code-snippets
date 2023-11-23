axios
  .post(
    `https://server.vercel.app/jwt`,
    { email: currentUserEmail }, // Assuming the server expects an object with an 'email' property
    {
      withCredentials: true,
    }
  )
  .then((res) => {
    console.log("JWT creation response:", res.data);
  })
  .catch((error) => {
    console.error("Error creating JWT:", error);
  });
