import Category from './categories';
const Home = () => {
  const categories = [
    {
      id: 1,
      title: 'Womens',
      imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
    },
    {
      id: 2,
      title: 'Mens',
      imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
    },
    {
      id: 3,
      title: 'Sneakers',
      imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
    },
    {
      id: 4,
      title: 'Hats',
      imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
    },
    {
      id: 5,
      title: 'Jackets',
      imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
    },
  ];

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <div>
      <Category categories={categories} />
    </div>
  );
};

export default Home;
