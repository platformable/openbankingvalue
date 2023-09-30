// used the classic mailerlite api : https://developers-classic.mailerlite.com/reference/subscribers-in-a-group

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

const groupId = process.env.NEXT_PUBLIC_GROUP_ID;

export default async function subscribe(req, res) {

  const { email } = req.body;
  
  try {
    const response = await fetch(
      `https://api.mailerlite.com/api/v2/groups/${groupId}/subscribers`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-MailerLite-ApiKey": apiKey,
        },
        body: JSON.stringify({ email }),
      }
    );
    // console.log(response)
    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ message: `subscription failed` });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}