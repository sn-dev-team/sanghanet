const { mongoose } = require('../controllers/mongoDB.controller');
const { FinanceTransactionSchema } = require('./financeTransaction.model');

const FinanceSchema = mongoose.Schema({
    currency: String,
    userId: mongoose.ObjectId,
    email: String,
    transactionArchive: {
        membership: [FinanceTransactionSchema],
        rent: [FinanceTransactionSchema],
        event: [FinanceTransactionSchema],
        angel: [FinanceTransactionSchema]
    },
    transactionBuffer: {
        membership: [FinanceTransactionSchema],
        rent: [FinanceTransactionSchema],
        event: [FinanceTransactionSchema],
        angel: [FinanceTransactionSchema]
    },
    pockets: {
        membership: {
            currentBalance: { type: Number, default: 0 },
            rollingBalance: { type: Number, default: 0 }
        },
        rent: {
            currentBalance: { type: Number, default: 0 },
            rollingBalance: { type: Number, default: 0 }
        },
        event: {
            currentBalance: { type: Number, default: 0 },
            rollingBalance: { type: Number, default: 0 }
        },
        angel: {
            currentBalance: { type: Number, default: 0 },
            rollingBalance: { type: Number, default: 0 }
        }
    }
});

module.exports.Account = mongoose.model('FinanceAccount', FinanceSchema);
