const {
  failedResponse,
  successResponse,
} = require("../../common/helpers/httpResponse");
const { Stripe } = require("../../common/helpers/stripe");
const { User } = require("../../schemas/user");

const createSubAccount = async (req, res) => {
  try {
    const account = await Stripe.accounts.create({
      type: "custom",
      country: req.body.country,
      email: req.user.email,
      business_type: "individual",
      requested_capabilities: ["transfers", "card_payments"],
      // capabilities: {
      //   transfers: {
      //     requested: true,
      //   },
      //   card_payments: {
      //     requested: true,
      //   },
      //   affirm_payments: {
      //     requested: true,
      //   },
      //   crypto_transfers: {
      //     requested: true,
      //   },
      //   legacy_payments: {
      //     requested: true,
      //   },
      // },
      individual: {
        first_name: req.body.individual.firstName,
        last_name: req.body.individual.lastName,
        email: req.user.email,
        id_number: "444-89-3242",
        phone: req.body.individual.phone,
        address: {
          city: req.body.individual.address.city,
          country: req.body.individual.address.country,
          line1: req.body.individual.address.line1,
          line2: req.body.individual.address.line2,
          postal_code: req.body.individual.address.postalCode,
          state: req.body.individual.address.state,
        },
        dob: {
          day: req.body.individual.dob.day,
          month: req.body.individual.dob.month,
          year: req.body.individual.dob.year,
        },
        ssn_last_4: req.body.individual.ssnLastFour,
        gender: req.body.individual.gender,
      },
      company: {
        name: req.body.company.name,
        tax_id: req.body.company.taxId,
      },
      business_profile: {
        support_phone: req.body.buisnessProfile.supportPhone,
        name: req.body.buisnessProfile.name,
        product_description: req.body.buisnessProfile.productDescription,
        mcc: req.body.buisnessProfile.mcc,
        url: req.body.buisnessProfile.url,
        support_url: req.body.buisnessProfile.supportUrl,
      },
      external_account: {
        object: "bank_account",
        account_holder_name: req.body.externalAccount.accountHolderName,
        country: req.body.externalAccount.country,
        currency: req.body.externalAccount.currency,
        account_holder_type: req.body.externalAccount.accountHolderType,
        routing_number: req.body.externalAccount.routingNumber,
        account_number: req.body.externalAccount.accountNumber,
      },
      tos_acceptance: {
        date: Math.floor(Date.now() / 1000),
        ip: req.ip,
      },
    });

    await User.findByIdAndUpdate(req.user._id, {
      stripeAccountId: account.id,
    });

    return successResponse({
      res,
      data: account,
    });
  } catch (err) {
    return failedResponse({
      res,
      err,
    });
  }
};

const deleteSubAccount = async (req, res) => {
  try {
    const accountId = req.params.id;

    await Stripe.accounts.del(accountId);
    return successResponse({
      res,
      message: "Account deleted successfully",
    });
  } catch (err) {
    return failedResponse({
      res,
      err,
    });
  }
};

const uploadDocuments = async (req, res) => {
  try {
    if (!req.files.front || !req.files.back) {
      return failedResponse({
        res,
        message: "Please upload both front and back of the document",
      });
    }

    const front = req.files.front[0].buffer;
    const back = req.files.back[0].buffer;

    const frontUpload = await Stripe.files.create({
      file: {
        data: front,
        name: front.originalname,
        type: "application.octet-stream",
      },
      purpose: "identity_document",
    });
    const backUpload = await Stripe.files.create({
      file: {
        data: back,
        name: back.originalname,
        type: "application.octet-stream",
      },
      purpose: "identity_document",
    });

    await Stripe.accounts.update(req.user.stripeAccountId, {
      individual: {
        verification: {
          document: {
            front: frontUpload.id,
            back: backUpload.id,
          },
        },
      },
    });

    return successResponse({
      res,
      message: "Documents uploaded successfully",
    });
  } catch (err) {
    return failedResponse({
      res,
      err,
    });
  }
};

module.exports = {
  createSubAccount,
  deleteSubAccount,
  uploadDocuments,
};
