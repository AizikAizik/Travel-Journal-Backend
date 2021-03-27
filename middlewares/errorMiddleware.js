import notFoundError from "../errors/404.js";
import globalError from "../errors/error.js";

const notFound = notFoundError;
const serverError = globalError;

export { notFound, serverError};