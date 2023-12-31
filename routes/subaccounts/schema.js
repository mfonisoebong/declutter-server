const { z } = require("zod");

const AddressSchema = z.object({
  city: z.string().min(1),
  country: z.string().min(2),
  line1: z.string().min(1),
  line2: z.string().min(1),
  postalCode: z.string().min(1),
  state: z.string().min(1),
});

const CompanySchema = z.object({
  name: z.string().min(2).max(255),
  taxId: z.string().min(2).max(255),
  address: AddressSchema.optional().nullable(),
});

const IndividualSchema = z.object({
  firstName: z.string().min(2).max(255),
  lastName: z.string().min(2).max(255),
  phone: z.string().min(2).max(255),
  address: AddressSchema,
  dob: z.object({
    day: z.number().min(1).max(31).int(),
    month: z.number().min(1).max(12).int(),
    year: z.number().int(),
  }),
  ssnLastFour: z.string().min(1),
  gender: z.string().min(1),
});

const ExternalAccountSchema = z.object({
  accountHolderName: z.string().min(2).max(255),
  country: z.string().min(2),
  currency: z.string().min(2),
  accountHolderType: z.enum(["individual", "company"]),
  routingNumber: z.string().min(2),
  accountNumber: z.string().min(2),
});

const BuisnessProfileSchema = z.object({
  supportPhone: z.string().min(2),
  name: z.string().min(2),
  productDescription: z.string().min(2),
  mcc: z.string().min(2),
  url: z.string().min(2),
  supportUrl: z.string().min(2),
});

const CreateIndividualAccountSchema = z.object({
  country: z.string().min(2),
  address: AddressSchema,
  individual: IndividualSchema,
  company: CompanySchema,
  externalAccount: ExternalAccountSchema,
  buisnessProfile: BuisnessProfileSchema,
});

module.exports = {
  CreateIndividualAccountSchema,
};
