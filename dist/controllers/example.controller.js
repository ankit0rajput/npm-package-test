"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postExample = exports.getExample = void 0;
const getExample = (req, res) => {
    res.status(200).json({ message: 'GET request to the homepage' });
};
exports.getExample = getExample;
const postExample = (req, res) => {
    res.status(200).json({ message: 'POST request to the homepage' });
};
exports.postExample = postExample;
