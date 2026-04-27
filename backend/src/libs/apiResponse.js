/**
  apiResponse.js
  Response formatter that keeps success responses consistent across controllers.
 */
const apiResponse = (res, statusCode, success, message, data = null) => {   
  return res.status(statusCode).json({
    success,
    message,
    data,
  });
};

export default apiResponse;