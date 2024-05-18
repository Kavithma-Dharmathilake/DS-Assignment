import axios from "axios";

export const notifyMail = async (subject, message, usermail, userId) => {
    const serviceId = "service_n4vk1ku";
    const templateId = "template_ebnlo3a";
    const publicKey = "1sBtaxsxRI7y2HvAw";

    const data = {
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
            topic:subject,
            userMail:usermail,
            to_name:userId,
            message:message,
        },
    };

    try {
        const res = await axios.post("https://api.emailjs.com/api/v1.0/email/send", data);
        console.log(res.data);
    } catch (error) {
        console.error(error);
    }
};

export const notifySMS = async (message, contact) => {
    const id = "27191";
    const APIKEY = "G21eTWluE6S87h7r2Igq";
    try {
        const response = await axios.post(`https://app.notify.lk/api/v1/send`, {
            user_id: id,
            api_key: APIKEY,
            sender_id: 'NotifyDEMO',
            to: contact,
            message: message
        });
        console.log(response.data);
    } catch (error) {
        console.error("Error in notifySMS: ", error);
    }
};
