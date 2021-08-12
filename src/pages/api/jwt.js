import jwt from "next-auth/jwt";

const secret =process.env.NEXT_AUTH_SECRET;

export default async(req, res) => {
  const token = await jwt.getToken({ req, secret });

  if (token) {
    res.send(token);
  } else {
    res.status(401).send("not authorized");
  }
};
