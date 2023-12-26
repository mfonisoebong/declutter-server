const {PaystackAxios} = require("../../common/helpers/axiosInstances");
const {BankAccount} = require('../../schemas/bankAccounts')
const {successResponse, failedResponse} = require("../../common/helpers/httpResponse");
const {VENDOR_SPLIT} = require("../../common/constants/vendorSplit");
const createSubAccount = async (req, res) => {
    try {
        const response = await PaystackAxios({
            url: '/subaccount',
            method: 'POST',
            data: {
                "business_name": req.user.buisnessName,
                "bank_code": req.body.bankCode,
                "account_number": req.body.accountNumber,
                "percentage_charge": VENDOR_SPLIT
            }
        }).then(res => res.data.data)
        const account = new BankAccount({
            vendor: req.user._id,
            accountCode: response.subaccount_code
        })
        return successResponse({
            res,
            data: account
        })

    } catch (err) {
        return failedResponse({
            res,
            err,
        })
    }
}

module.exports = {
    createSubAccount
}