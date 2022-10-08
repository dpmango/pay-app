export const ApiService = async (axiosActionWithRequest) => {
  try {
    const { data } = await axiosActionWithRequest;

    return [null, data];
  } catch (error) {
    useCatchError(error);

    return [error, null];
  }
};

const useCatchError = (e) => {
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
