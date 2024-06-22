import { useEffect, useState } from 'react'

import { BrowserRouter,Routes,Route } from 'react-router-dom';

import { fetchDataFromApi } from './utils/api'
import { useSelector,useDispatch } from 'react-redux';
import { getApiConfiguration,getGenres } from './store/homeSlice';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import Details from './pages/details/Details';
import SearchResult from './pages/searchResult/SearchResult';
import Explore from './pages/explore/Explore';
import Error404 from './pages/404/PageNotFound';



function App() {
  
  const dispatch = useDispatch();
  const {url} = useSelector((state)=>(state.home))
  //  console.log(url);

  const fetchApiData = ()=>{
    fetchDataFromApi("/configuration").then((res)=>{
      const url = {
        backdrop: res.images.secure_base_url + "original" ,
        poster: res.images.secure_base_url + "original",
        profile : res.images.secure_base_url + "original",
      }; 
      // console.log(res);
      
      dispatch(getApiConfiguration(url));
    })
  };

  useEffect(()=>{
    fetchApiData();
    genresCall();
  },[]);


  const genresCall = async()=>{
    let promises = []
    let endPoints = ["tv","movie"]
    let allGenres = {}

    endPoints.forEach((url)=>{
      promises.push(fetchDataFromApi(`/genre/${url}/list`))
    })

    const data = await Promise.all(promises);
    data.map(({genres})=>{
      return genres.map((item)=>(allGenres[item.id]=item))
    })
     
    dispatch(getGenres(allGenres));
    
  }


  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route element={<Home/>} path='/' />
      <Route element = {<Details/>} path="/:mediaType/:id" />
      <Route element = {<SearchResult/>} path="/search/:query" />
      <Route element = {<Explore/>} path="/explore/:mediaType" />
      <Route element = {<Error404/>} path="*" />
    
    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App