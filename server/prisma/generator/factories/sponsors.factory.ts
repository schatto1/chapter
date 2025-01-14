import { Prisma } from '@prisma/client';
import { company, internet, system } from 'faker';
import { randomEnum } from '../lib/random';
import { prisma } from 'src/prisma';

enum SponsorTypes {
  'FOOD',
  'VENUE',
  'OTHER',
}

const createSponsors = async (): Promise<number[]> => {
  const sponsors: number[] = [];

  for (let i = 0; i < 4; i++) {
    const name = company.companyName();
    const website = internet.url();
    const logo_path = system.commonFileName('png');
    const type = String(randomEnum(SponsorTypes));

    const sponsorData: Prisma.sponsorsCreateInput = {
      name,
      website,
      logo_path,
      type,
    };

    // TODO: batch this once createMany returns the records.
    const sponsor = await prisma.sponsors.create({ data: sponsorData });

    sponsors.push(sponsor.id);
  }

  return sponsors;
};

export default createSponsors;
