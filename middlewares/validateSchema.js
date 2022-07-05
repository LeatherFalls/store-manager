const validateSchema = (schema) => (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);

    if (error) {
      const [status, message] = error.message.split('|');
      console.log(status);
      return res.status(parseInt(status, 10)).json({ message });
    }

    return next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateSchema;