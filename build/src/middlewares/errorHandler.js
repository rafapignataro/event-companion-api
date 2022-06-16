"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
async function errorHandler(error, request, response, next) {
    return response.status(error.code || 500).json({
        status: 'Error',
        code: error.code,
        message: error.message || 'Unexpected error',
    });
}
exports.errorHandler = errorHandler;
