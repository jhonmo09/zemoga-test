import { BannerBottom, BannerTop, Footer, Header, Navigation } from './page-components';

const Home = () => {
  return (
    <>
      <Navigation />
      <Header />
      <div className="max-centered">
        <BannerTop />
        Hi
        <BannerBottom />
        <hr role="separator" />
        <Footer />
      </div>
    </>
  );
};
export default Home;
