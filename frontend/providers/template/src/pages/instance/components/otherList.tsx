import { listOtherByName } from '@/api/instance';
import MyIcon from '@/components/Icon';
import MyTable from '@/components/Table';
import { useResourceStore } from '@/store/resource';
import { OtherResourceListItemType } from '@/types/resource';
import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';

export default function OtherList({ instanceName }: { instanceName: string }) {
  const { t } = useTranslation();
  const { appendResource } = useResourceStore();

  const { data } = useQuery(
    ['listOtherByName', instanceName],
    () => listOtherByName(instanceName),
    {
      onSuccess(data) {
        appendResource(
          data.map((item) => {
            return { id: item.id, name: item.name, kind: item.kind };
          })
        );
      }
    }
  );

  const columns = useMemo<
    {
      title: string;
      dataIndex?: keyof OtherResourceListItemType;
      key: string;
      render?: (item: OtherResourceListItemType) => JSX.Element;
    }[]
  >(
    () => [
      {
        title: 'Name',
        key: 'name',
        render: (item: OtherResourceListItemType) => {
          return (
            <Box pl={4} color={'myGray.900'} fontSize={'md'} fontWeight={'bold'}>
              {item.name}
            </Box>
          );
        }
      },
      {
        title: 'Kind',
        dataIndex: 'kind',
        key: 'kind'
      },
      {
        title: 'Component',
        dataIndex: 'label',
        key: 'label'
      }
    ],
    []
  );

  return (
    <>
      <Flex alignItems={'center'} mt="48px">
        <Icon width="24px" height="24px" viewBox="0 0 24 24" fill="#363C42">
          <path d="M8.99998 2.99973H3.99998C3.73476 2.99973 3.48041 3.10509 3.29287 3.29263C3.10533 3.48016 2.99998 3.73452 2.99998 3.99973V8.99973C2.99998 9.26495 3.10533 9.5193 3.29287 9.70684C3.48041 9.89438 3.73476 9.99973 3.99998 9.99973H8.99998C9.26519 9.99973 9.51955 9.89438 9.70708 9.70684C9.89462 9.5193 9.99998 9.26495 9.99998 8.99973V3.99973C9.99998 3.73452 9.89462 3.48016 9.70708 3.29263C9.51955 3.10509 9.26519 2.99973 8.99998 2.99973ZM8.99998 13.9997H3.99998C3.73476 13.9997 3.48041 14.1051 3.29287 14.2926C3.10533 14.4802 2.99998 14.7345 2.99998 14.9997V19.9997C2.99998 20.2649 3.10533 20.5193 3.29287 20.7068C3.48041 20.8944 3.73476 20.9997 3.99998 20.9997H8.99998C9.26519 20.9997 9.51955 20.8944 9.70708 20.7068C9.89462 20.5193 9.99998 20.2649 9.99998 19.9997V14.9997C9.99998 14.7345 9.89462 14.4802 9.70708 14.2926C9.51955 14.1051 9.26519 13.9997 8.99998 13.9997ZM20 2.99973H15C14.7348 2.99973 14.4804 3.10509 14.2929 3.29263C14.1053 3.48016 14 3.73452 14 3.99973V8.99973C14 9.26495 14.1053 9.5193 14.2929 9.70684C14.4804 9.89438 14.7348 9.99973 15 9.99973H20C20.2652 9.99973 20.5195 9.89438 20.7071 9.70684C20.8946 9.5193 21 9.26495 21 8.99973V3.99973C21 3.73452 20.8946 3.48016 20.7071 3.29263C20.5195 3.10509 20.2652 2.99973 20 2.99973ZM20 13.9997H15C14.7348 13.9997 14.4804 14.1051 14.2929 14.2926C14.1053 14.4802 14 14.7345 14 14.9997V19.9997C14 20.2649 14.1053 20.5193 14.2929 20.7068C14.4804 20.8944 14.7348 20.9997 15 20.9997H20C20.2652 20.9997 20.5195 20.8944 20.7071 20.7068C20.8946 20.5193 21 20.2649 21 19.9997V14.9997C21 14.7345 20.8946 14.4802 20.7071 14.2926C20.5195 14.1051 20.2652 13.9997 20 13.9997Z" />
          <path d="M2.77861 2.77837C3.10254 2.45444 3.54188 2.27246 3.99998 2.27246H8.99998C9.45808 2.27246 9.89742 2.45444 10.2213 2.77837C10.5453 3.10229 10.7273 3.54163 10.7273 3.99973V8.99973C10.7273 9.45784 10.5453 9.89717 10.2213 10.2211C9.89742 10.545 9.45808 10.727 8.99998 10.727H3.99998C3.54188 10.727 3.10254 10.545 2.77861 10.2211C2.45469 9.89717 2.27271 9.45783 2.27271 8.99973V3.99973C2.27271 3.54163 2.45468 3.10229 2.77861 2.77837ZM3.99998 3.72701C3.92765 3.72701 3.85828 3.75574 3.80713 3.80689C3.75598 3.85803 3.72725 3.9274 3.72725 3.99973V8.99973C3.72725 9.07207 3.75598 9.14143 3.80713 9.19258C3.85828 9.24373 3.92765 9.27246 3.99998 9.27246H8.99998C9.07231 9.27246 9.14168 9.24373 9.19282 9.19258C9.24397 9.14143 9.27271 9.07206 9.27271 8.99973V3.99973C9.27271 3.9274 9.24397 3.85803 9.19282 3.80689C9.14168 3.75574 9.07231 3.72701 8.99998 3.72701H3.99998ZM13.7786 2.77837C14.1025 2.45444 14.5419 2.27246 15 2.27246H20C20.4581 2.27246 20.8974 2.45444 21.2213 2.77837C21.5453 3.10229 21.7272 3.54163 21.7272 3.99973V8.99973C21.7272 9.45783 21.5453 9.89717 21.2213 10.2211C20.8974 10.545 20.4581 10.727 20 10.727H15C14.5419 10.727 14.1025 10.545 13.7786 10.2211C13.4547 9.89717 13.2727 9.45784 13.2727 8.99973V3.99973C13.2727 3.54163 13.4547 3.10229 13.7786 2.77837ZM15 3.72701C14.9276 3.72701 14.8583 3.75574 14.8071 3.80689C14.756 3.85803 14.7273 3.9274 14.7273 3.99973V8.99973C14.7273 9.07206 14.756 9.14143 14.8071 9.19258C14.8583 9.24373 14.9276 9.27246 15 9.27246H20C20.0723 9.27246 20.1417 9.24373 20.1928 9.19258C20.244 9.14144 20.2727 9.07207 20.2727 8.99973V3.99973C20.2727 3.9274 20.244 3.85803 20.1928 3.80689C20.1417 3.75574 20.0723 3.72701 20 3.72701H15ZM2.77861 13.7784C3.10254 13.4544 3.54188 13.2725 3.99998 13.2725H8.99998C9.45808 13.2725 9.89742 13.4544 10.2213 13.7784C10.5453 14.1023 10.7273 14.5416 10.7273 14.9997V19.9997C10.7273 20.4578 10.5453 20.8972 10.2213 21.2211C9.89742 21.545 9.45808 21.727 8.99998 21.727H3.99998C3.54188 21.727 3.10254 21.545 2.77861 21.2211C2.45468 20.8972 2.27271 20.4578 2.27271 19.9997V14.9997C2.27271 14.5416 2.45469 14.1023 2.77861 13.7784ZM3.99998 14.727C3.92765 14.727 3.85828 14.7557 3.80713 14.8069C3.75598 14.858 3.72725 14.9274 3.72725 14.9997V19.9997C3.72725 20.0721 3.75598 20.1414 3.80713 20.1926C3.85828 20.2437 3.92764 20.2725 3.99998 20.2725H8.99998C9.07231 20.2725 9.14168 20.2437 9.19282 20.1926C9.24397 20.1414 9.27271 20.0721 9.27271 19.9997V14.9997C9.27271 14.9274 9.24397 14.858 9.19282 14.8069C9.14168 14.7557 9.07231 14.727 8.99998 14.727H3.99998ZM13.7786 13.7784C14.1025 13.4544 14.5419 13.2725 15 13.2725H20C20.4581 13.2725 20.8974 13.4544 21.2213 13.7784C21.5453 14.1023 21.7272 14.5416 21.7272 14.9997V19.9997C21.7272 20.4578 21.5453 20.8972 21.2213 21.2211C20.8974 21.545 20.4581 21.727 20 21.727H15C14.5419 21.727 14.1025 21.545 13.7786 21.2211C13.4547 20.8972 13.2727 20.4578 13.2727 19.9997V14.9997C13.2727 14.5416 13.4547 14.1023 13.7786 13.7784ZM15 14.727C14.9276 14.727 14.8583 14.7557 14.8071 14.8069C14.756 14.858 14.7273 14.9274 14.7273 14.9997V19.9997C14.7273 20.0721 14.756 20.1414 14.8071 20.1926C14.8583 20.2437 14.9276 20.2725 15 20.2725H20C20.0723 20.2725 20.1417 20.2437 20.1928 20.1926C20.244 20.1414 20.2727 20.0721 20.2727 19.9997V14.9997C20.2727 14.9274 20.244 14.858 20.1928 14.8069C20.1417 14.7557 20.0723 14.727 20 14.727H15Z" />
        </Icon>
        <Text ml="12px" fontWeight={500} fontSize={'18px'} color={'#363C42'}>
          {/* {t('Others')} */}
          Others
        </Text>
      </Flex>
      <Box backgroundColor={'#F3F4F5'} mt="16px">
        {data && data?.length > 0 ? (
          <MyTable itemClass="appItem" columns={columns} data={data} />
        ) : (
          <Flex
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            background={'white'}
            p="32px"
          >
            <Flex
              border={'1px dashed #9CA2A8'}
              borderRadius="50%"
              w={'48px'}
              h={'48px'}
              justifyContent="center"
              alignItems={'center'}
            >
              <MyIcon color={'#7B838B'} name="empty"></MyIcon>
            </Flex>
            <Text mt={'12px'} fontSize={14} color={'#5A646E'}>
              {t('There is no resource of this type')}
            </Text>
          </Flex>
        )}
      </Box>
    </>
  );
}