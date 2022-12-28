import { TWILLIO_BASE_URL } from "@env";
import axios from "axios";

export const sendSmsVerification = async (phoneNumber) => {
  try {
    const data = JSON.stringify({
      to: phoneNumber,
      channel: "sms",
    });

    const config = {
      method: "post",
      url: `${TWILLIO_BASE_URL}/start-verify`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data,
    };
    const response = await axios(config);


    return response.data.success;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const checkVerification = async (phoneNumber, code) => {
  try {
    const data = JSON.stringify({
      to: phoneNumber,
      code,
    });

    const config = {
      method: "post",
      url: `${TWILLIO_BASE_URL}/check-verify`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data,
    };

    const response = await axios(config);
    return response.data.success;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = {
  sendSmsVerification,
  checkVerification,
};
