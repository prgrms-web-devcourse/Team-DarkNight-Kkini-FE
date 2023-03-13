import { Avatar, Box, Flex, Input } from '@chakra-ui/react';
import { useUpdateUserImage } from 'hooks/query/useUser';
import { ChangeEvent, memo, useEffect, useRef, useState } from 'react';
import { MdOutlineAddAPhoto } from 'react-icons/md';

const UserIconForm = ({
  imgSrc,
  setValue,
}: {
  imgSrc: string;
  setValue: (url: string) => void;
}) => {
  const [file, setFile] = useState<File>();
  const [imageSrc, setImageSrc] = useState<string>(imgSrc);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate } = useUpdateUserImage();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0]);
  };

  useEffect(() => {
    // 파일 미리보기를 띄우기 위함
    const formData = new FormData();
    const fileReader = new FileReader();
    file && fileReader.readAsDataURL(file);

    fileReader.addEventListener('load', (e) => {
      const newSrc = typeof e.target?.result === 'string' ? e.target?.result : undefined;
      if (file && newSrc) {
        formData.append('file', file);
        mutate(formData, {
          onSuccess: (data) => {
            setValue(data.path);
          },
        });
        setImageSrc(newSrc);
      }
    });
  }, [file, mutate, setValue]);

  return (
    <Flex align='center' justify='center'>
      <Box
        display='inline-block'
        cursor='pointer'
        onClick={() => fileInputRef.current?.click()}
        mt='2rem'>
        <Input
          display='none'
          ref={fileInputRef}
          type='file'
          onChange={handleFileChange}
        />
        <Box pointerEvents='none' pos='relative'>
          <Avatar
            size='xl'
            src={imageSrc}
            pointerEvents='none'
            pos='relative'
            border='2px solid gray'
          />
          <Flex
            pos='absolute'
            right={0}
            bottom={0}
            w='2rem'
            h='2rem'
            justify='center'
            align='center'
            borderRadius='50%'
            bgColor='gray.500'>
            <MdOutlineAddAPhoto size='1.5rem' color='#f9f9f9' />
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default memo(UserIconForm);
