import { z } from 'zod' ;

const DomainSchema = z.object({
  beneficiaire: z.string(),
  dateCreation: z.string(),
  dateExpiration: z.string(),
  dateModification: z.string(),
  dns: z.array(z.string()),
  expired: z.boolean(),
  extension: z.string(),
  gestionnaire: z.string(),
  isProtected: z.boolean(),
  nbDaysBeforeExpires: z.number(),
  nom: z.string(),
  note: z.string(),
  rid7: z.string(),
  ridet: z.string(),
  status: z.string(),
}) ;

export default DomainSchema ;

export type Domain = z.infer<typeof DomainSchema> ;
