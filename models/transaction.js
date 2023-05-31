const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

// validation of adding new transaction
const validationAddTransaction = Joi.object({
  date: Joi.date().required(),
  type: Joi.boolean().required(),
  category: Joi.string(),
  comment: Joi.string().empty(''),
  sum: Joi.number().min(0.01).required(),
  balanceAfter: Joi.number(),
});

// ====================================================
const transactionSchema = new Schema(
  {
    date: {
      type: Date,
      required: [true, 'Date is required'],
    },
    type: {
      type: Boolean,
      required: [true, 'Type is required'],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'category',
      required: false,
    },
    comment: {
      type: String,
      default: '',
    },
    sum: {
      type: Number,
      default: 0,
      minimum: 0.01,
      required: [true, 'Sum is required'],
    },
    balanceAfter: {
      type: Number,
      minimum: 0,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

transactionSchema.post('save', handleMongooseError);

const Transaction = model('transaction', transactionSchema);

module.exports = {
  Transaction,
  validationAddTransaction,
};
