export const ApiService = async (axiosActionWithRequest) => {
  try {
    const { data, status } = await axiosActionWithRequest;

    return [null, data, status];
  } catch (error) {
    return [useCatchError(error), null];
  }
};

const useCatchError = (e) => {
  try {
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
  } catch (err) {
    console.warn(e, err);
    return {
      status: 500,
      message: 'Unknown error',
    };
  }
};
