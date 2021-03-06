import { GetStaticProps } from 'next';

import { Profile, ToggleTheme, Absolute, Menu, Tag } from 'components';

import client from 'graphql/client';
import GET_HOME_PAGE from 'graphql/queries/getHomePage';

import { HomePageProps } from 'types/api';

import { getImageUrl } from 'utils/image';

export const Home = ({
  picture,
  name,
  description,
  role,
  socialLinks
}: HomePageProps) => (
  <>
    <Absolute top="1rem" left="1rem">
      <Tag>body</Tag>
    </Absolute>

    <Menu />
    <ToggleTheme absolute />
    <Absolute center top="45%">
      <Profile
        {...{
          picture: getImageUrl(picture.url),
          name,
          description,
          role,
          socialLinks
        }}
        tag="main"
        nameTag="h1"
      />
    </Absolute>
    <Absolute bottom="1rem" left="1rem">
      <Tag>/body</Tag>
    </Absolute>
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  const { homePage } = await client.request(GET_HOME_PAGE);

  return {
    props: {
      ...homePage.profile
    }
  };
};

export default Home;
