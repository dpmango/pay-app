export default class ApiService {
  handleError = (e) => {
    if (e && !e.response) {
      console.warn('ApiService error  -', e);
      return;
    } else {
      const {
        data: { errors },
        status,
      } = e.response;

      let message = '';

      if (errors) {
        message = errors[0].message;
      }

      return {
        status: status,
        message: message,
      };
    }
  };

  handleSuccess = (msg) => {
    // console.log(msg);
  };
}
