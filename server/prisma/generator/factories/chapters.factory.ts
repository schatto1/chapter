import { Prisma } from '@prisma/client';
import { company, lorem, address, image } from 'faker';
import { prisma } from 'src/prisma';

const createChapters = async (userId: number): Promise<number[]> => {
  const chapterIds: number[] = [];

  for (let i = 0; i < 4; i++) {
    const name = company.companyName();
    const description = lorem.words();
    const category = lorem.word();

    // TODO: we shouldn't need to use the unchecked type here. The database
    // schema may need modifying.
    const chapterData: Prisma.chaptersUncheckedCreateInput = {
      name,
      description,
      category,
      creator_id: userId,
      country: address.country(),
      city: address.city(),
      region: address.state(),
      imageUrl: image.imageUrl(640, 480, 'tech', true),
    };

    // TODO: batch this once createMany returns the records.
    const chapter = await prisma.chapters.create({ data: chapterData });

    chapterIds.push(chapter.id);
  }

  return chapterIds;
};

export default createChapters;
