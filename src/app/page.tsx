import { BannerBottom, BannerTop, Footer, Header, Navigation, Rulings } from './page-components';

const Home = () => {
  return (
    <>
      <Navigation />
      <Header />
      <div className="max-centered">
        <BannerTop />
        <Rulings />
        <BannerBottom />
        <hr role="separator" />
        <Footer />
      </div>
    </>
  );
};
export default Home;
