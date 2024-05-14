import axios from "axios";

export const notifyMail = async (subject, message, usermail, userId) => {
  // Your EmailJS service ID, template ID, and Public Key
  const serviceId = "service_wg41e1t";
  const templateId = "template_djo8kxa";
  const publicKey = "4tiGQohDsjDdVDgQV";

  // Create an object with EmailJS service ID, template ID, Public Key, and Template params
  const data = {
    service_id: serviceId,
    template_id: templateId,
    user_id: publicKey,
    template_params: {
      topic: subject,
      userMail: usermail,
      userId: userId,
      message: message,
    },
  };

  // Send the email using EmailJS
  try {
    const res = await axios.post(
      "https://api.emailjs.com/api/v1.0/email/send",
      data
    );
    console.log(res.data);
  } catch (error) {
    console.error(error);
  }
};

export const notifySMS = async (message, contact) => {
  const id = "27106";
  const APIKEY = "M9k2hmAWrvviuk1bN0BH";
  try {
    const response = await axios.post(
      `https://app.notify.lk/api/v1/send?user_id=${id}&api_key=${APIKEY}&sender_id=NotifyDEMO&to=${contact}&message=${message}`
    );
    console.log(response);
  } catch (error) {
    console.error("Error in notifySMS: ", error);
  }
};
