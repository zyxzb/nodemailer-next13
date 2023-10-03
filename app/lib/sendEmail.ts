import axios from 'axios';

const sendEmail = async (email: string, subject: string, message: string) => {
  return axios({
    method: 'post',
    url: '/api/sendEmail',
    data: {
      email,
      subject,
      message,
    },
  });
};

export default sendEmail;
