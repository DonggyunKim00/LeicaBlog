import React from 'react';
import Top from './components/Top';
import Middle from './components/Middle';
import Search from './components/Search'
import Footer from './components/Footer'

const MainPage = () => {
    return (
        <div>
          <Top />
          <Search />
          <Middle />
          <Footer />
        </div>
    );
};

export default MainPage;


