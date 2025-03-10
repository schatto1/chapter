import { Button, VStack } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../../../../components/Form/Input';
import { TextArea } from '../../../../components/Form/TextArea';
import type { Chapter, ChapterQuery } from '../../../../generated/graphql';

export type ChapterFormData = Omit<
  Chapter,
  'id' | 'events' | 'creator' | 'users' | 'banned_users'
>;

interface ChapterFormProps {
  loading: boolean;
  onSubmit: (data: ChapterFormData) => Promise<void>;
  data?: ChapterQuery;
  submitText: string;
}

type Fields = {
  key: keyof ChapterFormData;
  placeholder: string;
  label: string;
  required: boolean;
  type: string;
};

const fields: Fields[] = [
  {
    key: 'name',
    label: 'Chapter name',
    placeholder: 'freeCodeCamp',
    required: true,
    type: 'text',
  },
  {
    key: 'description',
    label: 'Description',
    placeholder:
      'freeCodeCamp is a nonprofit organization that helps people learn to code for free',
    required: true,
    type: 'textarea',
  },
  {
    key: 'city',
    label: 'City',
    placeholder: 'San Francisco',
    required: true,
    type: 'text',
  },
  {
    key: 'region',
    label: 'Region',
    placeholder: 'California',
    required: true,
    type: 'text',
  },
  {
    key: 'country',
    label: 'Country',
    placeholder: 'United States of America',
    required: true,
    type: 'text',
  },
  {
    key: 'category',
    label: 'Category',
    placeholder: 'Education and nonprofit work',
    required: true,
    type: 'text',
  },
  {
    key: 'imageUrl',
    label: 'Image Url',
    placeholder: 'https://www.freecodecamp.org',
    required: true,
    type: 'url',
  },
];

const ChapterForm: React.FC<ChapterFormProps> = (props) => {
  const { loading, onSubmit, data, submitText } = props;
  const chapter = data?.chapter;

  const defaultValues: ChapterFormData = {
    name: chapter?.name ?? '',
    description: chapter?.description ?? '',
    city: chapter?.city ?? '',
    region: chapter?.region ?? '',
    country: chapter?.country ?? '',
    category: chapter?.category ?? '',
    imageUrl: chapter?.imageUrl ?? '',
  };
  const { handleSubmit, register } = useForm<ChapterFormData>({
    defaultValues,
  });

  return (
    <form
      aria-label={submitText}
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: 'flex', flexDirection: 'column', maxWidth: '600px' }}
    >
      <VStack>
        {fields.map(({ key, label, placeholder, required, type }) =>
          type == 'textarea' ? (
            <TextArea
              key={key}
              label={label}
              placeholder={placeholder}
              {...register(key)}
              isRequired={required}
              defaultValue={defaultValues[key]}
            />
          ) : (
            <Input
              key={key}
              label={label}
              placeholder={placeholder}
              {...register(key)}
              type={type}
              isRequired={required}
              defaultValue={defaultValues[key]}
            />
          ),
        )}
        <Button
          mt="6"
          width="100%"
          variant="solid"
          colorScheme="blue"
          type="submit"
          disabled={loading}
        >
          {submitText}
        </Button>
      </VStack>
    </form>
  );
};

export default ChapterForm;
