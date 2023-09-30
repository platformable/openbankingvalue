const apiKey = process.env.NEXT_PUBLIC_API_KEY;


export default async function verifySubscription(req, res) {
    const { email } = req.body;
    // console.log(email, apiKey)
    try {
      const response = await fetch(
        `https://api.mailerlite.com/api/v2/subscribers/${email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-MailerLite-ApiKey": apiKey,
          },
        }
      );
        // console.log(response)
      if (response.ok) {
        return res.status(200).send({subscribed: true});
      } else {
        return res.status(404).send({ subscribed: false });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }