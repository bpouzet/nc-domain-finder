import { z } from 'zod' ;

const DomainListSchema = z.object({
  extension: z.string(),
  name: z.string(),
}) ;

export default DomainListSchema ;

export type DomainList = z.infer<typeof DomainListSchema> ;
